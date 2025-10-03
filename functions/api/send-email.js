// Cloudflare Worker function for sending emails using Resend API
// Clean implementation with no Node.js dependencies

// Rate limiting store (basic in-memory store for Cloudflare Workers)
// Note: In production, consider using Cloudflare KV or Durable Objects for persistence
const rateLimitStore = new Map();

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Input sanitization
function sanitizeInput(input) {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/[<>]/g, '')
              .trim();
}

// Rate limiting function (simplified for Cloudflare Workers)
function checkRateLimit(ip, env) {
  // In Cloudflare Workers, we'll use a simple time-based approach
  // For production, consider using Cloudflare KV or Durable Objects
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = parseInt(env.RATE_LIMIT_MAX || '5');
  
  // For now, we'll use a basic in-memory store that resets per request
  // This is not ideal but works for basic protection
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
    console.log('Email function called - Environment check:', {
      hasResendApiKey: !!env.RESEND_API_KEY,
      hasFromEmail: !!env.FROM_EMAIL,
      hasRecipientEmail: !!env.RECIPIENT_EMAIL
    });

    // Get client IP
    const clientIP = request.headers.get('CF-Connecting-IP') || 
                     request.headers.get('X-Forwarded-For') || 
                     request.headers.get('X-Real-IP') || 
                     'unknown';
    
    // Rate limiting
    if (!checkRateLimit(clientIP, env)) {
      console.log('Rate limit exceeded for IP:', clientIP);
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

    console.log('Request received:', {
      name: name ? 'provided' : 'missing',
      email: email ? 'provided' : 'missing',
      subject: subject ? 'provided' : 'missing',
      message: message ? 'provided' : 'missing'
    });

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields');
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
      console.log('Invalid email format:', email);
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
      console.log('Invalid input detected after sanitization');
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

    // Check environment variables for Resend
    if (!env.RESEND_API_KEY) {
      console.error('Missing Resend API key');
      return new Response(JSON.stringify({
        success: false,
        message: 'Email service configuration error. Please configure Resend API key.',
        error: 'CONFIG_ERROR'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    if (!env.FROM_EMAIL) {
      console.error('Missing FROM_EMAIL configuration');
      return new Response(JSON.stringify({
        success: false,
        message: 'Email service configuration error. Please configure FROM_EMAIL.',
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
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f8f9fa;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px 20px; 
            border-radius: 8px 8px 0 0; 
            text-align: center;
          }
          .header h2 { 
            margin: 0; 
            font-size: 24px; 
            font-weight: 600; 
          }
          .header p { 
            margin: 10px 0 0 0; 
            opacity: 0.9; 
            font-size: 14px; 
          }
          .content { 
            background: white; 
            padding: 30px; 
            border-radius: 0 0 8px 8px; 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .field { 
            margin-bottom: 20px; 
            border-bottom: 1px solid #e9ecef; 
            padding-bottom: 15px; 
          }
          .field:last-child { 
            border-bottom: none; 
            margin-bottom: 0; 
          }
          .label { 
            font-weight: 600; 
            color: #495057; 
            font-size: 14px; 
            text-transform: uppercase; 
            letter-spacing: 0.5px; 
            margin-bottom: 8px; 
          }
          .value { 
            padding: 12px; 
            background: #f8f9fa; 
            border-radius: 6px; 
            border-left: 4px solid #667eea; 
            font-size: 15px; 
          }
          .message-content { 
            white-space: pre-wrap; 
            line-height: 1.6; 
          }
          .footer { 
            text-align: center; 
            margin-top: 20px; 
            padding: 20px; 
            color: #6c757d; 
            font-size: 12px; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
            <p>Received on ${new Date().toLocaleString()}</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${sanitizedName}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${sanitizedSubject}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="value message-content">${sanitizedMessage}</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from your portfolio contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Plain text version
    const textContent = `
New Contact Form Submission
Received on: ${new Date().toLocaleString()}

Name: ${sanitizedName}
Email: ${email}
Subject: ${sanitizedSubject}

Message:
${sanitizedMessage}

---
This email was sent from your portfolio contact form.
    `.trim();

    // Send email using Resend API
    const emailResult = await sendEmailViaResend({
      from: env.FROM_EMAIL,
      to: env.RECIPIENT_EMAIL || 'saddathasan94@gmail.com',
      cc: email, // Send copy to user's email
      reply_to: email, // Set user's email as reply-to
      subject: `Contact Form: ${sanitizedSubject}`,
      html: htmlTemplate,
      text: textContent
    }, env);

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      throw new Error(emailResult.error);
    }
    
    console.log('Email sent successfully via Resend:', emailResult.messageId);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Email sent successfully',
      messageId: emailResult.messageId
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
      stack: error.stack,
      name: error.name
    });

    // Categorize errors for better user feedback
    let errorMessage = 'Failed to send email. Please try again later.';
    let errorCode = 'UNKNOWN_ERROR';

    if (error.message.includes('Resend') || error.message.includes('API')) {
      errorMessage = 'Email service error. Please contact support.';
      errorCode = 'RESEND_API_ERROR';
    } else if (error.message.includes('configuration') || error.message.includes('CONFIG')) {
      errorMessage = 'Email service configuration error. Please contact support.';
      errorCode = 'CONFIG_ERROR';
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      errorMessage = 'Network error. Please try again in a moment.';
      errorCode = 'NETWORK_ERROR';
    } else if (error.message.includes('rate limit') || error.message.includes('429')) {
      errorMessage = 'Rate limit exceeded. Please try again later.';
      errorCode = 'RATE_LIMIT_ERROR';
    }

    return new Response(JSON.stringify({ 
      success: false,
      message: errorMessage,
      error: errorCode,
      details: error.message
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

// Resend API implementation for Cloudflare Workers
async function sendEmailViaResend(emailData, env) {
  try {
    console.log('Attempting to send email via Resend API...');
    
    // Validate Resend API key
    if (!env.RESEND_API_KEY) {
      console.error('Missing Resend API key');
      return {
        success: false,
        error: 'Resend API key is required'
      };
    }

    // Prepare Resend API payload
    const resendPayload = {
      from: emailData.from,
      to: [emailData.to],
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
      reply_to: emailData.reply_to
    };

    // Add CC if provided
    if (emailData.cc) {
      resendPayload.cc = [emailData.cc];
    }

    console.log('Sending email with Resend:', {
      from: resendPayload.from,
      to: resendPayload.to,
      cc: resendPayload.cc,
      subject: resendPayload.subject,
      reply_to: resendPayload.reply_to
    });

    // Send via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resendPayload)
    });

    const responseText = await response.text();
    
    if (!response.ok) {
      console.error('Resend API error:', {
        status: response.status,
        statusText: response.statusText,
        body: responseText
      });
      
      let errorMessage = `Resend API error: ${response.status} ${response.statusText}`;
      
      try {
        const errorData = JSON.parse(responseText);
        if (errorData.message) {
          errorMessage += ` - ${errorData.message}`;
        }
      } catch (e) {
        errorMessage += ` - ${responseText}`;
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse Resend response:', responseText);
      return {
        success: false,
        error: 'Invalid response from Resend API'
      };
    }

    console.log('Resend API response:', result);

    return {
      success: true,
      messageId: result.id || `resend-${Date.now()}`
    };

  } catch (error) {
    console.error('Resend API error:', error);
    return {
      success: false,
      error: `Resend API error: ${error.message}`
    };
  }
}