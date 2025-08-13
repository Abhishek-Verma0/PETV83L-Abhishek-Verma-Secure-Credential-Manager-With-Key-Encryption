const twilio = require('twilio');

class SMSService {
  constructor() {
    // Check if all required Twilio credentials are present AND valid
    const hasTwilioCredentials = process.env.TWILIO_ACCOUNT_SID && 
                                process.env.TWILIO_AUTH_TOKEN && 
                                process.env.TWILIO_PHONE_NUMBER;
    
    const hasValidAccountSid = process.env.TWILIO_ACCOUNT_SID && 
                              process.env.TWILIO_ACCOUNT_SID.startsWith('AC');
    
    if (hasTwilioCredentials && hasValidAccountSid) {
      try {
        this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        this.fromNumber = process.env.TWILIO_PHONE_NUMBER;
        console.log('Twilio SMS service initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Twilio:', error.message);
        console.log('Falling back to SMS mock mode');
        this.client = null;
      }
    } else {
      console.log('Twilio credentials not properly configured. SMS will be mocked in development mode.');
      console.log('Configuration status:', {
        TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID ? 
          (process.env.TWILIO_ACCOUNT_SID.startsWith('AC') ? 'Valid format' : 'Invalid format (should start with AC)') : 
          'Missing',
        TWILIO_AUTH_TOKEN: !!process.env.TWILIO_AUTH_TOKEN ? 'Present' : 'Missing',
        TWILIO_PHONE_NUMBER: !!process.env.TWILIO_PHONE_NUMBER ? 'Present' : 'Missing'
      });
      this.client = null;
    }
  }

  async sendOTP(phoneNumber, otp, username) {
    try {
      const message = `Your Credential Manager security code is: ${otp}. This code expires in 5 minutes.`;

      if (!this.client) {
        // Mock SMS in development
        console.log(`SMS Mock - Phone: ${phoneNumber}, Message: ${message}`);
        return { 
          success: true, 
          messageId: 'mock_' + Date.now(),
          mock: true 
        };
      }

      const result = await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: phoneNumber,
      });

      return { 
        success: true, 
        messageId: result.sid 
      };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  async sendMFASetupNotification(phoneNumber, username) {
    try {
      const message = `Hello ${username}, Multi-Factor Authentication has been enabled on your Credential Manager account via SMS.`;

      if (!this.client) {
        // Mock SMS in development
        console.log(`SMS Mock - Phone: ${phoneNumber}, Message: ${message}`);
        return { 
          success: true, 
          messageId: 'mock_' + Date.now(),
          mock: true 
        };
      }

      const result = await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: phoneNumber,
      });

      return { 
        success: true, 
        messageId: result.sid 
      };
    } catch (error) {
      console.error('Error sending MFA setup SMS:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  validatePhoneNumber(phoneNumber) {
    // Basic phone number validation
    const phoneRegex = /^\+[1-9]\d{1,14}$/; // E.164 format
    return phoneRegex.test(phoneNumber);
  }

  formatPhoneNumber(phoneNumber) {
    // Remove any non-digit characters except +
    let formatted = phoneNumber.replace(/[^\d+]/g, '');
    
    // Add + if not present and starts with country code
    if (!formatted.startsWith('+') && formatted.length > 10) {
      formatted = '+' + formatted;
    }
    
    return formatted;
  }
}

module.exports = new SMSService();
