import React from 'react';

function QuickLogin() {
  const setToken = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODljZDhhNjZjNmQ0MGM4YjJiMTU5ZDUiLCJpYXQiOjE3NTUxMDk1NDIsImV4cCI6MTc1NTExMDQ0Mn0.wIUZ6i5OxzZeVh-h-Yt5385NlwgKWOjv0ncNcgQTFyQ';
    localStorage.setItem('token', token);
    alert('✅ Fresh token set! You can now access the dashboard.');
    window.location.href = '/dashboard';
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🚀 Quick Login Helper</h1>
      
      <div style={{ background: '#f8f9fa', padding: '20px', marginBottom: '30px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
        <h3>🎯 Purpose</h3>
        <p>This page provides quick access to test the MFA functionality without going through the full login flow.</p>
      </div>

      <div style={{ background: '#e7f3ff', padding: '20px', marginBottom: '30px', borderRadius: '8px', border: '1px solid #b3d8ff' }}>
        <h3>📝 Manual Login Option</h3>
        <p>Go to <a href="/login" style={{ color: '#0066cc' }}>/login</a> and use:</p>
        <div style={{ background: 'white', padding: '15px', margin: '10px 0', fontFamily: 'monospace', border: '1px solid #ccc' }}>
          <strong>Email:</strong> mfa@test.com<br/>
          <strong>Password:</strong> password123
        </div>
      </div>

      <div style={{ background: '#fff3cd', padding: '20px', marginBottom: '30px', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
        <h3>⚡ Quick Token Setup</h3>
        <p>Click the button below to automatically set the authentication token and redirect to the dashboard:</p>
        
        <button 
          onClick={setToken}
          style={{
            padding: '15px 30px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          🔑 Set Token & Go to Dashboard
        </button>
      </div>

      <div style={{ background: '#f8d7da', padding: '15px', borderRadius: '8px', border: '1px solid #f5c6cb' }}>
        <h4>⚠️ Note</h4>
        <p>This is for testing purposes only. In production, users would log in through the normal authentication flow.</p>
      </div>
    </div>
  );
}

export default QuickLogin;
