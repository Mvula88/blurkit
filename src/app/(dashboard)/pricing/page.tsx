'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Zap, Crown, Infinity, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function PricingPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (plan: string) => {
    if (!user) {
      toast.error('Please sign in to upgrade');
      window.location.href = '/login';
      return;
    }

    setLoading(plan);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout. Please try again.');
      setLoading(null);
    }
  };

  const features = {
    free: [
      '5 blurs per day',
      'Basic blur types',
      'Image & PDF support',
      'Screenshot paste',
      'Export with watermark',
    ],
    premium: [
      'Unlimited blurs',
      'All blur types',
      'Image & PDF support',
      'Screenshot paste',
      'No watermarks',
      'Priority support',
      'Save projects',
      'Ad-free experience',
    ],
    lifetime: [
      'Everything in Premium',
      'Lifetime access',
      'One-time payment',
      'All future updates',
      'VIP support',
      'Early access to features',
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar user={user} />

      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for you. Upgrade, downgrade, or cancel
            anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card className="border-2">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                  <Zap className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-500">/forever</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Perfect for occasional use
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {features.free.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => (window.location.href = '/editor')}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan - Most Popular */}
          <Card className="border-2 border-blue-500 shadow-xl relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 mb-4">
                  <Crown className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    $7
                  </span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-600">
                  Or $49/year{' '}
                  <span className="text-blue-600 font-semibold">
                    (save 41%)
                  </span>
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {features.premium.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                onClick={() => handleCheckout('premium_monthly')}
                disabled={loading !== null}
              >
                {loading === 'premium_monthly' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Start Premium
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Lifetime Plan */}
          <Card className="border-2">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 mb-4">
                  <Infinity className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Lifetime</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    $99
                  </span>
                  <span className="text-gray-500">/once</span>
                </div>
                <p className="text-gray-600 text-sm">Pay once, use forever</p>
              </div>

              <ul className="space-y-3 mb-8">
                {features.lifetime.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                className="w-full border-amber-600 text-amber-600 hover:bg-amber-50"
                onClick={() => handleCheckout('lifetime')}
                disabled={loading !== null}
              >
                {loading === 'lifetime' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Infinity className="mr-2 h-4 w-4" />
                    Get Lifetime Access
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ / Trust Signals */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">
            🔒 Secure payment via Stripe • Cancel anytime • 30-day money-back
            guarantee
          </p>
          <p className="text-xs text-gray-400">
            All prices in USD. Taxes calculated at checkout.
          </p>
        </div>
      </main>
    </div>
  );
}
