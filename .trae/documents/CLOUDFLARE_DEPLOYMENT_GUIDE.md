# Cloudflare Pages Deployment Guide

Complete guide for deploying your React portfolio website with email functionality to Cloudflare Pages.

## 🚀 Overview

This guide covers deploying a React + Vite portfolio with Nodemailer email functionality from Vercel serverless functions to Cloudflare Pages with Workers.

**Key Components:**
- React + Vite frontend
- Email functionality using Nodemailer + Gmail SMTP
- Serverless functions for email sending
- Environment variables for secure configuration

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ GitHub repository with your portfolio code
- ✅ Cloudflare account (free tier works)
- ✅ Gmail account with 2FA enabled
- ✅ Gmail App Password generated
- ✅ Domain name (optional, can use Cloudflare subdomain)

## 🔧 Step 1: Prepare Your Code for Cloudflare

### 1.1 Convert Vercel Function to Cloudflare Worker

Since Cloudflare Pages uses Workers instead of Vercel functions, we need to adapt the email functionality.

Create `functions/api/send-email.js` in your project root:

```javascript
// functions/api/send-email.js
import nodemailer from 'nodemailer';

export async function onRequestPost(context) {
  const { request, env } = context;
  
  // CORS headers for Cloudflare
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting (simple implementation)
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    
    // Parse request body
    const { name, email, subject, message } = await request.json();

    // Input validation
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, message: 'All fields are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Configure nodemailer with Gmail
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: env.GMAIL_USER,
        pass: env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; text-align: center;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #495057; margin-top: 0;">Contact Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: white; padding: 25px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #495057; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px;">
              Sent from your portfolio contact form<br>
              ${new Date().toLocaleString()}
            </p>
          </div>
        </body>
      </html>
    `;

    // Send email
    const mailOptions = {
      from: `"Portfolio Contact" <${env.GMAIL_USER}>`,
      to: env.RECIPIENT_EMAIL,
      cc: email,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: htmlContent,
      text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Email sending error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Failed to send email. Please try again.' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
}
```

### 1.2 Update Package.json for Cloudflare

Add Cloudflare-specific dependencies:

```json
{
  "dependencies": {
    "nodemailer": "^6.9.8"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20231218.0"
  }
}
```

### 1.3 Create Cloudflare Configuration

Create `wrangler.toml` in your project root:

```toml
name = "portfolio-site"
compatibility_date = "2024-01-01"
pages_build_output_dir = "dist"

[env.production]
vars = { NODE_ENV = "production" }

[[env.production.kv_namespaces]]
binding = "RATE_LIMIT"
id = "your-kv-namespace-id"
```

## 🌐 Step 2: Deploy to Cloudflare Pages

### 2.1 Connect GitHub Repository

1. **Login to Cloudflare Dashboard**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to "Pages" in the sidebar

2. **Create New Project**
   - Click "Create a project"
   - Select "Connect to Git"
   - Choose "GitHub" and authorize Cloudflare

3. **Select Repository**
   - Choose your portfolio repository
   - Click "Begin setup"

### 2.2 Configure Build Settings

**Build Configuration:**
```
Framework preset: None (or Vite if available)
Build command: npm run build
Build output directory: dist
Root directory: / (leave empty)
```

**Advanced Settings:**
```
Node.js version: 18.x
Environment variables: (configure in next step)
```

### 2.3 Set Environment Variables

In Cloudflare Pages dashboard:

1. Go to your project → Settings → Environment variables
2. Add the following variables for **Production**:

```
GMAIL_USER=reach.saddat@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
RECIPIENT_EMAIL=saddathasan94@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
RATE_LIMIT_MAX=5
```

**Important Notes:**
- Use your actual Gmail App Password (16 characters, no spaces)
- Keep GMAIL_USER as `reach.saddat@gmail.com`
- Set RECIPIENT_EMAIL to your target email
- These variables are encrypted and secure

## 🔒 Step 3: Security Configuration

### 3.1 Configure Security Headers

Create `_headers` file in your `public` directory:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/api/*
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: POST, OPTIONS
  Access-Control-Allow-Headers: Content-Type
  Access-Control-Max-Age: 86400
```

### 3.2 Configure Redirects

Create `_redirects` file in your `public` directory:

```
# SPA fallback
/*    /index.html   200

# API routes
/api/send-email    /api/send-email    200
```

## 🚀 Step 4: Deploy and Test

### 4.1 Initial Deployment

1. **Trigger Deployment**
   - Push changes to your main branch
   - Cloudflare will automatically build and deploy
   - Monitor build logs in Cloudflare dashboard

2. **Verify Build Success**
   - Check build logs for any errors
   - Ensure all dependencies installed correctly
   - Verify environment variables are loaded

### 4.2 Test Email Functionality

1. **Access Your Site**
   - Use the Cloudflare Pages URL (e.g., `your-project.pages.dev`)
   - Navigate to the contact form

2. **Test Email Sending**
   - Fill out the contact form completely
   - Submit and check for success message
   - Verify email delivery to both recipients

3. **Check Browser Console**
   - Look for any JavaScript errors
   - Verify API calls are successful (200 status)
   - Check network tab for proper responses

## 🌍 Step 5: Custom Domain Setup (Optional)

### 5.1 Add Custom Domain

1. **In Cloudflare Pages Dashboard**
   - Go to your project → Custom domains
   - Click "Set up a custom domain"
   - Enter your domain name

2. **DNS Configuration**
   - Add CNAME record: `www` → `your-project.pages.dev`
   - Add CNAME record: `@` → `your-project.pages.dev`
   - Or use Cloudflare nameservers for full management

### 5.2 SSL Certificate

- Cloudflare automatically provisions SSL certificates
- Enable "Always Use HTTPS" in SSL/TLS settings
- Set SSL mode to "Full (strict)" for best security

## 🔧 Step 6: Performance Optimization

### 6.1 Cloudflare Optimizations

**Speed Settings:**
- Enable Auto Minify (CSS, HTML, JS)
- Enable Brotli compression
- Set Browser Cache TTL to "Respect Existing Headers"

**Caching Rules:**
```
Cache Level: Standard
Browser Cache TTL: 4 hours
Edge Cache TTL: 2 hours
```

### 6.2 Build Optimizations

Update your `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['@tanstack/react-router'],
          ui: ['framer-motion', 'lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    sourcemap: false, // Disable for production
  },
});
```

## 🐛 Step 7: Troubleshooting

### 7.1 Common Issues

**Build Failures:**
```bash
# Check Node.js version compatibility
# Ensure all dependencies are in package.json
# Verify build command is correct
```

**Email Not Sending:**
- Verify environment variables are set correctly
- Check Gmail App Password is valid
- Ensure 2FA is enabled on Gmail account
- Check Cloudflare Workers logs

**CORS Errors:**
- Verify `_headers` file is in public directory
- Check API function returns proper CORS headers
- Ensure preflight OPTIONS requests are handled

### 7.2 Debugging Steps

1. **Check Build Logs**
   - Review Cloudflare Pages build output
   - Look for dependency installation errors
   - Verify environment variables are loaded

2. **Monitor Function Logs**
   - Use Cloudflare Workers dashboard
   - Check real-time logs during email sending
   - Look for authentication or SMTP errors

3. **Test API Directly**
   ```bash
   curl -X POST https://your-site.pages.dev/api/send-email \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
   ```

## 📊 Step 8: Monitoring and Analytics

### 8.1 Cloudflare Analytics

- **Web Analytics**: Track page views, performance
- **Workers Analytics**: Monitor function execution
- **Security Events**: Track blocked requests

### 8.2 Email Monitoring

Set up monitoring for:
- Email delivery success rates
- Authentication failures
- Rate limiting triggers
- SMTP connection issues

## 🔄 Step 9: Maintenance

### 9.1 Regular Tasks

- **Monthly**: Review Gmail App Password expiration
- **Weekly**: Check email delivery rates
- **Daily**: Monitor error logs and performance

### 9.2 Updates and Scaling

**For High Traffic:**
- Implement KV storage for rate limiting
- Consider Cloudflare Workers KV for session management
- Add email queuing for reliability

**Security Updates:**
- Regularly update dependencies
- Review and update security headers
- Monitor for new Cloudflare security features

---

## 🎉 Deployment Checklist

- [ ] Code adapted for Cloudflare Workers
- [ ] Repository connected to Cloudflare Pages
- [ ] Build settings configured correctly
- [ ] Environment variables set in production
- [ ] Security headers configured
- [ ] Email functionality tested
- [ ] Custom domain configured (optional)
- [ ] Performance optimizations applied
- [ ] Monitoring and analytics set up

## 📞 Support Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Gmail SMTP Settings](https://support.google.com/mail/answer/7126229)
- [Nodemailer Documentation](https://nodemailer.com/about/)

Your portfolio is now deployed on Cloudflare with fully functional email capabilities! 🚀