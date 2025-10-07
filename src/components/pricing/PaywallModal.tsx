'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Zap } from 'lucide-react';

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
}

export function PaywallModal({ open, onClose }: PaywallModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Unlock Unlimited Blurs
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            You&apos;ve reached your daily limit of 15 free blurs. Upgrade to
            Premium for unlimited access!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Premium Features */}
          <div className="space-y-3">
            {[
              'Unlimited blurs per day',
              'No watermarks on exports',
              'Priority support',
              'Save projects to cloud',
              'Batch processing',
              'Ad-free experience',
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="border-t pt-4 mt-4">
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                $4
              </span>
              <span className="text-gray-500">/month</span>
            </div>
            <p className="text-center text-sm text-gray-500 mb-4">
              Or $36/year (save 25%)
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              onClick={() => {
                // TODO: Navigate to pricing/checkout page
                window.location.href = '/pricing';
              }}
            >
              <Zap className="mr-2 h-5 w-5" />
              Upgrade to Premium
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={onClose}
            >
              Maybe Later
            </Button>
          </div>

          <p className="text-center text-xs text-gray-500 pt-2">
            🔒 Secure payment via Stripe • Cancel anytime
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
