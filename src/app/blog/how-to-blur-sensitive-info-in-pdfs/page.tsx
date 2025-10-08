import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  FileText,
  Shield,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const metadata: Metadata = {
  title:
    'How to Blur Sensitive Information in PDFs (2025 Complete Guide) | BlurKit',
  description:
    'Professional step-by-step guide on permanently blurring sensitive data in PDF documents. Learn GDPR-compliant methods, best practices, and free tools for secure PDF redaction.',
  keywords:
    'blur PDF, redact PDF, hide sensitive information PDF, PDF privacy, remove sensitive data PDF, PDF security, GDPR compliance, HIPAA PDF redaction',
  openGraph: {
    title: 'How to Blur Sensitive Information in PDFs - Complete 2025 Guide',
    description:
      'Learn professional techniques for securely blurring sensitive information in PDF documents with our comprehensive guide.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00.000Z',
  },
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar user={null} />

      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/blog" className="hover:text-blue-600">
            Blog
          </Link>
          {' > '}
          <span className="text-gray-900">
            How to Blur Sensitive Info in PDFs
          </span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              PDF Security
            </span>
            <span className="text-gray-500 text-sm">
              Published January 15, 2025 • 8 min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            How to Blur Sensitive Information in PDFs (2025 Complete Guide)
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            Learn professional techniques for permanently blurring sensitive data
            in PDF documents while maintaining GDPR and HIPAA compliance. This
            comprehensive guide covers free tools, best practices, and common
            mistakes to avoid.
          </p>
        </header>

        {/* Table of Contents */}
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Table of Contents
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#why-blur-pdfs" className="text-blue-600 hover:underline">
                1. Why Blur Sensitive Information in PDFs?
              </a>
            </li>
            <li>
              <a
                href="#blur-vs-redaction"
                className="text-blue-600 hover:underline"
              >
                2. Blurring vs. Redaction: What&apos;s the Difference?
              </a>
            </li>
            <li>
              <a
                href="#step-by-step"
                className="text-blue-600 hover:underline"
              >
                3. Step-by-Step: How to Blur PDFs
              </a>
            </li>
            <li>
              <a
                href="#best-practices"
                className="text-blue-600 hover:underline"
              >
                4. Best Practices for PDF Privacy
              </a>
            </li>
            <li>
              <a
                href="#common-mistakes"
                className="text-blue-600 hover:underline"
              >
                5. Common Mistakes to Avoid
              </a>
            </li>
            <li>
              <a href="#tools" className="text-blue-600 hover:underline">
                6. Best Tools for Blurring PDFs
              </a>
            </li>
            <li>
              <a href="#faq" className="text-blue-600 hover:underline">
                7. Frequently Asked Questions
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <section id="why-blur-pdfs" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Why Blur Sensitive Information in PDFs?
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              In 2025, data privacy regulations like{' '}
              <strong>GDPR in Europe</strong> and <strong>HIPAA in the US</strong>{' '}
              require organizations to protect personally identifiable information
              (PII) before sharing documents. Blurring sensitive data in PDFs is
              essential when:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <span>
                  <strong>Sharing medical records</strong> that contain patient
                  names, addresses, or social security numbers
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <span>
                  <strong>Submitting legal documents</strong> with confidential
                  client information
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <span>
                  <strong>Publishing financial reports</strong> while protecting
                  account numbers or credit card details
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <span>
                  <strong>Sending contracts or invoices</strong> that need partial
                  redaction
                </span>
              </li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-yellow-800 mb-2">
                    Important Security Note
                  </p>
                  <p className="text-yellow-700 text-sm leading-relaxed">
                    Simply drawing a black box over text in a PDF viewer is NOT
                    secure. The original text remains in the file and can be
                    extracted. Always use proper redaction or blur tools that
                    permanently remove or obscure the data.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="blur-vs-redaction" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Blurring vs. Redaction: What&apos;s the Difference?
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Understanding the distinction between{' '}
              <strong>blurring and redaction</strong> is crucial for choosing the
              right method:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                <h3 className="text-xl font-bold mb-3 text-blue-900">
                  📝 PDF Redaction
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Permanently removes text and images</li>
                  <li>✓ Replaces content with black boxes</li>
                  <li>✓ Data cannot be recovered</li>
                  <li>✓ Required for legal compliance</li>
                  <li>✓ Best for: Court documents, FOIA requests</li>
                </ul>
              </div>

              <div className="border-2 border-indigo-200 rounded-lg p-6 bg-indigo-50">
                <h3 className="text-xl font-bold mb-3 text-indigo-900">
                  🔒 PDF Blurring
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Obscures content visually</li>
                  <li>✓ Preserves document layout</li>
                  <li>✓ Can be applied to images or scanned PDFs</li>
                  <li>✓ Faster than traditional redaction</li>
                  <li>✓ Best for: Screenshots, presentations, sharing</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              <strong>Pro Tip:</strong> For maximum security, use{' '}
              <strong>flatten the PDF</strong> after blurring to convert all pages
              to images, making the original text completely unrecoverable.
            </p>
          </section>

          <section id="step-by-step" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Step-by-Step: How to Blur Sensitive Information in PDFs
            </h2>

            <div className="space-y-8">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold mb-3">
                  Method 1: Using BlurKit (Recommended - Free & Secure)
                </h3>
                <ol className="space-y-4 text-gray-700">
                  <li>
                    <strong>1. Upload your PDF</strong> - Visit{' '}
                    <Link href="/editor" className="text-blue-600 hover:underline">
                      BlurKit&apos;s editor
                    </Link>{' '}
                    and drag & drop your PDF file (up to 100MB)
                  </li>
                  <li>
                    <strong>2. Navigate pages</strong> - Use the page selector to
                    view each page that needs editing
                  </li>
                  <li>
                    <strong>3. Draw blur regions</strong> - Click and drag
                    rectangular or circular areas over sensitive information
                  </li>
                  <li>
                    <strong>4. Adjust blur intensity</strong> - Use the slider to
                    control how much blur is applied (higher = more secure)
                  </li>
                  <li>
                    <strong>5. Choose blur type</strong> - Select Gaussian blur
                    (smooth), Pixelate (mosaic), or Solid Color (complete coverage)
                  </li>
                  <li>
                    <strong>6. Export securely</strong> - Click &quot;Export
                    PDF&quot; to download your protected document
                  </li>
                </ol>

                <div className="mt-6">
                  <Link href="/editor">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                      Try BlurKit Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="border-l-4 border-gray-400 pl-6">
                <h3 className="text-xl font-bold mb-3">
                  Method 2: Using Adobe Acrobat Pro (Paid Software)
                </h3>
                <ol className="space-y-3 text-gray-700">
                  <li>1. Open PDF in Adobe Acrobat Pro ($19.99/month)</li>
                  <li>2. Select Tools → Redact</li>
                  <li>3. Mark areas for redaction</li>
                  <li>4. Apply redactions (this is permanent)</li>
                  <li>5. Save the redacted PDF</li>
                </ol>
                <p className="text-sm text-gray-600 mt-3">
                  ⚠️ <strong>Drawback:</strong> Expensive subscription required;
                  redaction removes text entirely rather than blurring
                </p>
              </div>

              <div className="border-l-4 border-gray-400 pl-6">
                <h3 className="text-xl font-bold mb-3">
                  Method 3: Convert to Images First (Advanced)
                </h3>
                <ol className="space-y-3 text-gray-700">
                  <li>
                    1. Convert PDF pages to PNG/JPG using a tool like pdf2image
                  </li>
                  <li>2. Use any image editor to blur sensitive areas</li>
                  <li>3. Combine edited images back into a PDF</li>
                </ol>
                <p className="text-sm text-gray-600 mt-3">
                  ⚠️ <strong>Drawback:</strong> Time-consuming; requires multiple
                  tools; may reduce image quality
                </p>
              </div>
            </div>
          </section>

          <section id="best-practices" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Best Practices for PDF Privacy Protection
            </h2>

            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    1. Always Verify Before Sharing
                  </h3>
                  <p className="text-gray-700">
                    Open the blurred PDF in a different viewer and zoom in to
                    ensure sensitive data is completely obscured. Test copying text
                    from blurred areas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    2. Use High Blur Intensity
                  </h3>
                  <p className="text-gray-700">
                    Don&apos;t use minimal blur that can be reversed with image
                    enhancement tools. Apply strong blur (radius 50+) or use solid
                    color blocks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    3. Remove PDF Metadata
                  </h3>
                  <p className="text-gray-700">
                    PDF files contain hidden metadata (author, creation date,
                    editing history). Use metadata removal tools before sharing
                    sensitive documents.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    4. Flatten PDFs After Editing
                  </h3>
                  <p className="text-gray-700">
                    Converting each page to an image prevents recovery of original
                    text. Most professional tools offer a &quot;flatten&quot;
                    option.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    5. Maintain Original Files Securely
                  </h3>
                  <p className="text-gray-700">
                    Keep unredacted originals in encrypted storage. Never overwrite
                    the original file with the redacted version.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="common-mistakes" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              5 Common PDF Blurring Mistakes (And How to Avoid Them)
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6">
                <h3 className="font-bold text-red-900 mb-2">
                  ❌ Mistake #1: Using Screenshot Tools Instead of Proper Blurring
                </h3>
                <p className="text-red-800 text-sm">
                  Taking a screenshot and adding blur in Paint or Photos leaves the
                  original PDF intact. Anyone with access to the source file can
                  see unredacted data.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6">
                <h3 className="font-bold text-red-900 mb-2">
                  ❌ Mistake #2: Relying on PDF Highlight Tools
                </h3>
                <p className="text-red-800 text-sm">
                  Black highlight markers in PDF readers are visual overlays only.
                  The text underneath is still selectable and searchable.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6">
                <h3 className="font-bold text-red-900 mb-2">
                  ❌ Mistake #3: Insufficient Blur Radius
                </h3>
                <p className="text-red-800 text-sm">
                  Light blur can be reversed using AI-powered image enhancement.
                  Always use maximum blur or solid color replacement.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6">
                <h3 className="font-bold text-red-900 mb-2">
                  ❌ Mistake #4: Forgetting Headers and Footers
                </h3>
                <p className="text-red-800 text-sm">
                  Sensitive information often appears in page headers, footers, or
                  margins. Check every page edge carefully.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6">
                <h3 className="font-bold text-red-900 mb-2">
                  ❌ Mistake #5: Not Testing the Final PDF
                </h3>
                <p className="text-red-800 text-sm">
                  Always open the exported PDF in a fresh viewer, attempt to
                  copy/paste text from blurred areas, and verify nothing is
                  recoverable.
                </p>
              </div>
            </div>
          </section>

          <section id="tools" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Best Tools for Blurring PDFs in 2025
            </h2>

            <div className="space-y-4">
              <div className="border-2 border-blue-500 rounded-lg p-6 bg-blue-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-blue-900">
                    1. BlurKit (Best Free Option)
                  </h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                    FREE
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 mb-4">
                  <li>✓ Browser-based (no installation)</li>
                  <li>✓ 100% private (no file uploads to servers)</li>
                  <li>✓ Multi-page PDF support</li>
                  <li>✓ 15 free blurs per day</li>
                  <li>✓ Multiple blur types (Gaussian, Pixelate, Solid)</li>
                </ul>
                <Link href="/editor">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                    Try BlurKit Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold">2. Adobe Acrobat Pro</h3>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    $19.99/mo
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  Professional PDF editing suite with permanent redaction. Best for
                  organizations with legal compliance requirements.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold">3. PDFtk (Command Line)</h3>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    FREE
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  Open-source PDF manipulation toolkit. Requires technical
                  knowledge; best for automation and batch processing.
                </p>
              </div>
            </div>
          </section>

          <section id="faq" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">
                  Q: Is blurring a PDF enough for GDPR compliance?
                </h3>
                <p className="text-gray-700">
                  A: Blurring can be GDPR-compliant if the blur is strong enough
                  that the original data cannot be recovered. For legal documents,
                  permanent redaction is recommended over blurring.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">
                  Q: Can blurred PDFs be &quot;unblurred&quot; with AI tools?
                </h3>
                <p className="text-gray-700">
                  A: Light blur (radius &lt; 20px) can potentially be reversed
                  using AI deblurring. Always use strong blur (50px+) or solid
                  color blocks for maximum security.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">
                  Q: What&apos;s the difference between blurring and pixelating?
                </h3>
                <p className="text-gray-700">
                  A: Pixelation creates a mosaic effect (like Japanese TV censors),
                  while Gaussian blur smoothly obscures the image. Both are
                  effective; pixelation is often preferred for faces.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">
                  Q: How do I blur an entire page in a PDF?
                </h3>
                <p className="text-gray-700">
                  A: In BlurKit, draw a blur region covering the entire page. For
                  multiple pages, apply blur regions individually to each page that
                  needs protection.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">
                  Q: Is it safe to blur PDFs online?
                </h3>
                <p className="text-gray-700">
                  A: Use tools like BlurKit that process files in your browser
                  (client-side) without uploading to servers. Avoid tools that
                  require uploading sensitive documents to unknown servers.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Conclusion</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Properly blurring sensitive information in PDFs is essential for
              protecting privacy and maintaining compliance with data protection
              regulations. By following the methods and best practices outlined in
              this guide, you can securely share PDF documents without risking data
              exposure.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              For the fastest and most secure PDF blurring experience, try{' '}
              <strong>BlurKit</strong> - our free, browser-based tool that
              processes your files privately without any server uploads.
            </p>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Secure Your PDFs?
              </h3>
              <p className="mb-6 text-blue-100">
                Start blurring sensitive information in seconds with BlurKit&apos;s
                powerful editor. No installation required.
              </p>
              <Link href="/editor">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Try BlurKit Free Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </section>

          {/* Author & Date */}
          <footer className="border-t pt-8 mt-12">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                <p>
                  <strong>Last updated:</strong> January 15, 2025
                </p>
                <p className="mt-1">
                  <strong>Category:</strong> PDF Security, Privacy Protection
                </p>
              </div>
              <Link
                href="/blog"
                className="text-blue-600 hover:underline flex items-center gap-2"
              >
                ← Back to Blog
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
}
