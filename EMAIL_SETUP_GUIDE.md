# Email Functionality Setup Guide

This guide provides comprehensive instructions for setting up the robust email sending functionality in your portfolio application.

## 🚀 Quick Setup

### 1. Environment Variables Setup

Create a `.env` file in your project root and configure the following variables:

```env
# Gmail Configuration for Contact Form
GMAIL_USER=reach.saddat@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
RECIPIENT_EMAIL=saddathasan94@gmail.com

# SMTP Configuration (defaults)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# Rate limiting
RATE_LIMIT_MAX=5
```

### 2. Gmail App Password Setup

**IMPORTANT**: You must use a Gmail App Password, not your regular Gmail password.

#### Steps to create Gmail App Password:

1. **Enable 2-Factor Authentication** (if not already enabled):
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Click on "App passwords" (under 2-Step Verification)
   - Select "Mail" as the app
   - Copy the generated 16-character password
   - Use this password in your `.env` file (remove any dashes)

## 📧 Email Flow

### Sender Configuration
- **Sender Email**: `reach.saddat@gmail.com`
- **Authentication**: Gmail App Password

### Recipient Handling
- **Primary Recipient**: `saddathasan94@gmail.com` (fixed)
- **CC**: User's provided email address (dynamic)
- **Reply-To**: User's email address

### Email Template
The system sends professional HTML emails with:
- Responsive design
- Clean formatting
- Timestamp
- All form fields (Name, Email, Subject, Message)
- Fallback text version

## 🔒 Security Features

### Rate Limiting
- **Limit**: 5 requests per minute per IP address
- **Window**: 60 seconds
- **Storage**: In-memory (use Redis in production)

### Input Validation & Sanitization
- Email format validation
- Required field validation
- XSS protection (script tag removal)
- HTML entity sanitization

### Security Headers
- CORS headers for Cloudflare compatibility
- Content Security Policy headers
- XSS Protection
- Frame Options
- Content Type Options

## ☁️ Cloudflare Compatibility

The implementation includes:
- Proper CORS headers
- Security headers
- Rate limiting
- Error handling for Cloudflare-specific restrictions

### Deployment Considerations
- Environment variables are automatically handled by Vercel
- No additional DNS records required for basic functionality
- SMTP works through Cloudflare proxy

## 🎯 User Experience

### Success Flow
1. User fills out contact form
2. Form validates inputs
3. API sends email to both recipients
4. Success toast: "Email sent successfully"
5. Form resets automatically

### Error Handling
The system handles various error scenarios:

- **Authentication Errors**: "Email authentication failed. Please contact support."
- **Connection Errors**: "Connection error. Please try again in a moment."
- **Rate Limiting**: "Too many requests. Please try again later."
- **Validation Errors**: "Please provide a valid email address"
- **Network Errors**: "Network error. Please try again."

## 🛠️ Technical Implementation

### API Endpoint: `/api/send-email.ts`
- **Method**: POST only
- **Rate Limited**: Yes (5 req/min per IP)
- **Validation**: Comprehensive input validation
- **Response Format**: JSON with success/error status

### Frontend Integration
- **Toast Notifications**: Sonner library
- **Form Validation**: Real-time validation
- **Loading States**: Visual feedback during submission
- **Error Display**: Both toast and inline error messages

### Dependencies
```json
{
  "nodemailer": "^6.x.x",
  "@types/nodemailer": "^6.x.x",
  "sonner": "^1.x.x"
}
```

## 🧪 Testing

### Local Testing
1. Set up environment variables
2. Start development server: `npm run dev`
3. Navigate to contact page
4. Fill out and submit form
5. Check for success toast and email delivery

### Production Testing
1. Deploy to Vercel/Cloudflare
2. Ensure environment variables are set
3. Test from production URL
4. Verify email delivery to both recipients

## 🚨 Troubleshooting

### Common Issues

**"Email authentication failed"**
- Verify Gmail App Password is correct
- Ensure 2FA is enabled on Gmail account
- Check GMAIL_USER matches the account with App Password

**"Connection error"**
- Check SMTP settings (host, port)
- Verify network connectivity
- Ensure Cloudflare isn't blocking SMTP

**"Rate limit exceeded"**
- Wait 1 minute between requests
- Adjust RATE_LIMIT_MAX if needed
- Consider implementing user-specific rate limiting

**Toast notifications not showing**
- Verify Sonner is properly imported
- Check Toaster component is rendered in main.tsx
- Ensure toast calls are in try/catch blocks

## 📊 Monitoring

### Logs to Monitor
- Email sending success/failure
- Rate limiting triggers
- Authentication failures
- SMTP connection issues

### Recommended Monitoring
- Set up alerts for authentication failures
- Monitor rate limiting patterns
- Track email delivery success rates
- Log error patterns for debugging

## 🔄 Maintenance

### Regular Tasks
- Monitor Gmail App Password expiration
- Review rate limiting effectiveness
- Update security headers as needed
- Check email deliverability

### Scaling Considerations
- Implement Redis for rate limiting in production
- Consider email service providers (SendGrid, AWS SES) for high volume
- Add email queue for reliability
- Implement retry mechanisms

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify environment variables are correctly set
3. Review server logs for specific error messages
4. Test with a simple email first

The system is designed to be robust and handle various edge cases, but proper configuration is essential for optimal performance.