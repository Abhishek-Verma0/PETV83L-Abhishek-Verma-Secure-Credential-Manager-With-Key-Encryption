import React from 'react';
// import QRCode from 'react-qr-code';

function SimpleQRTest() {
  const sampleData = 'otpauth://totp/TestApp:testuser@example.com?secret=JBSWY3DPEHPK3PXP&issuer=TestApp';
  
  console.log('SimpleQRTest rendering with data:', sampleData);
  
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Simple QR Code Test</h1>
      
      <div style={{ background: '#f5f5f5', padding: '20px', marginBottom: '20px' }}>
        <h3>Test 1: Static QR Code</h3>
        <div style={{ background: 'white', padding: '20px', textAlign: 'center' }}>
          <QRCode 
            value="Hello World"
            size={256}
          />
        </div>
        <p>Data: "Hello World"</p>
      </div>

      <div style={{ background: '#f5f5f5', padding: '20px', marginBottom: '20px' }}>
        <h3>Test 2: OTP Auth QR Code</h3>
        <div style={{ background: 'white', padding: '20px', textAlign: 'center' }}>
          <QRCode 
            value={sampleData}
            size={256}
          />
        </div>
        <p>Data: {sampleData}</p>
      </div>

      <div style={{ background: '#f5f5f5', padding: '20px' }}>
        <h3>Debug Info</h3>
        <pre style={{ background: 'white', padding: '10px', fontSize: '12px' }}>
          {JSON.stringify({
            'QRCode import': typeof QRCode,
            'React version': React.version,
            'Data length': sampleData.length
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default SimpleQRTest;
