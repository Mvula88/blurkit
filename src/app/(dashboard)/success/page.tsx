'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SuccessPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        setLoading(false);
        return;
      }

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3B82F6', '#6366F1', '#8B5CF6'],
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3B82F6', '#6366F1', '#8B5CF6'],
      });
    }, 100);

    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar user={user} />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {loading ? (
            <Card className="border-blue-200 shadow-lg">
              <CardContent className="p-12 text-center">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">
                  Processing your payment...
                </h2>
                <p className="text-gray-600">
                  Please wait while we confirm your subscription.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-blue-200 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 mb-6">
                  <CheckCircle2 className="h-12 w-12 text-blue-600" />
                </div>

                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Welcome to Premium!
                </h1>

                <p className="text-xl text-gray-700 mb-6">
                  Your payment was successful. You now have access to all
                  premium features!
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-lg">
                      What you get with Premium:
                    </h3>
                  </div>
                  <ul className="text-left max-w-md mx-auto space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      Unlimited blurs per day
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      No watermarks on exports
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      Priority support
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      Save projects to cloud
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      Ad-free experience
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    onClick={() => (window.location.href = '/editor')}
                  >
                    Start Blurring
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => (window.location.href = '/dashboard')}
                  >
                    Go to Dashboard
                  </Button>
                </div>

                <p className="text-sm text-gray-500 mt-8">
                  Questions? Contact us at support@blurkit.com
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
