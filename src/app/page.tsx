import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ImageIcon,
  Sparkles,
  Zap,
  Lock,
  Download,
  ArrowRight,
  Shield,
  Layers,
  Upload,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Clean Upload Design */}
      <section className="relative bg-gradient-to-b from-blue-50 via-white to-gray-50 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Online image blur & privacy editor
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple blur types supported. 100% browser-based processing.
              Upload an image to get started!
            </p>

            {/* Upload Area */}
            <div className="mt-12 relative">
              <Link href="/editor">
                <div className="border-4 border-dashed border-gray-300 rounded-3xl bg-white hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer p-16 sm:p-24">
                  <div className="flex flex-col items-center justify-center space-y-6">
                    {/* Upload Icon */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur-xl opacity-30" />
                      <div className="relative bg-white rounded-2xl p-6 shadow-lg">
                        <Upload className="h-16 w-16 text-blue-600" />
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-12 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      UPLOAD YOUR IMAGE
                    </Button>

                    {/* Drop Text */}
                    <p className="text-gray-500 text-sm">
                      or drop your image here
                    </p>

                    {/* File Size */}
                    <p className="text-gray-400 text-xs">Size up to 100 MB</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="relative -mt-20 container mx-auto px-4 pb-20">
        <div className="relative rounded-2xl border-4 border-white shadow-2xl bg-white overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center p-8">
              <ImageIcon className="h-24 w-24 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 font-medium text-lg">
                Editor Preview Coming Soon
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Professional blur editing interface with precision controls
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Powerful Features for Image Privacy
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to protect sensitive information in your images
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group relative flex flex-col p-8 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ImageIcon className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Custom Blur Regions</h3>
            <p className="text-muted-foreground leading-relaxed">
              Draw precise rectangular or circular blur areas with pixel-perfect
              accuracy. Multiple shapes supported.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group relative flex flex-col p-8 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Real-Time Preview</h3>
            <p className="text-muted-foreground leading-relaxed">
              See changes instantly as you adjust blur intensity. Lightning-fast
              processing even on large images.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group relative flex flex-col p-8 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lock className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">100% Private</h3>
            <p className="text-muted-foreground leading-relaxed">
              All processing happens in your browser. Your images never leave
              your device. Zero server uploads.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group relative flex flex-col p-8 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Drag & Resize</h3>
            <p className="text-muted-foreground leading-relaxed">
              Easily move and resize blur regions with intuitive handles. Undo
              and redo support included.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group relative flex flex-col p-8 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Download className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Export High Quality</h3>
            <p className="text-muted-foreground leading-relaxed">
              Download your protected images in original quality. Maintains full
              resolution and metadata.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group relative flex flex-col p-8 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Layers className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Save Projects</h3>
            <p className="text-muted-foreground leading-relaxed">
              Create an account to save your blur configurations and access them
              from anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />

        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-white">
              Ready to Protect Your Images?
            </h2>
            <p className="text-blue-100 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users securing their sensitive information with
              BlurKit. Start blurring in seconds with our powerful editor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/editor">
                <Button
                  size="lg"
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8"
                >
                  Try Editor Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <ImageIcon className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">BlurKit</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 BlurKit. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
