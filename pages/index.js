import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { services } from '../lib/services'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>YesFix – Home Services at Your Doorstep</title>
        <meta name="description" content="Book AC cleaning, bathroom cleaning, sofa cleaning and more. Professional home services at your doorstep." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        {/* ── HERO SECTION ── */}
        <section className="bg-gradient-to-br from-brand-50 via-orange-50 to-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-brand-100 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-5 uppercase tracking-wide">
              Trusted by 1,000+ happy homes
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Your home deserves{' '}
              <span className="text-brand-500">professional care</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Book expert cleaning & maintenance services in minutes. We come to you — fully equipped, fully trained.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-brand-500 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-brand-600 transition-colors shadow-lg shadow-brand-200"
              >
                Book Now →
              </Link>
              <Link
                href="/services"
                className="bg-white text-gray-700 font-semibold px-8 py-4 rounded-2xl text-lg border border-gray-200 hover:border-brand-300 transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
        </section>

        {/* ── TRUST BADGES ── */}
        <section className="py-10 border-y border-gray-100 bg-white">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: '✅', label: 'Verified Pros' },
              { icon: '⚡', label: 'Same-Day Booking' },
              { icon: '💰', label: 'Transparent Pricing' },
              { icon: '🛡️', label: 'Satisfaction Guarantee' },
            ].map((badge) => (
              <div key={badge.label} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{badge.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{badge.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICES PREVIEW ── */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Services</h2>
              <p className="text-gray-500">Everything your home needs, under one roof.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all group"
                >
                  <div className="text-4xl mb-4">{service.emoji}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{service.shortDesc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-500 font-bold">{service.price}</span>
                    <Link
                      href="/booking"
                      className="text-sm font-semibold text-brand-500 hover:underline group-hover:translate-x-1 transition-transform inline-block"
                    >
                      Book →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/services"
                className="inline-block border border-brand-400 text-brand-600 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
              >
                See All Service Details
              </Link>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
              <p className="text-gray-500">Getting your home cleaned is this simple.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { step: '1', icon: '📱', title: 'Book Online', desc: 'Choose your service and preferred date on our website.' },
                { step: '2', icon: '🏠', title: 'We Come to You', desc: 'Our trained professional arrives at your doorstep on time.' },
                { step: '3', icon: '✨', title: 'Enjoy a Clean Home', desc: 'Sit back and relax. We handle everything.' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                    {item.icon}
                  </div>
                  <div className="inline-block bg-brand-500 text-white text-xs font-bold px-2 py-0.5 rounded-full mb-2">
                    Step {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="py-16 px-4 bg-brand-500">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready for a cleaner home?</h2>
            <p className="text-brand-100 mb-8 text-lg">Book your first service today. Takes less than 2 minutes.</p>
            <Link
              href="/booking"
              className="bg-white text-brand-600 font-bold px-8 py-4 rounded-2xl text-lg hover:bg-brand-50 transition-colors"
            >
              Book a Service →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
