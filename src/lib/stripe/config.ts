import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-09-30.clover',
  typescript: true,
});

// Stripe pricing IDs - Create these in Stripe Dashboard
export const STRIPE_PLANS = {
  premium_monthly:
    process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID || '',
  premium_yearly: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID || '',
  lifetime: process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID || '',
};

export const PLAN_DETAILS = {
  premium_monthly: {
    name: 'Premium Monthly',
    price: 4,
    interval: 'month',
  },
  premium_yearly: {
    name: 'Premium Yearly',
    price: 36,
    interval: 'year',
  },
  lifetime: {
    name: 'Lifetime Access',
    price: 79,
    interval: 'one-time',
  },
};
