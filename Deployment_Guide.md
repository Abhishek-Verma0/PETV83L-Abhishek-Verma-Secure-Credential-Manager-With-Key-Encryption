# Secure Credential Manager – Deployment Guide

This document explains how to deploy the Secure Credential Manager project on **Render** under a single web service instance without breaking functionality.

---

## 1. Prerequisites
- Render account (free/paid tier)  
- MongoDB Atlas account (for production DB)  
- Gmail account with App Password enabled (for Email MFA)  
- Twilio account (for SMS MFA – trial or paid)  

---

## 2. Repository Setup
1. Fork this repository.  
2. Clone it locally:  
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
3. Push any necessary changes to your fork.
4. On Render, connect your forked GitHub repo to a Web Service.


## 3. Build & Start Commands
Set these in Render → Settings → Build & Start Command:

*Build Command*
npm install && npm run build

*Start Command*
npm start

This ensures both server and client build correctly.

## 4. Environment Variables
Set the following in Render → Environment:

*Required*
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/credentialmanager
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
PORT=5000
NODE_ENV=production
VITE_API_URL=https://<your-service-name>.onrender.com

*Email MFA (Gmail)*
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password   # Generated from Google → Security → App Passwords
EMAIL_FROM=noreply@credentialmanager.com

⚠️ For now, Gmail App Passwords are used.
For production, upgrade to a custom domain email (e.g., noreply@credentialmanager.com
) using Google Workspace, Zoho, or SendGrid for better deliverability.


*SMS MFA (Twilio)*
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890

⚠️ Twilio Trial Limitation: Trial accounts can only send SMS to verified phone numbers.
Upgrade to a paid Twilio plan for unrestricted MFA SMS.


## 5. Verifying Deployment
1. Once deployed, check the health endpoint:
   https://<your-service-name>.onrender.com/api/health
   You should see {"status":"ok"}.

2. Register a new account and test:
   Email MFA (Gmail OTP)
   SMS MFA (Twilio OTP)

## 6. Future Improvements
      Upgrade email system to a custom domain for professional, spam-free delivery.
      Upgrade Twilio plan for unrestricted SMS MFA.
      Apply stricter IP access rules for MongoDB Atlas (instead of 0.0.0.0/0).


✅ Deployment should now work smoothly under a single Render web service.