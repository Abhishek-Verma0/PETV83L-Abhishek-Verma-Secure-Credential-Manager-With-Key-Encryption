import React from 'react';
import MFASettings from '../components/MFASettings';
import '../styles/mfaPage.css';

const MFAPage = () => {
  return (
    <div className="mfa-page">
      <div className="mfa-page-container">
        <MFASettings />
      </div>
    </div>
  );
};

export default MFAPage;
