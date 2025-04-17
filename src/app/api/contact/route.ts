import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      )
    }

    // Create email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Portfolio Contact Form <no-reply@example.com>',
      to: 'krischolakov@icloud.com',
      subject: `Portfolio Contact: Message from ${name}`,
      replyTo: email,
      text: ` 
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; color: #333;">
  <h2 style="color: #38bdf8;">New contact form submission</h2>
  <p>You have received a new message from your portfolio contact form.</p>
  
  <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #38bdf8;">
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <div style="white-space: pre-wrap;">${message}</div>
  </div>
  
  <p style="font-size: 12px; color: #666;">This message was sent from your portfolio contact form.</p>
</div>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    // Return success response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending contact form email:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
