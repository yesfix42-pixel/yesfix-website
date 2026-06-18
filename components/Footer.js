import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">Y</span>
              </div>
              <span className="text-lg font-bold text-white">
                Yes<span className="text-brand-400">Fix</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Professional home services delivered to your door. Fast, reliable, affordable.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/booking" className="hover:text-white transition-colors">Book Now</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>📞 +91 98765 43210</li>
              <li>✉️ hello@yesfix.in</li>
              <li>🕐 Mon–Sat, 8am – 8pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} YesFix. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
