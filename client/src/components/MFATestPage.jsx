import React, { useState, useEffect } from 'react';
// import QRCode from 'react-qr-code';
import axios from 'axios';

function MFATestPage() {
  const [loading, setLoading] = useState(false);
  const [totpSecret, setTotpSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState({});

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const testTOTPSetup = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      console.log('🔍 Testing TOTP setup with token:', token ? 'EXISTS' : 'MISSING');
      
      if (!token) {
        // Set a test token for debugging
        const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODljY2Y3MmRmYTM1MDJhMjUwZTM3MzciLCJpYXQiOjE3NTUxMDcxODYsImV4cCI6MTc1NTEwODA4Nn0.ysy_ZSph0_HFwD-v9PI7FTxw03sol9uEX8MA3vdNtIs';
        localStorage.setItem('token', testToken);
        console.log('✅ Test token set');
      }

      const response = await axios.post(
        `${API_URL}/api/auth/setup-totp`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );

      console.log('📡 API Response:', response.data);
      
      const { secret, qrCode: qrCodeUrl } = response.data;
      setTotpSecret(secret);
      setQrCode(qrCodeUrl);
      
      setDebugInfo({
        apiResponse: 'SUCCESS',
        secretLength: secret ? secret.length : 0,
        qrCodeLength: qrCodeUrl ? qrCodeUrl.length : 0,
        secretExists: !!secret,
        qrCodeExists: !!qrCodeUrl,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('❌ TOTP setup error:', error);
      setError(error.response?.data?.message || error.message);
      setDebugInfo({
        apiResponse: 'ERROR',
        errorMessage: error.message,
        status: error.response?.status,
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto-run the test on component mount
    testTOTPSetup();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🧪 MFA TOTP Test Page</h1>
      
      <div style={{ background: '#e8f4fd', padding: '15px', marginBottom: '20px', border: '1px solid #bee5eb' }}>
        <h3>🎯 Purpose</h3>
        <p>This page tests the exact same TOTP setup flow as the MFA Settings page to isolate the QR code rendering issue.</p>
      </div>

      <div style={{ background: '#fff3cd', padding: '15px', marginBottom: '20px', border: '1px solid #ffeaa7' }}>
        <h3>📊 Current State</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div><strong>Loading:</strong> {loading ? 'YES' : 'NO'}</div>
          <div><strong>Secret:</strong> {totpSecret ? `SET (${totpSecret.length} chars)` : 'NOT SET'}</div>
          <div><strong>QR Code:</strong> {qrCode ? `SET (${qrCode.length} chars)` : 'NOT SET'}</div>
          <div><strong>Error:</strong> {error || 'None'}</div>
        </div>
      </div>

      <button 
        onClick={testTOTPSetup} 
        disabled={loading}
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px', 
          marginBottom: '20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? '🔄 Testing...' : '🚀 Test TOTP Setup'}
      </button>

      {error && (
        <div style={{ background: '#f8d7da', color: '#721c24', padding: '15px', marginBottom: '20px', border: '1px solid #f5c6cb', borderRadius: '5px' }}>
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      {qrCode && (
        <div style={{ background: '#d4edda', padding: '20px', marginBottom: '20px', border: '1px solid #c3e6cb', borderRadius: '5px' }}>
          <h3>✅ QR Code Generated Successfully</h3>
          <div style={{ background: 'white', padding: '20px', textAlign: 'center', marginBottom: '15px' }}>
            <QRCode 
              value={qrCode}
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
          </div>
          <details>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>🔍 QR Code Data</summary>
            <pre style={{ background: '#f8f9fa', padding: '10px', fontSize: '12px', overflow: 'auto', marginTop: '10px' }}>
              {qrCode}
            </pre>
          </details>
        </div>
      )}

      <details style={{ marginBottom: '20px' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 'bold', background: '#f8f9fa', padding: '10px' }}>🛠️ Debug Information</summary>
        <pre style={{ background: '#f1f3f4', padding: '15px', fontSize: '12px', overflow: 'auto' }}>
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </details>

      <div style={{ background: '#f8f9fa', padding: '15px', border: '1px solid #dee2e6' }}>
        <h4>🔧 Manual Actions</h4>
        <button onClick={() => {
          const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODljYmFlODM2ZjU5YzA2ZTJmM2I5YTIiLCJpYXQiOjE3NTUxMDMwMDEsImV4cCI6MTc1NTEwMzkwMX0.jljKI0v32ynmR4gAm8XG2MEcJqX-LPYD43mulo63Ybo';
          localStorage.setItem('token', testToken);
          console.log('🔑 Fresh token set');
          alert('Fresh token set in localStorage!');
        }}>🔑 Set Fresh Token</button>
        
        <button onClick={() => {
          console.log('Current localStorage token:', localStorage.getItem('token'));
          console.log('API URL:', API_URL);
        }} style={{ marginLeft: '10px' }}>📋 Log Token</button>
      </div>
    </div>
  );
}

export default MFATestPage;
