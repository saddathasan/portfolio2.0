import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Input sanitization
function sanitizeInput(input: string): string {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/[<>]/g, '')
              .trim();
}

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX || '5');
  
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers for Cloudflare compatibility
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed',
      error: 'INVALID_METHOD'
    });
  }

  // Rate limiting
  const clientIP = req.headers['x-forwarded-for'] as string || 
                   req.headers['x-real-ip'] as string || 
                   req.connection?.remoteAddress || 
                   'unknown';
  
  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
      error: 'RATE_LIMIT_EXCEEDED'
    });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required',
        error: 'MISSING_FIELDS'
      });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
        error: 'INVALID_EMAIL'
      });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // Validate sanitized inputs aren't empty
    if (!sanitizedName || !sanitizedSubject || !sanitizedMessage) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input detected',
        error: 'INVALID_INPUT'
      });
    }

    // Check environment variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Missing Gmail configuration');
      return res.status(500).json({
        success: false,
        message: 'Email service configuration error',
        error: 'CONFIG_ERROR'
      });
    }

    // Configure Gmail SMTP transporter with enhanced settings
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify transporter configuration
    await transporter.verify();

    // Professional HTML email template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background: white; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: 600; color: #495057; }
          .value { margin-top: 5px; padding: 10px; background: #f8f9fa; border-radius: 4px; }
          .message-content { white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0; color: #212529;">New Contact Form Submission</h2>
            <p style="margin: 10px 0 0 0; color: #6c757d;">Received on ${new Date().toLocaleString()}</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${sanitizedName}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${sanitizedSubject}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="value message-content">${sanitizedMessage}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email options with dual recipient handling
    const mailOptions = {
      from: `"${sanitizedName}" <${process.env.GMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || 'saddathasan94@gmail.com',
      cc: email, // User's email as CC
      replyTo: email, // Set user's email as reply-to
      subject: `Contact Form: ${sanitizedSubject}`,
      html: htmlTemplate,
      text: `
New Contact Form Submission
Received on: ${new Date().toLocaleString()}

Name: ${sanitizedName}
Email: ${email}
Subject: ${sanitizedSubject}

Message:
${sanitizedMessage}
      `.trim(),
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);

    return res.status(200).json({ 
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error: any) {
    console.error('Email sending error:', {
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack
    });

    // Categorize errors for better user feedback
    let errorMessage = 'Failed to send email. Please try again later.';
    let errorCode = 'UNKNOWN_ERROR';

    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please contact support.';
      errorCode = 'AUTH_ERROR';
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      errorMessage = 'Connection error. Please try again in a moment.';
      errorCode = 'CONNECTION_ERROR';
    } else if (error.code === 'EMESSAGE') {
      errorMessage = 'Invalid message format. Please check your input.';
      errorCode = 'MESSAGE_ERROR';
    }

    return res.status(500).json({ 
      success: false,
      message: errorMessage,
      error: errorCode
    });
  }
}