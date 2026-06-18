// pages/api/booking.js
//
// This is a Next.js API Route.
// When the booking form submits, it sends data to THIS endpoint (/api/booking).
// This file then forwards the data to Google Sheets.
//
// Think of it as: Form → /api/booking → Google Sheets

import { saveBookingToSheet } from '../../lib/sheets'

export default async function handler(req, res) {
  // Only allow POST requests (form submissions)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' })
  }

  // Pull out all the booking fields from the request body
  const {
    customerName,
    phone,
    address,
    services,
    preferredDate,
    preferredTime,
    paymentMethod,
  } = req.body

  // Basic validation — make sure required fields exist
  if (!customerName || !phone || !address || !services || services.length === 0 || !preferredDate || !preferredTime) {
    return res.status(400).json({ error: 'Please fill in all required fields.' })
  }

  // Build the booking object we'll send to Google Sheets
  const bookingData = {
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    customerName,
    phone,
    address,
    services: services.join(', '),   // Convert array to comma-separated string
    preferredDate,
    preferredTime,
    paymentMethod: paymentMethod || 'Not specified',
    status: 'New',                   // Default status for new bookings
  }

  try {
    await saveBookingToSheet(bookingData)
    return res.status(200).json({ success: true, message: 'Booking confirmed!' })
  } catch (error) {
    console.error('Booking error:', error.message)
    return res.status(500).json({ error: 'Failed to save booking. Please try again.' })
  }
}
