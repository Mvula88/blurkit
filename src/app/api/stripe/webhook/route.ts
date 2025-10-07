import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        // Handle one-time payment (lifetime)
        if (paymentIntent.metadata.plan === 'lifetime') {
          await updateUserTier(
            paymentIntent.metadata.user_id,
            'lifetime',
            null
          );
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.client_reference_id || session.metadata?.user_id;
  if (!userId) {
    console.error('No user ID in checkout session');
    return;
  }

  const plan = session.metadata?.plan;
  const tier = plan === 'lifetime' ? 'lifetime' : 'premium';

  await updateUserTier(
    userId,
    tier,
    session.subscription as string | null,
    session.customer as string | null
  );
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.user_id;
  if (!userId) {
    console.error('No user ID in subscription');
    return;
  }

  const status = subscription.status;
  const tier =
    status === 'active' || status === 'trialing' ? 'premium' : 'free';

  await updateUserTier(
    userId,
    tier,
    subscription.id,
    subscription.customer as string
  );
}

async function updateUserTier(
  userId: string,
  tier: string,
  subscriptionId: string | null,
  customerId?: string | null
) {
  const { error } = await supabaseAdmin.from('profiles').upsert(
    {
      id: userId,
      tier: tier,
      subscription_id: subscriptionId,
      stripe_customer_id: customerId,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' }
  );

  if (error) {
    console.error('Failed to update user tier:', error);
    throw error;
  }

  console.log(`Updated user ${userId} to tier ${tier}`);
}
