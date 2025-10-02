// Cloudflare Worker function for sending emails
// Converted from Vercel serverless function to Cloudflare Pages Functions

// Rate limiting store (using Cloudflare KV in production)
const rateLimitStore = new Map();

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Input sanitization
function sanitizeInput(input) {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/[<>]/g, '')
              .trim();
}

// Rate limiting function
function checkRateLimit(ip) {
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

// Cloudflare Pages Function handler
export async function onRequestPost(context) {
  const { request, env } = context;
  
  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
  };

  try {
    // Get client IP
    const clientIP = request.headers.get('CF-Connecting-IP') || 
                     request.headers.get('X-Forwarded-For') || 
                     request.headers.get('X-Real-IP') || 
                     'unknown';
    
    // Rate limiting
    if (!checkRateLimit(clientIP)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Too many requests. Please try again later.',
        error: 'RATE_LIMIT_EXCEEDED'
      }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // Parse request body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ 
        success: false,
        message: 'All fields are required',
        error: 'MISSING_FIELDS'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Please provide a valid email address',
        error: 'INVALID_EMAIL'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // Validate sanitized inputs aren't empty
    if (!sanitizedName || !sanitizedSubject || !sanitizedMessage) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid input detected',
        error: 'INVALID_INPUT'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // Check environment variables
    if (!env.GMAIL_USER || !env.GMAIL_APP_PASSWORD) {
      console.error('Missing Gmail configuration');
      return new Response(JSON.stringify({
        success: false,
        message: 'Email service configuration error',
        error: 'CONFIG_ERROR'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

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

    // Prepare email data for Gmail API or SMTP service
    const emailData = {
      from: `"${sanitizedName}" <${env.GMAIL_USER}>`,
      to: env.RECIPIENT_EMAIL || 'saddathasan94@gmail.com',
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

    // Send email using Gmail API or external service
    // For Cloudflare Workers, we'll use a fetch request to Gmail API
    const gmailResponse = await sendEmailViaGmailAPI(emailData, env);
    
    if (!gmailResponse.success) {
      throw new Error(gmailResponse.error);
    }

    console.log('Email sent successfully:', gmailResponse.messageId);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Email sent successfully',
      messageId: gmailResponse.messageId
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('Email sending error:', {
      message: error.message,
      stack: error.stack
    });

    // Categorize errors for better user feedback
    let errorMessage = 'Failed to send email. Please try again later.';
    let errorCode = 'UNKNOWN_ERROR';

    if (error.message.includes('auth')) {
      errorMessage = 'Email authentication failed. Please contact support.';
      errorCode = 'AUTH_ERROR';
    } else if (error.message.includes('connection') || error.message.includes('timeout')) {
      errorMessage = 'Connection error. Please try again in a moment.';
      errorCode = 'CONNECTION_ERROR';
    } else if (error.message.includes('message') || error.message.includes('format')) {
      errorMessage = 'Invalid message format. Please check your input.';
      errorCode = 'MESSAGE_ERROR';
    }

    return new Response(JSON.stringify({ 
      success: false,
      message: errorMessage,
      error: errorCode
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
}

// Handle OPTIONS requests for CORS
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

// Gmail API email sending function
async function sendEmailViaGmailAPI(emailData, env) {
  try {
    // Create the email message in RFC 2822 format
    const emailMessage = [
      `From: ${emailData.from}`,
      `To: ${emailData.to}`,
      `Cc: ${emailData.cc}`,
      `Reply-To: ${emailData.replyTo}`,
      `Subject: ${emailData.subject}`,
      `Content-Type: text/html; charset=utf-8`,
      '',
      emailData.html
    ].join('\r\n');

    // Base64 encode the message
    const encodedMessage = btoa(unescape(encodeURIComponent(emailMessage)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Use Gmail API to send email
    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.GMAIL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raw: encodedMessage
      })
    });

    if (!response.ok) {
      // Fallback to SMTP service if Gmail API fails
      return await sendEmailViaSMTP(emailData, env);
    }

    const result = await response.json();
    return {
      success: true,
      messageId: result.id
    };

  } catch (error) {
    console.error('Gmail API error:', error);
    // Fallback to SMTP service
    return await sendEmailViaSMTP(emailData, env);
  }
}

// SMTP fallback function using external service
async function sendEmailViaSMTP(emailData, env) {
  try {
    // Use an external SMTP service like EmailJS or similar
    // For now, we'll simulate a successful send
    // In production, integrate with services like Resend, SendGrid, or Mailgun
    
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: env.EMAILJS_SERVICE_ID,
        template_id: env.EMAILJS_TEMPLATE_ID,
        user_id: env.EMAILJS_USER_ID,
        template_params: {
          from_name: emailData.from,
          to_email: emailData.to,
          cc_email: emailData.cc,
          subject: emailData.subject,
          message: emailData.text,
          reply_to: emailData.replyTo
        }
      })
    });

    if (response.ok) {
      return {
        success: true,
        messageId: `smtp-${Date.now()}`
      };
    } else {
      throw new Error('SMTP service failed');
    }

  } catch (error) {
    console.error('SMTP fallback error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}