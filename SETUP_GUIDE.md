# 🛠️ YesFix — Complete Beginner Setup Guide

Welcome! This guide will take you from zero to a live website, step by step.
Each step is explained as if you've never done this before. Don't skip any step.

---

## 🗺️ What You're Building

```
YesFix Website
├── Homepage        → Showcases your business + services
├── Services Page   → Detailed view of each service
└── Booking Page    → Customer form that saves to Google Sheets
```

---

## STEP 1 — Install the Tools You Need

You need two tools on your computer before anything else.

### 1A. Install Node.js

Node.js is what runs your Next.js website on your computer.

1. Go to **https://nodejs.org**
2. Download the **LTS version** (the green button — it's the stable one)
3. Run the installer. Click Next → Next → Install → Finish
4. Verify it worked: Open **Terminal** (Mac) or **Command Prompt** (Windows) and type:
   ```
   node --version
   ```
   You should see something like `v20.11.0`. If you do, ✅ Node.js is installed.

### 1B. Install VS Code (Code Editor)

VS Code is where you'll write and edit code.

1. Go to **https://code.visualstudio.com**
2. Download and install it
3. Open VS Code

---

## STEP 2 — Set Up Your Project

### 2A. Open the project folder in VS Code

1. In VS Code, click **File → Open Folder**
2. Navigate to the `yesfix` folder (the one containing all these files)
3. Click **Open**

### 2B. Open the Terminal inside VS Code

1. In VS Code, click **Terminal → New Terminal** (at the top menu)
2. A terminal panel opens at the bottom of the screen
3. You'll type all commands here

### 2C. Install project dependencies

In the terminal, type this command and press Enter:

```bash
npm install
```

This downloads all the libraries your project needs (Next.js, Tailwind CSS, etc.).
It may take 1–2 minutes. You'll see a progress bar.

When it finishes, you'll see something like `added 312 packages`.

---

## STEP 3 — Run Your Website Locally

In the terminal, type:

```bash
npm run dev
```

Now open your browser and go to: **http://localhost:3000**

🎉 You should see the YesFix homepage!

- Homepage: http://localhost:3000
- Services: http://localhost:3000/services
- Booking: http://localhost:3000/booking

> **What is "localhost:3000"?**
> It's your website running privately on your own computer.
> Only you can see it right now. We'll make it public in Step 7.

---

## STEP 4 — Set Up Google Sheets as Your Database

This is where all your customer bookings will be stored.

### 4A. Create a Google Sheet

1. Go to **https://sheets.google.com**
2. Click the **+** button to create a new spreadsheet
3. Name it: **YesFix Bookings** (click the title at the top to rename)
4. Rename the first tab (bottom of screen) to: **Bookings**

Your Google Sheet is now ready. Leave this tab open.

---

## STEP 5 — Set Up Google Apps Script

Google Apps Script is a piece of code that runs inside Google Sheets.
When your website sends a booking, this script writes it into your sheet automatically.

### 5A. Open the Script Editor

1. In your Google Sheet, click **Extensions** (top menu)
2. Click **Apps Script**
3. A new tab opens with a code editor

### 5B. Paste the script

1. In the script editor, you'll see some default code. **Delete all of it**.
2. Open the file `google-apps-script.js` from this project folder
3. Copy everything in that file (Ctrl+A then Ctrl+C)
4. Paste it into the Google Apps Script editor (Ctrl+V)
5. Click the 💾 **Save** button (or press Ctrl+S)
6. Name the project **YesFix** when prompted

---

## STEP 6 — Deploy the Script (Get Your URL)

This step makes your script accessible from the internet so your website can talk to it.

1. In the Apps Script editor, click **Deploy** (top right)
2. Click **New Deployment**
3. Click the gear icon ⚙️ next to "Type" and select **Web App**
4. Fill in:
   - **Description**: YesFix Booking API
   - **Execute as**: Me (your Google account)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Google will ask you to authorize the app:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to YesFix (unsafe)** → **Allow**
   *(This is safe — it's your own script)*
7. You'll see a URL that looks like:
   ```
   https://script.google.com/macros/s/AKfycbxXXXXXXXXX/exec
   ```
8. **Copy this URL** — you'll need it in the next step

---

## STEP 7 — Connect Your Website to Google Sheets

1. In VS Code, find the file `.env.local` in your project root
2. Open it and replace `PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE` with the URL you copied:
   ```
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxXXXXXXXXX/exec
   ```
3. Save the file

### 7A. Restart your development server

Stop the current server by pressing **Ctrl+C** in the terminal.
Start it again:
```bash
npm run dev
```

### 7B. Test a booking

1. Go to http://localhost:3000/booking
2. Fill out the form completely
3. Click "Confirm Booking"
4. Check your Google Sheet — a new row should appear!

---

## STEP 8 — Deploy Your Website to the Internet (Free with Vercel)

Vercel is a free platform for hosting Next.js websites.

### 8A. Create a GitHub account (if you don't have one)

Go to **https://github.com** and sign up (it's free).

### 8B. Create a Vercel account

Go to **https://vercel.com** and sign up with your GitHub account.

### 8C. Upload your project to GitHub

In your VS Code terminal:

```bash
# Initialize git (tracks your code changes)
git init

# Stage all files
git add .

# Save a snapshot (called a "commit")
git commit -m "Initial YesFix website"

# Create a new repository on GitHub
# Go to https://github.com/new, name it "yesfix", click Create
# Then copy the commands GitHub shows you and run them here
```

### 8D. Deploy to Vercel

1. Go to **https://vercel.com/new**
2. Click **Import** next to your `yesfix` repository
3. On the configuration screen:
   - Framework Preset: **Next.js** (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: leave blank (default)
4. Click **Environment Variables** and add:
   - Name: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - Value: Your Google Apps Script URL
5. Click **Deploy**

Vercel will build and deploy your site. In about 2 minutes, you'll get a URL like:
```
https://yesfix.vercel.app
```

🎉 **Your website is now live on the internet!**

---

## 📁 Project File Structure Explained

```
yesfix/
│
├── pages/                     ← Every file here becomes a webpage
│   ├── _app.js                ← Root wrapper (loads CSS globally)
│   ├── index.js               ← Homepage (/)
│   ├── services.js            ← Services page (/services)
│   ├── booking.js             ← Booking page (/booking)
│   └── api/
│       └── booking.js         ← API endpoint that saves to Google Sheets
│
├── components/                ← Reusable building blocks
│   ├── Navbar.js              ← Navigation bar (used on all pages)
│   └── Footer.js              ← Footer (used on all pages)
│
├── lib/                       ← Helper functions
│   ├── services.js            ← All service data (edit this to change services)
│   └── sheets.js              ← Google Sheets connection logic
│
├── styles/
│   └── globals.css            ← Global CSS (Tailwind imports, fonts)
│
├── .env.local                 ← Secret keys (NEVER share this)
├── .gitignore                 ← Files to exclude from GitHub
├── google-apps-script.js      ← Script to paste into Google Apps Script
├── next.config.js             ← Next.js configuration
├── tailwind.config.js         ← Tailwind CSS configuration
├── postcss.config.js          ← PostCSS configuration
└── package.json               ← Project info and dependencies
```

---

## ✏️ Common Customizations

### Change a service name or price
Edit `lib/services.js`. All pages automatically update.

### Add a new service
In `lib/services.js`, copy an existing service object and change the values.

### Change your phone number
Edit `components/Footer.js`.

### Change the brand color
Edit `tailwind.config.js`. The `brand` color is used everywhere.

### Add a new time slot
Edit `pages/booking.js` → find the `TIME_SLOTS` array at the top.

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "npm: command not found" | Node.js not installed. Redo Step 1A. |
| Website doesn't open at localhost:3000 | Make sure `npm run dev` is running in terminal |
| Booking doesn't appear in Google Sheets | Check that your Script URL in `.env.local` is correct |
| Error after changing `.env.local` | Restart the server with Ctrl+C then `npm run dev` |
| Google Script shows "Authorization required" | Redo Step 6 and re-authorize |
| Website works locally but not on Vercel | Make sure you added the env variable in Vercel dashboard |

---

## 🚀 What's Next (After Launch)

Once your site is live, here are ideas to improve it:

1. **Custom domain** — Buy `yesfix.in` on GoDaddy/Namecheap and connect it to Vercel
2. **WhatsApp confirmation** — Send a WhatsApp message when a booking is made (using Twilio or WhatsApp Business API)
3. **Email confirmation** — Email the customer a confirmation (using Nodemailer or Resend)
4. **Admin dashboard** — Build a private page to view/manage bookings
5. **Payment gateway** — Add Razorpay or Cashfree for online payments
6. **Analytics** — Add Google Analytics to track visitors

---

*Built with Next.js, Tailwind CSS, and Google Sheets. Happy growing! 🌱*
