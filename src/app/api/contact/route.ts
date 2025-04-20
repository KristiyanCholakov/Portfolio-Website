import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

// Email validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
})

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

// Verify transporter connection at startup
async function verifyTransporter() {
  try {
    await transporter.verify()
    console.log('SMTP connection verified successfully')
    return true
  } catch (error) {
    console.error('SMTP verification failed:', error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate using Zod schema
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      const errors = result.error.flatten()
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: errors.fieldErrors,
        },
        { status: 400 }
      )
    }

    const { name, email, message } = result.data

    // Verify connection before sending
    const isConnectionValid = await verifyTransporter()
    if (!isConnectionValid) {
      return NextResponse.json(
        { success: false, error: 'Email service temporarily unavailable' },
        { status: 503 }
      )
    }

    // Create email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Portfolio Contact Form <no-reply@example.com>',
      to: process.env.EMAIL_TO || 'krischolakov@icloud.com',
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

    // Send the email and get info
    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent successfully:', info.messageId)

    // Return success response with message ID
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
    })
  } catch (error: any) {
    console.error('Error sending contact form email:', error)

    // More specific error messages based on common nodemailer errors
    const errorMessage = error.code
      ? getErrorMessageByCode(error.code)
      : 'Failed to send email. Please try again later.'

    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}

// Helper function to provide friendlier error messages
function getErrorMessageByCode(code: string): string {
  switch (code) {
    case 'EAUTH':
      return 'Authentication error. Please contact the administrator.'
    case 'ESOCKET':
      return 'Network error. Please check your connection and try again.'
    case 'ECONNECTION':
      return 'Connection error. Email service may be unavailable.'
    case 'ETIMEDOUT':
      return 'Connection timed out. Please try again later.'
    default:
      return 'Failed to send email. Please try again later.'
  }
}
