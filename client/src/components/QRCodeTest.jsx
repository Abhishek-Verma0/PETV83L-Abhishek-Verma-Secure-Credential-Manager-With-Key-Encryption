import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

const QRCodeTest = () => {
  const [testData, setTestData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Test with simple text first
    setTestData('Hello World');
  }, []);

  const testAPICall = async () => {
    try {
      console.log('Testing API call...');
      const token = localStorage.getItem('token');
      console.log('Token exists:', !!token);
      
      const response = await fetch('/api/mfa/setup-totp', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.qrCode) {
        setTestData(data.qrCode);
        console.log('QR Code data set:', data.qrCode.length);
      } else {
        setError(`API Error: ${data.message || 'No QR code returned'}`);
      }
    } catch (err) {
      console.error('Test error:', err);
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>QR Code Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={testAPICall}>Test API Call</button>
        <button onClick={() => setTestData('Test data: ' + Date.now())}>Test Simple QR</button>
      </div>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <div>
        <h3>QR Code:</h3>
        <p>Data length: {testData.length}</p>
        <p>Data preview: {testData.substring(0, 100)}...</p>
        
        {testData ? (
          <div style={{ border: '1px solid #ccc', padding: '10px', display: 'inline-block' }}>
            <QRCode value={testData} size={200} />
          </div>
        ) : (
          <p>No data to display</p>
        )}
      </div>
    </div>
  );
};

export default QRCodeTest;
