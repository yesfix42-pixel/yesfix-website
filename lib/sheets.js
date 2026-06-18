// lib/sheets.js
// This file handles saving booking data to your Google Sheet.
//
// HOW IT WORKS:
// When a customer submits a booking, we send the data to a Google Apps Script
// web app URL. That script writes a new row into your Google Sheet.

export async function saveBookingToSheet(bookingData) {
  // STEP: Replace this URL with YOUR Google Apps Script deployment URL.
  // You will get this URL in Step 6 of the setup guide.
  const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

  if (!GOOGLE_SCRIPT_URL) {
    throw new Error(
      'Missing NEXT_PUBLIC_GOOGLE_SCRIPT_URL in your .env.local file. See setup guide Step 6.'
    )
  }

  // We send the booking data to Google Apps Script as a POST request.
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain', // Google Apps Script requires text/plain for CORS
    },
    body: JSON.stringify(bookingData),
  })

  if (!response.ok) {
    throw new Error('Failed to save booking to Google Sheets.')
  }

  return await response.json()
}
