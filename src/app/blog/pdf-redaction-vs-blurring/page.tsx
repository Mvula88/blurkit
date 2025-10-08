import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title:
    'PDF Redaction vs Blurring: Which Method is More Secure? | BlurKit',
  description:
    'In-depth technical comparison between PDF redaction and blurring methods. Learn which offers better security for different use cases and compliance requirements.',
  keywords:
    'PDF redaction, PDF blurring, document security, redaction vs blur, secure PDF editing, GDPR compliance, HIPAA compliance',
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
          <span className="text-gray-900">PDF Redaction vs Blurring</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            PDF Redaction vs Blurring: Which Method is More Secure?
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive technical comparison to help you choose the right method
            for protecting sensitive PDF data.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">What is PDF Redaction?</h2>
            <p className="text-gray-700 mb-4">
              PDF redaction <strong>permanently removes</strong> text, images, and
              metadata from the document. The original data is completely
              eliminated and cannot be recovered.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
              <h3 className="font-bold mb-3">When to Use Redaction:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Legal documents and court filings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>FOIA (Freedom of Information Act) requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>HIPAA-compliant medical records</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">What is PDF Blurring?</h2>
            <p className="text-gray-700 mb-4">
              PDF blurring <strong>obscures</strong> sensitive information
              visually while preserving the document&apos;s layout. It&apos;s faster and
              easier than redaction.
            </p>
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6">
              <h3 className="font-bold mb-3">When to Use Blurring:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-1" />
                  <span>Screenshots and presentations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-1" />
                  <span>Sharing documents internally</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-1" />
                  <span>Social media and blog posts</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Security Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3 text-left">Feature</th>
                    <th className="border p-3">Redaction</th>
                    <th className="border p-3">Blurring</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3">Data Removal</td>
                    <td className="border p-3 text-center">✓ Permanent</td>
                    <td className="border p-3 text-center">✗ Visual Only</td>
                  </tr>
                  <tr>
                    <td className="border p-3">Legal Compliance</td>
                    <td className="border p-3 text-center">✓ High</td>
                    <td className="border p-3 text-center">~ Medium</td>
                  </tr>
                  <tr>
                    <td className="border p-3">Ease of Use</td>
                    <td className="border p-3 text-center">~ Moderate</td>
                    <td className="border p-3 text-center">✓ Easy</td>
                  </tr>
                  <tr>
                    <td className="border p-3">Speed</td>
                    <td className="border p-3 text-center">Slower</td>
                    <td className="border p-3 text-center">✓ Fast</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Recommendation</h2>
            <p className="text-gray-700 mb-4">
              <strong>For maximum security:</strong> Use redaction for legal
              documents and compliance requirements.
            </p>
            <p className="text-gray-700 mb-6">
              <strong>For everyday privacy:</strong> Blurring with BlurKit provides
              excellent protection for screenshots, presentations, and general
              document sharing - especially when combined with PDF flattening.
            </p>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Try BlurKit&apos;s PDF Blurring
              </h3>
              <p className="mb-6 text-blue-100">
                Fast, secure, and browser-based. Perfect for protecting sensitive
                PDF information.
              </p>
              <Link href="/editor">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Start Blurring Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </section>
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
