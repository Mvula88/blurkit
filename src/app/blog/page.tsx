import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy & Security Blog | BlurKit - Image & PDF Redaction Guides',
  description:
    'Expert guides on protecting sensitive information in images and PDFs. Learn best practices for screenshot privacy, document redaction, and secure file sharing.',
  keywords:
    'image privacy, PDF redaction, screenshot security, blur sensitive data, document protection',
};

const blogPosts = [
  {
    slug: 'how-to-blur-sensitive-info-in-pdfs',
    title: 'How to Blur Sensitive Information in PDFs (2025 Complete Guide)',
    excerpt:
      'Learn professional techniques for permanently blurring sensitive data in PDF documents. Step-by-step guide with best practices for GDPR and HIPAA compliance.',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'PDF Security',
  },
  {
    slug: 'best-free-image-redaction-tool-2025',
    title: 'Best Free Image Redaction Tools in 2025 (Tested & Ranked)',
    excerpt:
      'Comprehensive comparison of the top free image redaction and blur tools. Find the perfect solution for protecting sensitive information in screenshots and photos.',
    date: '2025-01-14',
    readTime: '10 min read',
    category: 'Tool Comparison',
  },
  {
    slug: 'privacy-tips-for-screenshots',
    title: '15 Essential Privacy Tips for Screenshots (Avoid Data Leaks)',
    excerpt:
      'Protect yourself from accidental data exposure in screenshots. Expert tips for removing metadata, blurring sensitive areas, and secure screenshot sharing.',
    date: '2025-01-13',
    readTime: '7 min read',
    category: 'Privacy Tips',
  },
  {
    slug: 'protect-privacy-when-sharing-images-online',
    title: 'How to Protect Privacy When Sharing Images Online (2025 Guide)',
    excerpt:
      'Essential privacy protection strategies for sharing images on social media, email, and cloud storage. Prevent identity theft and data breaches.',
    date: '2025-01-12',
    readTime: '9 min read',
    category: 'Online Privacy',
  },
  {
    slug: 'pdf-redaction-vs-blurring',
    title: 'PDF Redaction vs Blurring: Which Method is More Secure?',
    excerpt:
      'In-depth technical comparison between PDF redaction and blurring. Learn which method offers better security for different use cases and compliance requirements.',
    date: '2025-01-11',
    readTime: '6 min read',
    category: 'Security Analysis',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar user={null} />

      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Privacy & Security Blog
          </h1>
          <p className="text-xl text-gray-600">
            Expert guides and tutorials on protecting sensitive information in
            your documents and images
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-5xl mx-auto space-y-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="border-2 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold w-fit">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-blue-600 font-semibold">
                    Read full article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto mt-20 text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Protect Your Sensitive Data?
          </h3>
          <p className="text-gray-700 mb-6">
            Start blurring sensitive information in your images and PDFs today
            with BlurKit&apos;s powerful privacy tools.
          </p>
          <Link
            href="/editor"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-all"
          >
            Try BlurKit Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </main>
    </div>
  );
}
