import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const mfaService = {
  // Get MFA status
  getMFAStatus: () => api.get('/mfa/status'),

  // TOTP Setup
  setupTOTP: () => api.post('/mfa/setup-totp'),
  verifyTOTPSetup: (token, tempToken) => 
    api.post('/mfa/verify-totp-setup', { token, tempToken }),

  // Email MFA Setup
  setupEmail: () => api.post('/mfa/setup-email'),
  
  // SMS MFA Setup
  setupSMS: (phoneNumber) => 
    api.post('/mfa/setup-sms', { phoneNumber }),

  // Verify OTP Setup (for email/SMS)
  verifyOTPSetup: (otp, method) => 
    api.post('/mfa/verify-otp-setup', { otp, method }),

  // Disable MFA
  disableMFA: (password) => 
    api.post('/mfa/disable', { password }),

  // Backup codes
  regenerateBackupCodes: (password) => 
    api.post('/mfa/regenerate-backup-codes', { password }),
};

// Create a separate API instance for MFA verification that doesn't include auth headers
const mfaApi = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const publicMFAService = {
  sendOTP: (email, username) => 
    mfaApi.post('/mfa/send-otp', { email, username }),

  verifyMFA: (token, preAuthToken, method, backupCode = null) => 
    mfaApi.post('/mfa/verify', { token, preAuthToken, method, backupCode }),
};
