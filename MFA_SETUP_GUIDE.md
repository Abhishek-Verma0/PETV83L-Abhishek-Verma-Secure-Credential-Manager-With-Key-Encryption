# Multi-Factor Authentication (MFA) Setup Guide

This guide will help you set up and use the Multi-Factor Authentication feature that has been added to your Credential Manager application.

## 🚀 Quick Start

### Server Setup

1. **Install new dependencies:**
   ```bash
   cd server
   npm install speakeasy qrcode nodemailer twilio
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

3. **Environment Configuration:**
   Edit your `.env` file with the following configurations:

   ```env
   # Required
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   MONGODB_URL=mongodb://localhost:27017/credentialmanager
   
   # Optional - Email MFA (using Gmail)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   EMAIL_FROM=noreply@credentialmanager.com
   
   # Optional - SMS MFA (using Twilio)
   TWILIO_ACCOUNT_SID=your-twilio-account-sid
   TWILIO_AUTH_TOKEN=your-twilio-auth-token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

### Client Setup

1. **Install new dependencies:**
   ```bash
   cd client
   npm install react-qr-code
   ```

2. **Start the client:**
   ```bash
   npm run dev
   ```

## 🔐 MFA Features

### Supported MFA Methods

1. **TOTP (Recommended)** - Time-based One-Time Password
   - Works with Google Authenticator, Authy, 1Password, etc.
   - Most secure option
   - Works offline

2. **Email** - Verification codes sent via email
   - Uses your registered email address
   - Requires email service configuration

3. **SMS** - Verification codes sent via text message
   - Requires phone number
   - Requires Twilio configuration

### How It Works

1. **Login Flow:**
   - Enter username/password
   - If MFA is enabled: Enter verification code
   - If MFA is disabled: Direct access

2. **MFA Setup:**
   - Navigate to "MFA Settings" from the navigation bar
   - Choose your preferred method
   - Follow the setup wizard
   - Save backup codes securely

3. **Backup Codes:**
   - 10 single-use backup codes generated during setup
   - Use when you can't access your primary MFA method
   - Can be regenerated anytime

## 📧 Email Configuration

### Gmail Setup (Recommended)

1. **Enable 2FA** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Create new app password for "Mail"
3. **Use in .env:**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

### Other Email Providers

Modify the email service configuration in `server/services/emailService.js`:

```javascript
// For Outlook/Hotmail
this.transporter = nodemailer.createTransporter({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// For custom SMTP
this.transporter = nodemailer.createTransporter({
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## 📱 SMS Configuration (Twilio)

1. **Sign up for Twilio:** https://www.twilio.com/
2. **Get credentials:**
   - Account SID
   - Auth Token
   - Phone Number
3. **Add to .env:**
   ```env
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your-auth-token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

## 🛠️ Development Mode

In development mode:

- **Email:** Uses Ethereal email testing service automatically
- **SMS:** Mock mode - codes logged to console instead of sent
- **TOTP:** Fully functional

## 🔒 Security Features

### Backup Codes
- 10 single-use codes for account recovery
- Hashed before storage
- Can be regenerated with password verification

### Rate Limiting
- OTP expiration: 5 minutes
- Resend cooldown: 60 seconds
- Single-use OTP codes

### Token Security
- Pre-auth tokens for MFA setup (10 min expiry)
- Full auth tokens after MFA verification (15 min expiry)
- MFA verification required for sensitive operations

## 🎯 User Guide

### Setting Up MFA

1. **Login** to your account
2. **Click "MFA Settings"** in the navigation bar
3. **Choose a method:**
   - **Authenticator App (Recommended):**
     - Scan QR code with your app
     - Enter verification code
     - Save backup codes
   - **Email:**
     - Verify with code sent to your email
     - Save backup codes
   - **SMS:**
     - Enter phone number
     - Verify with code sent via SMS
     - Save backup codes

### Using MFA

1. **Login normally** with username/password
2. **Enter verification code** based on your method:
   - **TOTP:** Code from authenticator app
   - **Email/SMS:** Code from message received
3. **Use backup code** if needed (single-use)

### Managing MFA

- **Disable MFA:** Requires password confirmation
- **Change Method:** Disable current, set up new method
- **Regenerate Backup Codes:** Requires password confirmation

## 🚨 Troubleshooting

### Common Issues

1. **Email not working:**
   - Check app password (not regular password)
   - Verify EMAIL_USER and EMAIL_PASS
   - Check spam folder

2. **SMS not working:**
   - Verify Twilio credentials
   - Check phone number format (+1234567890)
   - Ensure phone number is verified with Twilio

3. **TOTP not working:**
   - Check device time is synchronized
   - Try previous/next code (time drift)
   - Regenerate secret if needed

4. **Backup codes not working:**
   - Each code can only be used once
   - Regenerate if all used

### Support

- Check server logs for detailed error messages
- Verify environment configuration
- Ensure all dependencies are installed

## 🔧 API Endpoints

### MFA Routes

```
POST /api/mfa/setup-totp         # Setup TOTP
POST /api/mfa/setup-email        # Setup email MFA
POST /api/mfa/setup-sms          # Setup SMS MFA
POST /api/mfa/verify-totp-setup  # Verify TOTP setup
POST /api/mfa/verify-otp-setup   # Verify email/SMS setup
POST /api/mfa/send-otp           # Send OTP for login
POST /api/mfa/verify             # Verify MFA during login
POST /api/mfa/disable            # Disable MFA
GET  /api/mfa/status             # Get MFA status
POST /api/mfa/regenerate-backup-codes # Regenerate backup codes
```

### Updated Auth Flow

```
POST /api/auth/login             # Returns MFA requirement if enabled
POST /api/auth/register          # Normal registration
```

## 📊 Database Schema Updates

The User model now includes:

```javascript
{
  // Existing fields...
  mfaEnabled: Boolean,
  mfaMethod: String, // 'email', 'sms', 'totp'
  totpSecret: String,
  phoneNumber: String,
  otpCode: String, // Hashed
  otpExpires: Date,
  otpUsed: Boolean,
  backupCodes: [{ code: String, used: Boolean, createdAt: Date }]
}
```

## 🎉 That's It!

Your Credential Manager now has enterprise-grade Multi-Factor Authentication! Users can choose their preferred method and enjoy enhanced security for their stored credentials.

Remember to:
- ✅ Keep backup codes safe
- ✅ Use TOTP when possible (most secure)
- ✅ Configure email/SMS services for full functionality
- ✅ Never commit .env files to version control
