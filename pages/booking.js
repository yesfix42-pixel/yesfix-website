import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { services } from '../lib/services'

// Available time slots for booking
const TIME_SLOTS = [
  '8:00 AM – 10:00 AM',
  '10:00 AM – 12:00 PM',
  '12:00 PM – 2:00 PM',
  '2:00 PM – 4:00 PM',
  '4:00 PM – 6:00 PM',
  '6:00 PM – 8:00 PM',
]

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI (GPay, PhonePe, Paytm)' },
  { id: 'cash', label: 'Cash on Service' },
  { id: 'card', label: 'Credit / Debit Card' },
  { id: 'netbanking', label: 'Net Banking' },
]

export default function BookingPage() {
  const router = useRouter()

  // Form state — one object holding all form field values
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    address: '',
    services: [],         // Array of selected service IDs
    preferredDate: '',
    preferredTime: '',
    paymentMethod: '',
  })

  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  // If user clicked "Book" from a service card, pre-select that service
  useEffect(() => {
    const { service } = router.query
    if (service) {
      setForm((prev) => ({
        ...prev,
        services: [service],
      }))
    }
  }, [router.query])

  // Helper: today's date in YYYY-MM-DD format (so past dates can't be selected)
  const today = new Date().toISOString().split('T')[0]

  // Update a single text field
  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Toggle a service checkbox on/off
  function toggleService(serviceId) {
    setForm((prev) => {
      const already = prev.services.includes(serviceId)
      return {
        ...prev,
        services: already
          ? prev.services.filter((s) => s !== serviceId)
          : [...prev.services, serviceId],
      }
    })
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  // ── SUCCESS STATE ──
  if (status === 'success') {
    return (
      <>
        <Head><title>Booking Confirmed – YesFix</title></Head>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-500 mb-6">
              Thank you, {form.customerName}! We&apos;ve received your booking. Our team will call you on{' '}
              <strong>{form.phone}</strong> to confirm.
            </p>
            <div className="bg-brand-50 rounded-xl p-4 text-left text-sm mb-6 space-y-1">
              <p><strong>Date:</strong> {form.preferredDate}</p>
              <p><strong>Time:</strong> {form.preferredTime}</p>
              <p><strong>Services:</strong> {form.services.join(', ')}</p>
              <p><strong>Payment:</strong> {form.paymentMethod}</p>
            </div>
            <button
              onClick={() => { setStatus('idle'); setForm({ customerName: '', phone: '', address: '', services: [], preferredDate: '', preferredTime: '', paymentMethod: '' }) }}
              className="w-full bg-brand-500 text-white font-semibold py-3 rounded-xl hover:bg-brand-600 transition-colors"
            >
              Book Another Service
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // ── FORM STATE ──
  return (
    <>
      <Head>
        <title>Book a Service – YesFix</title>
        <meta name="description" content="Book a home cleaning or maintenance service with YesFix." />
      </Head>

      <Navbar />

      <main className="bg-gray-50 min-h-screen">
        <div className="bg-white border-b border-gray-100 py-10 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Book a Service</h1>
            <p className="text-gray-500">Fill in your details and we&apos;ll get back to you within 30 minutes.</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-12">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* ── SECTION 1: Personal Details ── */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Your Details</h2>

              <div className="space-y-4">
                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="customerName">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customerName"
                    name="customerName"
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={form.customerName}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent transition"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent transition"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="address">
                    Home Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows={3}
                    placeholder="Flat no., Building, Street, Area, City"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent transition resize-none"
                  />
                </div>
              </div>
            </div>

            {/* ── SECTION 2: Service Selection ── */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-1">Select Services</h2>
              <p className="text-sm text-gray-500 mb-5">You can select multiple services.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service) => {
                  const isSelected = form.services.includes(service.id)
                  return (
                    <button
                      type="button"
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-brand-400 bg-brand-50'
                          : 'border-gray-100 hover:border-gray-200 bg-white'
                      }`}
                    >
                      <span className="text-2xl">{service.emoji}</span>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${isSelected ? 'text-brand-700' : 'text-gray-800'}`}>
                          {service.name}
                        </p>
                        <p className="text-xs text-gray-500">{service.price}</p>
                      </div>
                      {isSelected && (
                        <span className="w-5 h-5 bg-brand-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">✓</span>
                      )}
                    </button>
                  )
                })}
              </div>

              {form.services.length === 0 && (
                <p className="text-xs text-red-500 mt-3">Please select at least one service.</p>
              )}
            </div>

            {/* ── SECTION 3: Date & Time ── */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Preferred Date & Time</h2>

              <div className="space-y-4">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="preferredDate">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    required
                    min={today}
                    value={form.preferredDate}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent transition"
                  />
                </div>

                {/* Time Slot */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Preferred Time Slot <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setForm((prev) => ({ ...prev, preferredTime: slot }))}
                        className={`py-2.5 px-3 rounded-xl text-xs font-medium border-2 transition-all ${
                          form.preferredTime === slot
                            ? 'border-brand-400 bg-brand-50 text-brand-700'
                            : 'border-gray-100 text-gray-600 hover:border-gray-200'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── SECTION 4: Payment Method ── */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Payment Method</h2>

              <div className="space-y-2">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      form.paymentMethod === method.id
                        ? 'border-brand-400 bg-brand-50'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={form.paymentMethod === method.id}
                      onChange={handleChange}
                      className="accent-brand-500"
                    />
                    <span className={`text-sm font-medium ${form.paymentMethod === method.id ? 'text-brand-700' : 'text-gray-700'}`}>
                      {method.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* ── ERROR MESSAGE ── */}
            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                ⚠️ {errorMsg}
              </div>
            )}

            {/* ── SUBMIT BUTTON ── */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-brand-500 text-white font-bold py-4 rounded-2xl text-lg hover:bg-brand-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-brand-100"
            >
              {status === 'loading' ? 'Confirming your booking...' : 'Confirm Booking →'}
            </button>

            <p className="text-center text-xs text-gray-400">
              By booking, you agree that our team will contact you to confirm the appointment.
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </>
  )
}
