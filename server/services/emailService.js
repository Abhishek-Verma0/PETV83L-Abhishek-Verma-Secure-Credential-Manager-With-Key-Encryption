const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    // Configure nodemailer transporter
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this to your preferred email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password for Gmail
      },
    });

    // For development, you can use Ethereal email for testing
    if (process.env.NODE_ENV === 'development' && !process.env.EMAIL_USER) {
      this.setupTestTransporter();
    }
  }

  async setupTestTransporter() {
    try {
      // Create test account for development
      const testAccount = await nodemailer.createTestAccount();
      this.transporter = nodemailer.createTransporter({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log('Test email transporter configured');
    } catch (error) {
      console.error('Failed to setup test email transporter:', error);
    }
  }

  async sendOTP(email, otp, username) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@credentialmanager.com',
        to: email,
        subject: 'Your Security Code - Credential Manager',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Security Code</h2>
            <p>Hello ${username},</p>
            <p>Your security code for Credential Manager is:</p>
            <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
              <h1 style="color: #007bff; font-size: 32px; letter-spacing: 8px; margin: 0;">${otp}</h1>
            </div>
            <p>This code will expire in 5 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              This is an automated message from Credential Manager. Please do not reply to this email.
            </p>
          </div>
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      
      // Log preview URL for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }

      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending OTP email:', error);
      return { success: false, error: error.message };
    }
  }

  async sendMFASetupNotification(email, username) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@credentialmanager.com',
        to: email,
        subject: 'Multi-Factor Authentication Enabled - Credential Manager',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">MFA Enabled</h2>
            <p>Hello ${username},</p>
            <p>Multi-Factor Authentication has been successfully enabled on your Credential Manager account.</p>
            <p>Your account is now more secure with an additional layer of protection.</p>
            <p>If you didn't enable MFA, please contact support immediately.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              This is an automated message from Credential Manager. Please do not reply to this email.
            </p>
          </div>
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending MFA setup notification:', error);
      return { success: false, error: error.message };
    }
  }

  async sendMFADisabledNotification(email, username) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@credentialmanager.com',
        to: email,
        subject: 'Multi-Factor Authentication Disabled - Credential Manager',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">MFA Disabled</h2>
            <p>Hello ${username},</p>
            <p>Multi-Factor Authentication has been disabled on your Credential Manager account.</p>
            <p style="color: #d9534f;">Your account security has been reduced. We recommend re-enabling MFA to keep your account secure.</p>
            <p>If you didn't disable MFA, please contact support immediately and change your password.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              This is an automated message from Credential Manager. Please do not reply to this email.
            </p>
          </div>
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending MFA disabled notification:', error);
      return { success: false, error: error.message };
    }
  }

  async sendPasswordResetEmail(email, username, resetUrl) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@credentialmanager.com',
        to: email,
        subject: 'Password Reset Request - Credential Manager',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>Hello ${username},</p>
            <p>We received a request to reset your password for your Credential Manager account.</p>
            <p>Click the button below to reset your password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #007bff;">${resetUrl}</p>
            <p><strong>This link will expire in 15 minutes.</strong></p>
            <p style="color: #d9534f;">⚠️ <strong>Security Notice:</strong> If you have Multi-Factor Authentication enabled, it will be disabled after password reset for security purposes. You can re-enable it from your account settings.</p>
            <p>If you didn't request this password reset, please ignore this email and your password will remain unchanged.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              This is an automated message from Credential Manager. Please do not reply to this email.
            </p>
          </div>
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Password reset email sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }

      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return { success: false, error: error.message };
    }
  }

  async sendPasswordResetConfirmation(email, username) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@credentialmanager.com',
        to: email,
        subject: 'Password Reset Successful - Credential Manager',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Password Reset Successful</h2>
            <p>Hello ${username},</p>
            <p>Your password has been successfully reset for your Credential Manager account.</p>
            <p style="color: #d9534f;">⚠️ <strong>Security Notice:</strong> Your Multi-Factor Authentication has been disabled for security purposes. We recommend re-enabling MFA from your account settings to keep your account secure.</p>
            <p>If you didn't make this change, please contact support immediately.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              This is an automated message from Credential Manager. Please do not reply to this email.
            </p>
          </div>
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending password reset confirmation:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new EmailService();
