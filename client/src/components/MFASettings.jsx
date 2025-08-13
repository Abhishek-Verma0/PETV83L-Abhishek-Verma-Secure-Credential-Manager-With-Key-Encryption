import React, { useState, useEffect } from 'react';
import { mfaService } from '../service/mfa';
import Button from './Button';
import FormInput from './FormInput';
import QRCode from 'react-qr-code';
import '../styles/mfaSettings.css';

const MFASettings = () => {
  const [mfaStatus, setMfaStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [setupMode, setSetupMode] = useState(null); // 'totp', 'email', 'sms'
  const [setupStep, setSetupStep] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // TOTP Setup states
  const [totpSecret, setTotpSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [tempToken, setTempToken] = useState('');
  const [totpCode, setTotpCode] = useState('');

  // OTP Setup states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');

  // General states
  const [password, setPassword] = useState('');
  const [backupCodes, setBackupCodes] = useState([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  useEffect(() => {
    fetchMFAStatus();
  }, []);

  const fetchMFAStatus = async () => {
    try {
      const response = await mfaService.getMFAStatus();
      setMfaStatus(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching MFA status:', error);
      setError(error.response?.data?.message || 'Failed to load MFA settings');
      setLoading(false);
    }
  };
  const startTOTPSetup = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    console.log('🚀 Starting TOTP setup...');
    
    try {
      const response = await mfaService.setupTOTP();
      console.log('✅ TOTP setup response:', response.data);
      
      const { secret, qrCode, tempToken } = response.data;
      
      if (!secret || !qrCode) {
        throw new Error('Invalid response: missing secret or QR code');
      }
      
      setTotpSecret(secret);
      setQrCode(qrCode);
      setTempToken(tempToken);
      setSetupMode('totp');
      setSetupStep(1);
      
      console.log('✅ TOTP setup completed, should show QR code now');
    } catch (error) {
      console.error('❌ Error setting up TOTP:', error);
      setError(error.response?.data?.message || error.message || 'Failed to setup TOTP');
      // Reset loading to show the error properly
      setSetupMode(null);
      setSetupStep(1);
    } finally {
      setLoading(false);
    }
  };

  const verifyTOTPSetup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await mfaService.verifyTOTPSetup(totpCode, tempToken);
      setBackupCodes(response.data.backupCodes);
      setShowBackupCodes(true);
      setSuccess('TOTP MFA enabled successfully!');
      setSetupStep(2);
      fetchMFAStatus();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid TOTP code');
    } finally {
      setLoading(false);
    }
  };

  const startEmailSetup = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await mfaService.setupEmail();
      setSetupMode('email');
      setSetupStep(1);
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to setup email MFA');
    } finally {
      setLoading(false);
    }
  };

  const startSMSSetup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await mfaService.setupSMS(phoneNumber);
      setSetupMode('sms');
      setSetupStep(1);
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to setup SMS MFA');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTPSetup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await mfaService.verifyOTPSetup(otpCode, setupMode);
      setBackupCodes(response.data.backupCodes);
      setShowBackupCodes(true);
      setSuccess(`${setupMode === 'email' ? 'Email' : 'SMS'} MFA enabled successfully!`);
      setSetupStep(2);
      fetchMFAStatus();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP code');
    } finally {
      setLoading(false);
    }
  };

  const disableMFA = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await mfaService.disableMFA(password);
      setSuccess('MFA has been disabled');
      setPassword('');
      fetchMFAStatus();
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData?.requiresRecentLogin) {
        setError(errorData.message + ' Please logout and login again, then try disabling MFA.');
      } else {
        setError(errorData?.message || 'Failed to disable MFA');
      }
    } finally {
      setLoading(false);
    }
  };

  const regenerateBackupCodes = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await mfaService.regenerateBackupCodes(password);
      setBackupCodes(response.data.backupCodes);
      setShowBackupCodes(true);
      setPassword('');
      setSuccess('New backup codes generated');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to regenerate backup codes');
    } finally {
      setLoading(false);
    }
  };

  const resetSetup = () => {
    setSetupMode(null);
    setSetupStep(1);
    setError('');
    setSuccess('');
    setTotpCode('');
    setOtpCode('');
    setPhoneNumber('');
    setPassword('');
    setShowBackupCodes(false);
    setTotpSecret('');
    setQrCode('');
    setTempToken('');
  };

  const downloadBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'credential-manager-backup-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading && !mfaStatus) {
    return (
      <div className="mfa-settings">
        <div className="loading">Loading MFA settings...</div>
      </div>
    );
  }

  if (error && !mfaStatus) {
    return (
      <div className="mfa-settings">
        <div className="error-message">
          <h3>Unable to Load MFA Settings</h3>
          <p>{error}</p>
          <Button 
            variant="secondary" 
            onClick={fetchMFAStatus}
            disabled={loading}
          >
            {loading ? 'Retrying...' : 'Retry'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mfa-settings">
      <h2>Multi-Factor Authentication</h2>
      <p className="mfa-description">
        Add an extra layer of security to your account with multi-factor authentication.
      </p>

      {error && <div className="error-alert">{error}</div>}
      {success && <div className="success-alert">{success}</div>}

      {/* Main MFA Status Section */}
      {!setupMode && (
        <div className="mfa-status">
          <div className="mfa-status-header">
            <h3>Current Status</h3>
            <span className={`status-badge ${mfaStatus?.mfaEnabled ? 'enabled' : 'disabled'}`}>
              {mfaStatus?.mfaEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>

          {mfaStatus?.mfaEnabled ? (
            <div className="mfa-enabled">
              <p>
                <strong>Method:</strong> {mfaStatus.mfaMethod?.toUpperCase()}
              </p>
              <p>
                <strong>Backup Codes:</strong> {mfaStatus.backupCodesCount} remaining
              </p>

              <div className="mfa-actions">
                <form onSubmit={disableMFA}>
                  <FormInput
                    label="Enter your password to disable MFA"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button type="submit" variant="danger" disabled={loading}>
                    {loading ? 'Disabling...' : 'Disable MFA'}
                  </Button>
                </form>

                <form onSubmit={regenerateBackupCodes}>
                  <FormInput
                    label="Enter your password to regenerate backup codes"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button type="submit" variant="secondary" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate New Backup Codes'}
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="mfa-setup-options">
              <h4>Choose an authentication method:</h4>
              
              <div className="setup-option">
                <div className="option-info">
                  <h5>📱 Authenticator App (Recommended)</h5>
                  <p>Use Google Authenticator, Authy, or similar apps to generate time-based codes.</p>
                </div>
                <Button onClick={startTOTPSetup} disabled={loading} >
                  {loading ? 'Setting up...' : 'Setup Authenticator App'}
                </Button>
              </div>

              <div className="setup-option">
                <div className="option-info">
                  <h5>📧 Email Verification</h5>
                  <p>Receive verification codes via email to {mfaStatus?.email}.</p>
                </div>
                <Button onClick={startEmailSetup} disabled={loading} variant="secondary">
                  {loading ? 'Setting up...' : 'Setup Email MFA'}
                </Button>
              </div>

              <div className="setup-option">
                <div className="option-info">
                  <h5>📱 SMS Verification</h5>
                  <p>Receive verification codes via text message.</p>
                </div>
                <form onSubmit={startSMSSetup} className="sms-setup-form">
                  <FormInput
                    label="Phone Number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1234567890"
                    required
                  />
                  <Button type="submit" disabled={loading || !phoneNumber} variant="secondary">
                    {loading ? 'Setting up...' : 'Setup SMS MFA'}
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOTP Setup Flow */}
      {setupMode === 'totp' && setupStep === 1 && (
        <div className="totp-setup">
          <h3>Setup Authenticator App</h3>
          
          {loading && (
            <div className="loading">Setting up TOTP...</div>
          )}
          
          {!loading && (
            <div className="setup-steps">
              <div className="step">
                <h4>Step 1: Scan QR Code</h4>
                <p>Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.):</p>
                <div className="qr-code-container">
                  {qrCode ? (
                    <QRCode value={qrCode} size={200} />
                  ) : (
                    <div className="qr-code-loading">
                      Loading QR Code...
                    </div>
                  )}
                </div>
              </div>

              <div className="step">
                <h4>Step 2: Manual Entry (Alternative)</h4>
                <p>Or manually enter this key in your authenticator app:</p>
                {totpSecret ? (
                  <div className="manual-key">
                    <code>{totpSecret}</code>
                    <button 
                      type="button" 
                      onClick={() => navigator.clipboard.writeText(totpSecret)}
                      className="copy-button"
                    >
                      Copy
                    </button>
                  </div>
                ) : (
                  <div className="manual-key-loading">
                    Loading secret key...
                  </div>
                )}
              </div>

              <div className="step">
                <h4>Step 3: Verify</h4>
                <form onSubmit={verifyTOTPSetup}>
                  <FormInput
                    label="Enter the 6-digit code from your authenticator app"
                    type="text"
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    placeholder="000000"
                    required
                  />
                  <div className="setup-actions">
                    <Button type="submit" disabled={loading || totpCode.length !== 6}>
                      {loading ? 'Verifying...' : 'Verify & Enable'}
                    </Button>
                    <Button type="button" variant="secondary" onClick={resetSetup}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOTP Success with Backup Codes */}
      {setupMode === 'totp' && setupStep === 2 && showBackupCodes && (
        <div className="backup-codes-display">
          <h3>🎉 MFA Enabled Successfully!</h3>
          <p>Save these backup codes in a safe place. You can use them to access your account if you lose your authenticator app.</p>
          
          <div className="backup-codes">
            {backupCodes.map((code, index) => (
              <div key={index} className="backup-code">{code}</div>
            ))}
          </div>
          
          <div className="backup-actions">
            <Button onClick={downloadBackupCodes} variant="secondary">
              Download Codes
            </Button>
            <Button onClick={resetSetup}>
              Done
            </Button>
          </div>
        </div>
      )}

      {/* Email/SMS Setup Flow */}
      {(setupMode === 'email' || setupMode === 'sms') && setupStep === 1 && (
        <div className="otp-setup">
          <h3>Verify {setupMode === 'email' ? 'Email' : 'SMS'}</h3>
          <p>Enter the 6-digit code sent to your {setupMode === 'email' ? 'email' : 'phone'}:</p>
          
          <form onSubmit={verifyOTPSetup}>
            <FormInput
              label="Verification Code"
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              placeholder="000000"
              required
            />
            <div className="setup-actions">
              <Button type="submit" disabled={loading || otpCode.length !== 6}>
                {loading ? 'Verifying...' : 'Verify & Enable'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetSetup}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Email/SMS Success with Backup Codes */}
      {(setupMode === 'email' || setupMode === 'sms') && setupStep === 2 && showBackupCodes && (
        <div className="backup-codes-display">
          <h3>🎉 MFA Enabled Successfully!</h3>
          <p>Save these backup codes in a safe place. You can use them to access your account if you lose access to your {setupMode === 'email' ? 'email' : 'phone'}.</p>
          
          <div className="backup-codes">
            {backupCodes.map((code, index) => (
              <div key={index} className="backup-code">{code}</div>
            ))}
          </div>
          
          <div className="backup-actions">
            <Button onClick={downloadBackupCodes} variant="secondary">
              Download Codes
            </Button>
            <Button onClick={resetSetup}>
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MFASettings;
