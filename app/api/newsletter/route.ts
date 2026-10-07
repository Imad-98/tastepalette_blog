import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const sheetUrl = process.env.GOOGLE_SHEET_URL
    if (!sheetUrl) {
      return NextResponse.json({ error: 'Google Sheet URL is missing.' }, { status: 500 })
    }

    // إرسال الإيميل لـ Google Sheets
    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to save email.' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}