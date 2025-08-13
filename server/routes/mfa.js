const router = require('express').Router();
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { requireMFA, requirePreAuth } = require('../middleware/mfa');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');

// Generate TOTP secret and QR code for setup
router.post('/setup-totp', requirePreAuth, async (req, res) => {
  try {
    console.log('TOTP setup requested for user:', req.user.userId);
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `Credential Manager (${user.email})`,
      issuer: 'Credential Manager',
    });

    // Generate QR code
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);
    console.log('QR code generated successfully');

    // Temporarily store the secret (don't save to DB until verified)
    const tempToken = jwt.sign(
      { 
        userId: user._id, 
        tempSecret: secret.base32,
        setupType: 'totp'
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '10m' }
    );

    res.json({
      secret: secret.base32,
      qrCode: qrCodeUrl, // Data URL for display
      otpauthUrl: secret.otpauth_url, // Raw URL for debugging/alternative
      tempToken
    });
    console.log('TOTP setup response sent successfully');
  } catch (error) {
    console.error('TOTP setup error:', error);
    res.status(500).json({ message: 'Error setting up TOTP' });
  }
});

// Verify TOTP setup
router.post('/verify-totp-setup', requirePreAuth, async (req, res) => {
  try {
    const { token: totpToken, tempToken } = req.body;

    if (!totpToken || !tempToken) {
      return res.status(400).json({ message: 'TOTP token and temp token required' });
    }

    // Verify temp token
    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
    if (decoded.userId !== req.user.userId || decoded.setupType !== 'totp') {
      return res.status(400).json({ message: 'Invalid setup token' });
    }

    // Verify TOTP
    const verified = speakeasy.totp.verify({
      secret: decoded.tempSecret,
      encoding: 'base32',
      token: totpToken,
      window: 2, // Allow some time drift
    });

    if (!verified) {
      return res.status(400).json({ message: 'Invalid TOTP code' });
    }

    // Save TOTP secret and enable MFA
    const user = await User.findById(req.user.userId);
    user.totpSecret = decoded.tempSecret;
    user.mfaEnabled = true;
    user.mfaMethod = 'totp';
    
    // Generate backup codes
    const backupCodes = user.generateBackupCodes();
    await user.save();

    // Send notification email
    await emailService.sendMFASetupNotification(user.email, user.username);

    res.json({ 
      message: 'TOTP MFA enabled successfully',
      backupCodes 
    });
  } catch (error) {
    console.error('TOTP verification error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid setup token' });
    }
    res.status(500).json({ message: 'Error verifying TOTP' });
  }
});

// Setup Email MFA
router.post('/setup-email', requirePreAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate and send OTP to verify email
    const otp = user.generateOTP();
    await user.save();

    const emailResult = await emailService.sendOTP(user.email, otp, user.username);
    
    if (!emailResult.success) {
      return res.status(500).json({ message: 'Failed to send verification email' });
    }

    res.json({ 
      message: 'Verification code sent to your email',
      email: user.email.replace(/(.{2})(.*)(@.*)/, '$1***$3') // Mask email
    });
  } catch (error) {
    console.error('Email MFA setup error:', error);
    res.status(500).json({ message: 'Error setting up email MFA' });
  }
});

// Setup SMS MFA
router.post('/setup-sms', requirePreAuth, async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // Validate and format phone number
    const formattedPhone = smsService.formatPhoneNumber(phoneNumber);
    if (!smsService.validatePhoneNumber(formattedPhone)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update phone number and generate OTP
    user.phoneNumber = formattedPhone;
    const otp = user.generateOTP();
    await user.save();

    const smsResult = await smsService.sendOTP(formattedPhone, otp, user.username);
    
    if (!smsResult.success) {
      return res.status(500).json({ message: 'Failed to send SMS verification' });
    }

    res.json({ 
      message: 'Verification code sent to your phone',
      phoneNumber: formattedPhone.replace(/(\+\d{1,3})(\d{3})(\d{3})(\d{4})/, '$1***$4'), // Mask phone
      mock: smsResult.mock || false
    });
  } catch (error) {
    console.error('SMS MFA setup error:', error);
    res.status(500).json({ message: 'Error setting up SMS MFA' });
  }
});

// Verify Email/SMS OTP setup
router.post('/verify-otp-setup', requirePreAuth, async (req, res) => {
  try {
    const { otp, method } = req.body;

    if (!otp || !method || !['email', 'sms'].includes(method)) {
      return res.status(400).json({ message: 'OTP and valid method required' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.verifyOTP(otp)) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Enable MFA
    user.mfaEnabled = true;
    user.mfaMethod = method;
    user.otpUsed = true;
    
    // Generate backup codes
    const backupCodes = user.generateBackupCodes();
    await user.save();

    // Send notification
    if (method === 'email') {
      await emailService.sendMFASetupNotification(user.email, user.username);
    } else {
      await smsService.sendMFASetupNotification(user.phoneNumber, user.username);
    }

    res.json({ 
      message: `${method.toUpperCase()} MFA enabled successfully`,
      backupCodes 
    });
  } catch (error) {
    console.error('OTP setup verification error:', error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
});

// Disable MFA
router.post('/disable', requirePreAuth, async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password required to disable MFA' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Additional security: If MFA is enabled and user has access to their MFA method,
    // we should verify their identity through the current session token
    // This ensures they have recently logged in
    
    // Check if the token is recent (within last 30 minutes)
    const tokenAge = Date.now() - (req.user.iat * 1000);
    const thirtyMinutes = 30 * 60 * 1000;
    
    if (tokenAge > thirtyMinutes) {
      return res.status(403).json({ 
        message: 'Please log in again to disable MFA for security reasons',
        requiresRecentLogin: true 
      });
    }

    // Disable MFA
    user.mfaEnabled = false;
    user.mfaMethod = null;
    user.totpSecret = null;
    user.phoneNumber = null;
    user.backupCodes = [];
    user.clearOTP();
    await user.save();

    // Send notification
    await emailService.sendMFADisabledNotification(user.email, user.username);

    res.json({ message: 'MFA disabled successfully' });
  } catch (error) {
    console.error('MFA disable error:', error);
    res.status(500).json({ message: 'Error disabling MFA' });
  }
});

// Get MFA status
router.get('/status', requirePreAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('mfaEnabled mfaMethod phoneNumber email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      mfaEnabled: user.mfaEnabled,
      mfaMethod: user.mfaMethod,
      hasPhoneNumber: !!user.phoneNumber,
      phoneNumber: user.phoneNumber ? user.phoneNumber.replace(/(\+\d{1,3})(\d{3})(\d{3})(\d{4})/, '$1***$4') : null,
      email: user.email.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
      backupCodesCount: (user.backupCodes || []).filter(bc => !bc.used).length
    });
  } catch (error) {
    console.error('MFA status error:', error);
    res.status(500).json({ message: 'Error fetching MFA status' });
  }
});

// Send OTP for login verification
router.post('/send-otp', async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email && !username) {
      return res.status(400).json({ message: 'Email or username required' });
    }

    const user = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (!user || !user.mfaEnabled) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    const otp = user.generateOTP();
    await user.save();

    let result;
    if (user.mfaMethod === 'email') {
      result = await emailService.sendOTP(user.email, otp, user.username);
    } else if (user.mfaMethod === 'sms') {
      result = await smsService.sendOTP(user.phoneNumber, otp, user.username);
    } else {
      return res.status(400).json({ message: 'Invalid MFA method' });
    }

    if (!result.success) {
      return res.status(500).json({ message: 'Failed to send OTP' });
    }

    res.json({ 
      message: 'OTP sent successfully',
      method: user.mfaMethod,
      destination: user.mfaMethod === 'email' 
        ? user.email.replace(/(.{2})(.*)(@.*)/, '$1***$3')
        : user.phoneNumber.replace(/(\+\d{1,3})(\d{3})(\d{3})(\d{4})/, '$1***$4'),
      mock: result.mock || false
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
});

// Verify MFA during login
router.post('/verify', async (req, res) => {
  try {
    const { token: mfaToken, preAuthToken, method, backupCode } = req.body;

    if (!preAuthToken) {
      return res.status(400).json({ message: 'Pre-auth token required' });
    }

    // Verify pre-auth token
    const decoded = jwt.verify(preAuthToken, process.env.JWT_SECRET);
    if (!decoded.preAuth) {
      return res.status(400).json({ message: 'Invalid pre-auth token' });
    }

    const user = await User.findById(decoded.userId);
    if (!user || !user.mfaEnabled) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    let verified = false;

    // Check if using backup code
    if (backupCode) {
      verified = user.verifyBackupCode(backupCode);
      if (verified) {
        await user.save(); // Save to mark backup code as used
      }
    } else if (user.mfaMethod === 'totp') {
      // Verify TOTP
      verified = speakeasy.totp.verify({
        secret: user.totpSecret,
        encoding: 'base32',
        token: mfaToken,
        window: 2,
      });
    } else if (['email', 'sms'].includes(user.mfaMethod)) {
      // Verify OTP
      verified = user.verifyOTP(mfaToken);
      if (verified) {
        user.otpUsed = true;
        await user.save();
      }
    }

    if (!verified) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Generate full auth token
    const fullAuthToken = jwt.sign(
      { 
        userId: user._id,
        mfaVerified: true 
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Clear OTP data
    user.clearOTP();
    await user.save();

    res.json({
      token: fullAuthToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        mfaEnabled: user.mfaEnabled
      }
    });
  } catch (error) {
    console.error('MFA verification error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Error verifying MFA' });
  }
});

// Regenerate backup codes
router.post('/regenerate-backup-codes', requirePreAuth, async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password required' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Check if the token is recent (within last 30 minutes) for security
    const tokenAge = Date.now() - (req.user.iat * 1000);
    const thirtyMinutes = 30 * 60 * 1000;
    
    if (tokenAge > thirtyMinutes) {
      return res.status(403).json({ 
        message: 'Please log in again to regenerate backup codes for security reasons',
        requiresRecentLogin: true 
      });
    }

    // Clear old backup codes and generate new ones
    user.backupCodes = [];
    const backupCodes = user.generateBackupCodes();
    await user.save();

    res.json({ 
      message: 'Backup codes regenerated successfully',
      backupCodes 
    });
  } catch (error) {
    console.error('Backup codes regeneration error:', error);
    res.status(500).json({ message: 'Error regenerating backup codes' });
  }
});

module.exports = router;
