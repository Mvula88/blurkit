import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Eye, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title:
    '15 Essential Privacy Tips for Screenshots (Avoid Data Leaks 2025) | BlurKit',
  description:
    'Expert privacy tips for taking and sharing screenshots safely. Learn how to avoid accidental data exposure, remove metadata, and protect sensitive information.',
  keywords:
    'screenshot privacy, protect screenshots, remove metadata, secure screenshots, screenshot security tips, blur sensitive data screenshots',
};

export default function BlogPost() {
  const tips = [
    {
      title: 'Blur Sensitive Information Before Sharing',
      description:
        'Always review screenshots for personal data like emails, phone numbers, addresses, or account numbers. Use BlurKit to quickly blur these areas before posting online.',
      icon: Eye,
    },
    {
      title: 'Check Browser Tabs and Address Bars',
      description:
        'Open tabs often reveal private email addresses, account usernames, or internal URLs. Close unnecessary tabs or crop them out before sharing.',
      icon: Shield,
    },
    {
      title: 'Remove EXIF Metadata',
      description:
        'Screenshots can contain metadata like timestamps, device info, and GPS coordinates. Strip this data before uploading to social media.',
      icon: Lock,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar user={null} />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/blog" className="hover:text-blue-600">
            Blog
          </Link>
          {' > '}
          <span className="text-gray-900">Privacy Tips for Screenshots</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            15 Essential Privacy Tips for Screenshots (Avoid Data Leaks)
          </h1>
          <p className="text-xl text-gray-600">
            Protect yourself from accidental data exposure with these expert tips
            for secure screenshot sharing.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          {tips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div key={idx} className="mb-8 flex items-start gap-4">
                <Icon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">{idx + 1}. {tip.title}</h2>
                  <p className="text-gray-700">{tip.description}</p>
                </div>
              </div>
            );
          })}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 text-center mt-12">
            <h3 className="text-2xl font-bold mb-4">
              Protect Your Screenshots with BlurKit
            </h3>
            <Link href="/editor">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Try Free Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <footer className="border-t pt-8 mt-12">
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to Blog
          </Link>
        </footer>
      </article>
    </div>
  );
}
