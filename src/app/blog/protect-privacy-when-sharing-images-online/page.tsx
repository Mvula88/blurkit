import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title:
    'How to Protect Privacy When Sharing Images Online (2025 Guide) | BlurKit',
  description:
    'Essential privacy protection strategies for sharing images on social media, email, and cloud storage. Prevent identity theft and data breaches with expert tips.',
  keywords:
    'online privacy, share images safely, social media privacy, image security, protect photos online, EXIF data removal',
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar user={null} />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/blog" className="hover:text-blue-600">
            Blog
          </Link>
          {' > '}
          <span className="text-gray-900">
            Protect Privacy When Sharing Images
          </span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How to Protect Privacy When Sharing Images Online (2025 Guide)
          </h1>
          <p className="text-xl text-gray-600">
            Learn essential strategies to prevent data leaks, identity theft,
            and privacy violations when sharing images online.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mb-4">
            1. Blur Sensitive Information
          </h2>
          <p className="text-gray-700 mb-6">
            Before posting any image online, scan for personal data like
            addresses, license plates, credit card numbers, or sensitive
            documents visible in the background.
          </p>

          <h2 className="text-3xl font-bold mb-4">2. Remove Metadata</h2>
          <p className="text-gray-700 mb-6">
            Digital photos contain EXIF data including GPS coordinates, camera
            settings, and timestamps. Strip this metadata to prevent location
            tracking.
          </p>

          <h2 className="text-3xl font-bold mb-4">
            3. Use Privacy-First Tools
          </h2>
          <p className="text-gray-700 mb-6">
            Choose tools like BlurKit that process images in your browser
            without uploading to external servers. Your images never leave your
            device.
          </p>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 text-center mt-12">
            <h3 className="text-2xl font-bold mb-4">
              Secure Your Images with BlurKit
            </h3>
            <p className="mb-6 text-blue-100">
              100% browser-based processing. Zero server uploads. Maximum
              privacy.
            </p>
            <Link href="/editor">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Try BlurKit Free
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
