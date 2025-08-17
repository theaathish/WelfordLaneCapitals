import { NextRequest, NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';
import { inspect } from 'util'; // Add this at the top for detailed error inspection

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  console.log('=== Contact API Route Called ===');
  
  // Validate required environment variables
  console.log('Checking environment variables...');
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_EMAIL) {
    console.error('Missing required environment variables:', {
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS ? '******' : undefined,
      CONTACT_EMAIL: process.env.CONTACT_EMAIL,
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT
    });
    return NextResponse.json(
      { success: false, error: 'Server configuration error. Please contact support.' },
      { status: 500 }
    );
  }
  console.log('Environment variables validated successfully');

  try {
    console.log('Parsing request body...');
    const { name, email, company, investmentSize, message } = await req.json();
    console.log('Request data received:', { name, email, company, investmentSize, message: message?.substring(0, 50) + '...' });

    // Validate input
    console.log('Validating input fields...');
    if (!name || !email || !message) {
      console.log('Validation failed:', { name: !!name, email: !!email, message: !!message });
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }
    console.log('Input validation passed');

    // Create SMTP transporter
    console.log('Creating SMTP transporter...');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      },
    });
    console.log('SMTP transporter created successfully');

    // Send email
    console.log('Preparing to send email...');
    const mailOptions = {
      from: `"Welford Lane Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Contact Form Submission: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nInvestment Size: ${investmentSize || 'N/A'}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Company:</strong> ${company || 'N/A'}</p><p><strong>Investment Size:</strong> ${investmentSize || 'N/A'}</p><p><strong>Message:</strong> ${message}</p>`
    };
    console.log('Mail options prepared:', { 
      from: mailOptions.from, 
      to: mailOptions.to, 
      subject: mailOptions.subject 
    });

    console.log('Sending email...');
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    });
  } catch (error) {
    console.error('Error sending email:', inspect(error, { depth: null })); // Log detailed error information
    return NextResponse.json(
      { success: false, error: 'Failed to send your message. Please try again later.' },
      { status: 500 }
    );
  }
}