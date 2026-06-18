// ═══════════════════════════════════════════════════════════
// YESFIX — Google Apps Script
// ═══════════════════════════════════════════════════════════
//
// PURPOSE:
// This script runs inside Google Sheets.
// When your website sends a booking, this script adds a new row.
//
// HOW TO INSTALL:
// 1. Open your Google Sheet (sheet name should be "Bookings")
// 2. Click Extensions → Apps Script
// 3. Delete any existing code in the editor
// 4. Copy and paste ALL of this file into the editor
// 5. Click File → Save (Ctrl+S or Cmd+S)
// 6. Click Deploy → New Deployment
//    - Type: Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 7. Click Deploy → Copy the URL that appears
// 8. Paste that URL into your .env.local file
//
// ═══════════════════════════════════════════════════════════

// The name of your Google Sheet tab
var SHEET_NAME = "Bookings";

// Column headers (must match the order below in appendRow)
var HEADERS = [
  "Timestamp",
  "Customer Name",
  "Phone",
  "Address",
  "Services",
  "Preferred Date",
  "Preferred Time",
  "Payment Method",
  "Status"
];

// ── This function runs when a POST request arrives ──────────
function doPost(e) {
  try {
    // Parse the booking data sent from your website
    var data = JSON.parse(e.postData.contents);

    // Open the active spreadsheet and get the Bookings sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // If the sheet doesn't exist yet, create it and add headers
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      
      // Make headers bold and freeze the first row
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // If the sheet is empty (no headers yet), add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Add the new booking as a row
    sheet.appendRow([
      data.timestamp,
      data.customerName,
      data.phone,
      data.address,
      data.services,
      data.preferredDate,
      data.preferredTime,
      data.paymentMethod,
      data.status || "New"
    ]);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, HEADERS.length);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Booking saved!" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // If anything goes wrong, return an error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── This function runs when someone opens the URL in a browser ──
// It's used to verify your script is working
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "YesFix Google Apps Script is running!" }))
    .setMimeType(ContentService.MimeType.JSON);
}
