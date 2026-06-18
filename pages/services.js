import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { services } from '../lib/services'

export default function ServicesPage() {

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = []
    }
    acc[service.category].push(service)
    return acc
  }, {})

  return (
    <>
      <Head>
        <title>Our Services – YesFix</title>
        <meta
          name="description"
          content="Professional home services in Dibrugarh by YesFix."
        />
      </Head>

      <Navbar />

      <main className="bg-gray-50 min-h-screen">

        {/* Header */}
        <div className="bg-white border-b border-gray-100 py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
              Our Services
            </h1>
            <p className="text-gray-500 text-lg">
              Professional home services delivered at your doorstep.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="max-w-6xl mx-auto px-4 py-16">

          {Object.entries(groupedServices).map(
            ([category, categoryServices]) => (
              <div key={category} className="mb-16">

                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 border-b pb-3">
                    {category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  {categoryServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
                    >

                      <div className="flex items-start gap-4 mb-5">
                        <div className="text-5xl">
                          {service.emoji}
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {service.name}
                          </h3>

                          <div className="flex gap-3 mt-1 flex-wrap">
                            <span className="text-orange-500 font-bold text-lg">
                              {service.price}
                            </span>

                            <span className="text-gray-400 text-sm self-center">
                              • {service.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed mb-5">
                        {service.longDesc}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {service.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-sm text-gray-700"
                          >
                            <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                              ✓
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={`/booking?service=${service.id}`}
                        className="block w-full text-center bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition-colors"
                      >
                        Book {service.name}
                      </Link>

                    </div>
                  ))}

                </div>
              </div>
            )
          )}

        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto px-4 pb-16 text-center">
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Need multiple services?
            </h2>

            <p className="text-gray-600 mb-5">
              Book multiple services in one visit and save time.
            </p>

            <Link
              href="/booking"
              className="bg-orange-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-orange-600 transition-colors"
            >
              Book Now →
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </>
  )
}