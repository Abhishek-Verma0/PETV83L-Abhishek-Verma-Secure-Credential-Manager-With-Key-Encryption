import React, { useState, useEffect } from 'react';
import { publicMFAService } from '../service/mfa';
import FormInput from './FormInput';
import Button from './Button';
import '../styles/mfaVerification.css';

const MFAVerification = ({ 
  preAuthToken, 
  mfaMethod, 
  destination,
  onVerificationSuccess,
  onCancel,
  username,
  email
}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCode, setBackupCode] = useState('');
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    // For email/SMS methods, automatically send OTP on component mount
    if ((mfaMethod === 'email' || mfaMethod === 'sms') && !otpSent) {
      handleSendOTP();
    }
  }, [mfaMethod]);

  useEffect(() => {
    // Countdown timer for resend cooldown
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleSendOTP = async () => {
    if (mfaMethod !== 'email' && mfaMethod !== 'sms') return;

    setResendLoading(true);
    setError('');

    try {
      await publicMFAService.sendOTP(email, username);
      setOtpSent(true);
      setResendCooldown(60); // 60 seconds cooldown
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send verification code');
    } finally {
      setResendLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await publicMFAService.verifyMFA(
        useBackupCode ? null : verificationCode,
        preAuthToken,
        mfaMethod,
        useBackupCode ? backupCode : null
      );

      onVerificationSuccess(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const getMethodDisplayName = () => {
    switch (mfaMethod) {
      case 'email': return 'Email';
      case 'sms': return 'SMS';
      case 'totp': return 'Authenticator App';
      default: return 'MFA';
    }
  };

  const getInstructions = () => {
    if (useBackupCode) {
      return 'Enter one of your backup codes';
    }

    switch (mfaMethod) {
      case 'email':
        return `We've sent a 6-digit code to ${destination}`;
      case 'sms':
        return `We've sent a 6-digit code to ${destination}`;
      case 'totp':
        return 'Enter the 6-digit code from your authenticator app';
      default:
        return 'Enter your verification code';
    }
  };

  return (
    <div className="mfa-verification-container">
      <div className="mfa-verification-box">
        <div className="mfa-header">
          <h2>Two-Factor Authentication</h2>
          <p className="mfa-method">Using {getMethodDisplayName()}</p>
        </div>

        <div className="mfa-instructions">
          <p>{getInstructions()}</p>
        </div>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleVerify}>
          {!useBackupCode ? (
            <FormInput
              label={mfaMethod === 'totp' ? 'Authenticator Code' : 'Verification Code'}
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              maxLength={6}
              required
              autoFocus
            />
          ) : (
            <FormInput
              label="Backup Code"
              type="text"
              value={backupCode}
              onChange={(e) => setBackupCode(e.target.value.toUpperCase().replace(/[^A-F0-9]/g, ''))}
              placeholder="XXXXXXXX"
              maxLength={8}
              required
              autoFocus
            />
          )}

          <div className="mfa-actions">
            <Button 
              type="submit" 
              disabled={loading || (!useBackupCode && verificationCode.length !== 6) || (useBackupCode && backupCode.length !== 8)}
              fullWidth
            >
              {loading ? 'Verifying...' : 'Verify'}
            </Button>
          </div>
        </form>

        <div className="mfa-options">
          {(mfaMethod === 'email' || mfaMethod === 'sms') && !useBackupCode && (
            <button
              type="button"
              className="link-button"
              onClick={handleSendOTP}
              disabled={resendLoading || resendCooldown > 0}
            >
              {resendLoading ? 'Sending...' : 
               resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
            </button>
          )}

          <button
            type="button"
            className="link-button"
            onClick={() => {
              setUseBackupCode(!useBackupCode);
              setVerificationCode('');
              setBackupCode('');
              setError('');
            }}
          >
            {useBackupCode ? 'Use verification code' : 'Use backup code'}
          </button>

          <button
            type="button"
            className="link-button cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MFAVerification;
