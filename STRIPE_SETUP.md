# Stripe Integration Setup Guide

## 1. Create Stripe Account

1. Go to [https://stripe.com](https://stripe.com) and sign up
2. Verify your email
3. Complete your business profile

## 2. Create Products in Stripe Dashboard

### A. Premium Monthly ($7/month)
1. Go to **Products** → **Add Product**
2. Name: "Premium Monthly"
3. Description: "Unlimited blurs, no watermarks, priority support"
4. Pricing:
   - Type: **Recurring**
   - Price: **$7.00**
   - Billing period: **Monthly**
5. Click **Save product**
6. Copy the **Price ID** (starts with `price_...`)
7. Add to `.env.local` as `NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID`

### B. Premium Yearly ($49/year)
1. Go to **Products** → **Add Product**
2. Name: "Premium Yearly"
3. Description: "Unlimited blurs, no watermarks, priority support - Save 41%!"
4. Pricing:
   - Type: **Recurring**
   - Price: **$49.00**
   - Billing period: **Yearly**
5. Click **Save product**
6. Copy the **Price ID**
7. Add to `.env.local` as `NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID`

### C. Lifetime Access ($99 one-time)
1. Go to **Products** → **Add Product**
2. Name: "Lifetime Access"
3. Description: "Pay once, use forever. Includes all future updates."
4. Pricing:
   - Type: **One-time**
   - Price: **$99.00**
5. Click **Save product**
6. Copy the **Price ID**
7. Add to `.env.local` as `NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID`

## 3. Get API Keys

1. Go to **Developers** → **API keys**
2. Copy **Publishable key** → Add to `.env.local` as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Reveal and copy **Secret key** → Add to `.env.local` as `STRIPE_SECRET_KEY`

⚠️ **Important**: Never commit the secret key to Git!

## 4. Set Up Webhooks (for Production)

### Local Development (using Stripe CLI)
```bash
# Install Stripe CLI
# Windows: scoop install stripe
# Mac: brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

The CLI will output a webhook signing secret like `whsec_...` → Add to `.env.local` as `STRIPE_WEBHOOK_SECRET`

### Production (Vercel/deployment)
1. Go to **Developers** → **Webhooks** → **Add endpoint**
2. Endpoint URL: `https://your-domain.com/api/stripe/webhook`
3. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `payment_intent.succeeded`
4. Click **Add endpoint**
5. Copy the **Signing secret** → Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

## 5. Update Supabase Database

Run this SQL in Supabase SQL Editor:

```sql
-- Add tier and subscription fields to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_tier ON profiles(tier);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription ON profiles(subscription_id);
```

## 6. Environment Variables Checklist

Make sure you have all these in `.env.local`:

- [x] `NEXT_PUBLIC_SUPABASE_URL`
- [x] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [x] `SUPABASE_SERVICE_ROLE_KEY`
- [x] `STRIPE_SECRET_KEY`
- [x] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [x] `STRIPE_WEBHOOK_SECRET`
- [x] `NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID`
- [x] `NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID`
- [x] `NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID`
- [x] `NEXT_PUBLIC_APP_URL`

## 7. Testing

### Test Mode
1. Stripe starts in **test mode** by default
2. Use test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Any future expiry date, any CVC

### Test Flow
1. Go to `/pricing`
2. Click "Start Premium"
3. Fill checkout with test card
4. Complete payment
5. Verify:
   - Redirected to `/success`
   - Confetti animation plays
   - User tier updated in Supabase to `premium`
   - Can now blur without limits
   - No watermarks on exports

## 8. Go Live

1. **Activate your Stripe account**:
   - Complete business details
   - Add bank account for payouts
   - Submit for activation

2. **Switch to live mode**:
   - Toggle **Test mode** OFF in Stripe Dashboard
   - Copy **live API keys** and update environment variables
   - Set up live webhooks

3. **Update environment variables in Vercel**:
   - Go to Vercel project settings
   - Environment Variables tab
   - Add all production keys

## Troubleshooting

### Webhook not working
- Check webhook signing secret matches
- Verify webhook URL is correct
- Check webhook event logs in Stripe Dashboard

### Payment succeeds but tier not updating
- Check Supabase service role key is correct
- Verify user_id in webhook metadata
- Check webhook logs for errors

### Checkout redirects but shows error
- Verify success_url and cancel_url are correct
- Check browser console for errors
- Ensure NEXT_PUBLIC_APP_URL is set correctly

## Support

Need help? Check:
- [Stripe Docs](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com/)
