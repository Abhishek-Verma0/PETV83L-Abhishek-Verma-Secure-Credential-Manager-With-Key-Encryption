<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">
<h1 align="center">🚀 Secure-Creds_GSSoC-2025 </h1>

<!--- Welcome back, Developer! 👋 Ready to continue your learning journey? -->

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&duration=3000&pause=1000&color=0000FF&center=true&vCenter=true&width=700&lines=Welcome+to+Open+Source+Contribution!;GirlScript+Summer+of+Code+GSSoC+2025!+🎉;Start+this+repo+now!;Fork+it+🚀;Contribute+to+it+🛠️;Commit+to+your+forked+repo+💾;Create+a+Pull+Request+without+conflicts+✅" alt="Typing SVG" />
</div>

**Your Personalized Credential Manager**

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">

**📊 Project Insights**

<table align="center">
    <thead align="center">
        <tr>
            <td><b>🌟 Stars</b></td>
            <td><b>🍴 Forks</b></td>
            <td><b>🐛 Issues</b></td>
            <td><b>🔔 Open PRs</b></td>
            <td><b>🔕 Closed PRs</b></td>
            <td><b>🛠️ Languages</b></td>
            <td><b>👥 Contributors</b></td>
        </tr>
     </thead>
    <tbody>
         <tr>
            <td><img alt="Stars" src="https://img.shields.io/github/stars/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption?style=flat&logo=github"/></td>
            <td><img alt="Forks" src="https://img.shields.io/github/forks/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption?style=flat&logo=github"/></td>
            <td><img alt="Issues" src="https://img.shields.io/github/issues/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption?style=flat&logo=github"/></td>
            <td><img alt="Open PRs" src="https://img.shields.io/github/issues-pr/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption?style=flat&logo=github"/></td>
            <td><img alt="Closed PRs" src="https://img.shields.io/github/issues-pr-closed/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption?style=flat&color=critical&logo=github"/></td>
            <td><img alt="Languages Count" src="https://img.shields.io/github/languages/count/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption?style=flat&color=green&logo=github"></td>
            <td><img alt="Contributors Count" src="https://img.shields.io/github/contributors/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption?style=flat&color=blue&logo=github"/></td>
        </tr>
    </tbody>
</table>

---

<h2 align="center">🎯 Open Source Programmes ⭐</h2>

<p align="center">
  <b>This project is now OFFICIALLY accepted for:</b>
</p>

<div align="center">
  <img src="https://github.com/apu52/METAVERSE/assets/114172928/e79eb6de-81b1-4ffb-b6ed-f018bb977e88" alt="GSSOC" width="80%">
</div>

🌟 **Exciting News...**

🚀 This project is now an official part of GirlScript Summer of Code – GSSoC 2025! 💃🎉💻 We’re thrilled to welcome contributors from all over India and beyond to collaborate, build, and grow . 

👩‍💻 GSSoC is one of India’s **largest 3-month-long open-source programs** that encourages developers of all levels to contribute to real-world projects 🌍 while learning, collaborating, and growing together. 🌱

🌈 With **mentorship, community support**, and **collaborative coding**, it's the perfect platform for developers to:

✨ Improve their skills
🤝 Contribute to impactful projects
🏆 Get recognized for their work
📜 Receive certificates and swag!

🎉 **I can’t wait to welcome new contributors** from GSSoC 2025 to this Secure-Creds project family!
Let’s build, learn, and grow together — one commit at a time. 🔥👨‍💻👩‍💻

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">


# 🔐 Secure Credential Manager
## Make sure to star the repo before working on
A **Secure Credential Manager** built using the **MERN stack (MongoDB, Express, React, Node.js)** with advanced cryptographic features to ensure maximum security. It uses `CryptoJS` and `bcrypt` for encryption and hashing, and `JWT` for session management.

---

## 🚀 Features

- 🔐 **User Authentication** using hashed passwords (`bcrypt`)
- 🔐 **JWT-based Session Management** (expires after 15 minutes)
- 🔐 **Multi-Factor Authentication (MFA)** - TOTP, Email, SMS
- 🔐 **Protected Routes**: Only authenticated users can access sensitive routes
- 🔐 **Password Verification** required to perform sensitive operations (even with valid session)
- 🔐 **Credential Encryption** using a unique key per credential
- 🔐 **QR Code Generation** for TOTP authenticator setup
- 🔐 **Backup Codes** for emergency MFA access
- 🔐 **Encryption Keys are never stored** in the database or backend memory
- 🔐 **Sensitive data is cleared from memory immediately** after use
- 🔐 **Add / View / Delete credentials** securely
- ⚠️ **Mitigates session hijacking** via enforced re-verification using password
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Modern UI/UX** with intuitive navigation
- Dark Mode available 


---

## 🧠 Tech Stack

- **Frontend**: React, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Encryption/Hashing**: CryptoJS, bcrypt
- **Auth & Session**: JSON Web Tokens (JWT)
- **Security Principles**: Zero knowledge encryption, protected routes, memory safety

---

## 🧰 How It Works

1. ### 🔐 User Registration & Login
 - Passwords are hashed using **bcrypt** before storing in DB.
 - On successful login, a **JWT token** is issued, valid for **15 minutes**.

2. ### 🛡️ Protected Routes
 - All sensitive backend routes require a valid **JWT token**.
 - Unauthorized users are blocked.

3. ### 🧾 Add / View / Delete Credentials
 - Each operation requires **password confirmation**, even if JWT is valid.
 - This ensures protection in case the session token is hijacked.

4. ### 🔑 Encryption Logic
 - Each credential is encrypted with a **unique key**:
   ```
   key = SHA256(salt + credentialUID + userPassword)
   ```
 - The key is never stored.
 - The encrypted data is stored, but key is derived on-the-fly during decryption.

5. ### 🧹 Memory Safety
 - Sensitive keys, raw passwords, and decrypted data are **immediately removed** from memory after use.

---




## 📸 Screenshots

### Landing Page
![Landing Page](./screenshots/landing01.png)
![Landing Page](./screenshots/landing02.png)
![Landing Page](./screenshots/landing03.png)
![Landing Page](./screenshots/landing04.png)

### 🖥️ Registration Page
![Registration Page](./screenshots/registration.png)

### 🖥️ Login Page
![Login Page](./screenshots/login.png)

### 🏠 Dashboard
![Dashboard](./screenshots/dashboard.png)

### 🔐 Add Credential
![Add Credential](./screenshots/credential01.png)
![Add Credential](./screenshots/credential02.png)
![Add Credential](./screenshots/credential03.png)
- After adding creds
![Add Credential](./screenshots/credential04.png)

### 🗂️ View Credentials
![View Credentials](./screenshots/view-creds01.png)
![View Credentials](./screenshots/view-creds02.png)

### 🧰 Delete Credentials
![Re-authenticate](./screenshots/delete-creds01.png)
- After Deleting

![Re-authenticate](./screenshots/delete-creds02.png)




## 🛠️ Setup Instructions

### ⚙️ Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **MongoDB** (Local installation or MongoDB Atlas)
- **Git**

### 📦 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption.git
   cd PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption
   ```

2. **In root directory of project**
```
npm install   # in root dir of project
```

### 🔧 Environment Configuration

#### Server Environment Variables

Create a `.env` file in the `server` directory:

```env
# ================================
# REQUIRED CONFIGURATION
# ================================

# Database Configuration
MONGODB_URL=mongodb://localhost:27017/credentialmanager
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/credentialmanager

# JWT Secret (Use a strong, random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars

# Server Port
PORT=5000

# ================================
# OPTIONAL - EMAIL MFA CONFIGURATION
# ================================

# Gmail Configuration (Recommended)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password  # NOT your regular password - use App Password
EMAIL_FROM=noreply@credentialmanager.com

# Alternative Email Providers
# EMAIL_HOST=smtp.your-provider.com
# EMAIL_PORT=587
# EMAIL_SECURE=false

# ================================
# OPTIONAL - SMS MFA CONFIGURATION (Twilio)
# ================================

TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# ================================
# DEVELOPMENT SETTINGS
# ================================

NODE_ENV=development
```

#### Client Environment Variables

Create a `.env` file in the `client` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_PORT=5173


```

### 🚀 Running the Application

1. **Start the  Server**
   ```bash
   # run all command in root dir of project 
   npm run build
   npm start
   ```
   The server will start on `http://localhost:5000`


3. **Access the Application**
   - Open your browser and go to `http://localhost:5000`
   - Register a new account or login with existing credentials

### 📧 Email MFA Setup (Optional)

#### Gmail Configuration (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and generate a 16-character password
3. **Update .env file:**
   ```env
   EMAIL_USER=youremail@gmail.com
   EMAIL_PASS=abcd-efgh-ijkl-mnop  # 16-character app password
   ```

#### Other Email Providers

For other email services, modify the configuration in `server/services/emailService.js`:

```javascript
// Outlook/Hotmail
service: 'hotmail'

// Yahoo
service: 'yahoo'

// Custom SMTP
host: 'smtp.your-provider.com'
port: 587
secure: false
```

### 📱 SMS MFA Setup (Optional)

1. **Sign up for Twilio:** [https://www.twilio.com/](https://www.twilio.com/)
2. **Get a phone number** from Twilio Console
3. **Find your credentials:**
   - Account SID (starts with AC...)
   - Auth Token
   - Phone Number (format: +1234567890)
4. **Update .env file:**
   ```env
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your-auth-token-here
   TWILIO_PHONE_NUMBER=+1234567890
   ```

### 🗄️ Database Setup

#### Local MongoDB

1. **Install MongoDB** on your system
2. **Start MongoDB service:**
   ```bash
   # macOS (with Homebrew)
   brew services start mongodb-community

   # Linux (Ubuntu)
   sudo systemctl start mongod

   # Windows
   # Start MongoDB service from Services panel
   ```
3. **Use connection string:**
   ```env
   MONGODB_URL=mongodb://localhost:27017/credentialmanager
   ```

#### MongoDB Atlas (Cloud)

1. **Create account** at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create a cluster**
3. **Get connection string** and replace `<username>`, `<password>`, and `<cluster-url>`
4. **Use connection string:**
   ```env
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/credentialmanager
   ```

### 🔐 Dependencies Breakdown

#### Backend Dependencies

```json
{
  "bcrypt": "^6.0.0",           // Password hashing
  "bcryptjs": "^3.0.2",         // Alternative password hashing
  "cors": "^2.8.5",             // Cross-origin resource sharing
  "dotenv": "^17.0.0",          // Environment variables
  "express": "^5.1.0",          // Web framework
  "jsonwebtoken": "^9.0.2",     // JWT authentication
  "mongoose": "^8.16.1",        // MongoDB object modeling
  "nodemailer": "^6.10.1",      // Email sending
  "qrcode": "^1.5.4",           // QR code generation for MFA
  "speakeasy": "^2.0.0",        // TOTP implementation
  "twilio": "^4.23.0"           // SMS sending
}
```

#### Frontend Dependencies

```json
{
  "axios": "^1.10.0",           // HTTP client
  "react": "^19.1.0",           // UI library
  "react-dom": "^19.1.0",       // React DOM rendering
  "react-qr-code": "^2.0.18",   // QR code display component
  "react-router-dom": "^7.6.3"  // Client-side routing
}
```

### 🛡️ Security Features

- **🔐 Password Hashing:** bcrypt with salt rounds
- **🔑 JWT Authentication:** 15-minute token expiration
- **🛡️ Multi-Factor Authentication:** TOTP, Email, SMS
- **🔒 Credential Encryption:** AES-256 with unique keys per credential
- **🚫 Memory Safety:** Sensitive data cleared immediately after use
- **🔐 Protected Routes:** Authentication required for sensitive operations
- **🎫 Backup Codes:** Emergency access codes for MFA

### 📱 MFA Features

- **📱 TOTP (Time-based One-Time Password):** Works with Google Authenticator, Authy, 1Password
- **📧 Email MFA:** Verification codes sent to registered email
- **📲 SMS MFA:** Verification codes sent via text message
- **🎫 Backup Codes:** 10 single-use emergency codes
- **🔄 Easy Management:** Enable/disable, regenerate codes

### 🎯 Development vs Production

#### Development Mode

- **Email:** Uses Ethereal test service (no real emails sent)
- **SMS:** Mock mode (codes logged to console)
- **Database:** Local MongoDB recommended
- **Hot Reload:** Both client and server support hot reload

#### Production Deployment

- **Environment:** Set `NODE_ENV=production`
- **Email:** Configure real email service
- **SMS:** Configure Twilio for real SMS
- **Database:** Use MongoDB Atlas or secure MongoDB instance
- **SSL/HTTPS:** Required for production
- **Environment Variables:** Use secure secret management

### 🐛 Troubleshooting

#### Common Issues

1. **MongoDB Connection Failed**
   ```
   Solution: Check if MongoDB is running and connection string is correct
   ```

2. **JWT Token Expired**
   ```
   Solution: Login again - tokens expire after 15 minutes for security
   ```

3. **Email MFA Not Working**
   ```
   Solution: Use Gmail App Password, not regular password
   ```

4. **SMS MFA Not Working**
   ```
   Solution: Verify Twilio credentials and phone number format
   ```

5. **Port Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :5000
   # Kill the process
   kill -9 [PID]
   ```

#### Debug Mode

Enable verbose logging:
```env
DEBUG=true
LOG_LEVEL=debug
```

### 📁 Project Structure

```
PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption/
├── 📂 client/                          # Frontend React application
│   ├── 📂 public/                      # Static assets
│   │   └── lock-icon.svg
│   ├── 📂 src/
│   │   ├── 📂 auth/                    # Authentication context
│   │   │   └── AuthContext.jsx
│   │   ├── 📂 components/              # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FormInput.jsx
│   │   │   ├── MFASettings.jsx         # MFA setup and management
│   │   │   ├── MFAVerification.jsx     # MFA login verification
│   │   │   ├── Navbar.jsx
│   │   │   ├── PasswordPrompt.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ScreenshotPrevention.jsx
│   │   ├── 📂 pages/                   # Main application pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MFAPage.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── 📂 service/                 # API service layer
│   │   │   ├── auth.js
│   │   │   ├── credentials.js
│   │   │   └── mfa.js                  # MFA API calls
│   │   ├── 📂 styles/                  # Component styles
│   │   │   ├── dashboard.css
│   │   │   ├── mfaSettings.css
│   │   │   ├── mfaVerification.css
│   │   │   ├── responsive.css
│   │   │   └── ...
│   │   ├── App.jsx                     # Main app component
│   │   └── main.jsx                    # App entry point
│   ├── package.json
│   └── vite.config.js
├── 📂 server/                          # Backend Node.js application
│   ├── 📂 middleware/                  # Express middleware
│   │   ├── auth.js                     # JWT authentication
│   │   └── mfa.js                      # MFA verification
│   ├── 📂 models/                      # MongoDB models
│   │   ├── Credential.js
│   │   └── User.js                     # Enhanced with MFA fields
│   ├── 📂 routes/                      # API routes
│   │   ├── auth.js                     # Authentication routes
│   │   ├── credentials.js              # Credential CRUD operations
│   │   ├── mfa.js                      # MFA setup and verification
│   │   └── passwordReset.js
│   ├── 📂 services/                    # External service integrations
│   │   ├── emailService.js             # Email OTP and notifications
│   │   └── smsService.js               # SMS OTP via Twilio
│   ├── index.js                        # Server entry point
│   └── package.json
├── 📂 screenshots/                     # Application screenshots
├── 📄 MFA_SETUP_GUIDE.md              # Detailed MFA setup guide
└── 📄 README.md                       # This file
```

### 🔌 API Documentation

#### Authentication Routes

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}

Response: { "message": "User registered successfully" }
```

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}

Response: 
{
  "token": "jwt-token",           // If MFA disabled
  "preAuthToken": "jwt-token",    // If MFA enabled
  "mfaRequired": true,            // If MFA enabled
  "mfaMethod": "totp|email|sms"   // If MFA enabled
}
```

#### MFA Routes

```http
# Get MFA status
GET /api/mfa/status
Authorization: Bearer <token>

Response: {
  "mfaEnabled": boolean,
  "mfaMethod": "totp|email|sms",
  "hasPhoneNumber": boolean,
  "email": "masked-email",
  "backupCodesCount": number
}
```

```http
# Setup TOTP (Authenticator App)
POST /api/mfa/setup-totp
Authorization: Bearer <token>

Response: {
  "secret": "base32-secret",
  "qrCode": "data:image/png;base64,...",
  "tempToken": "temporary-jwt"
}
```

```http
# Verify TOTP setup
POST /api/mfa/verify-totp-setup
Authorization: Bearer <token>
Content-Type: application/json

{
  "token": "6-digit-code",
  "tempToken": "temporary-jwt"
}

Response: {
  "message": "TOTP MFA enabled successfully",
  "backupCodes": ["code1", "code2", ...]
}
```

```http
# Setup Email MFA
POST /api/mfa/setup-email
Authorization: Bearer <token>

Response: {
  "message": "Verification code sent to your email",
  "email": "masked-email"
}
```

```http
# Setup SMS MFA
POST /api/mfa/setup-sms
Authorization: Bearer <token>
Content-Type: application/json

{
  "phoneNumber": "+1234567890"
}

Response: {
  "message": "Verification code sent to your phone",
  "phoneNumber": "masked-phone"
}
```

```http
# Verify Email/SMS setup
POST /api/mfa/verify-otp-setup
Authorization: Bearer <token>
Content-Type: application/json

{
  "otp": "6-digit-code",
  "method": "email|sms"
}

Response: {
  "message": "MFA enabled successfully",
  "backupCodes": ["code1", "code2", ...]
}
```

```http
# Send OTP for login
POST /api/mfa/send-otp

{
  "email": "user@example.com"
}

Response: {
  "message": "OTP sent successfully",
  "method": "email|sms",
  "destination": "masked-destination"
}
```

```http
# Verify MFA during login
POST /api/mfa/verify

{
  "token": "6-digit-code",      // TOTP/OTP code
  "preAuthToken": "jwt-token",  // From login response
  "method": "totp|email|sms",
  "backupCode": "backup-code"   // Optional: use instead of token
}

Response: {
  "token": "full-auth-jwt",
  "user": { "id", "username", "email", "mfaEnabled" }
}
```

```http
# Disable MFA
POST /api/mfa/disable
Authorization: Bearer <token>
Content-Type: application/json

{
  "password": "user-password"
}

Response: { "message": "MFA disabled successfully" }
```

```http
# Regenerate backup codes
POST /api/mfa/regenerate-backup-codes
Authorization: Bearer <token>
Content-Type: application/json

{
  "password": "user-password"
}

Response: {
  "message": "Backup codes regenerated successfully",
  "backupCodes": ["code1", "code2", ...]
}
```

#### Credential Routes

```http
# Get all credentials
GET /api/credentials
Authorization: Bearer <token>

Response: [
  {
    "id": "credential-id",
    "website": "example.com",
    "username": "user",
    "createdAt": "timestamp"
  }
]
```

```http
# Add new credential
POST /api/credentials
Authorization: Bearer <token>
Content-Type: application/json

{
  "website": "example.com",
  "username": "user",
  "password": "encrypted-password",
  "userPassword": "user-verification-password"
}

Response: { "message": "Credential added successfully" }
```

```http
# Get specific credential (decrypted)
POST /api/credentials/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "password": "user-verification-password"
}

Response: {
  "website": "example.com",
  "username": "user",
  "password": "decrypted-password"
}
```

```http
# Delete credential
DELETE /api/credentials/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "password": "user-verification-password"
}

Response: { "message": "Credential deleted successfully" }
```

### 📊 Database Schema

#### User Model

```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String,                    // Hashed with bcrypt
  
  // MFA Fields
  mfaEnabled: Boolean,                 // Default: false
  mfaMethod: String,                   // 'totp', 'email', 'sms'
  totpSecret: String,                  // Base32 secret for TOTP
  phoneNumber: String,                 // For SMS MFA
  
  // OTP Fields (temporary)
  otpCode: String,                     // Hashed OTP
  otpExpires: Date,                    // OTP expiration
  otpUsed: Boolean,                    // Prevent reuse
  
  // Backup Codes
  backupCodes: [{
    code: String,                      // Hashed backup code
    used: Boolean,                     // Single-use enforcement
    createdAt: Date
  }],
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

#### Credential Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId,                    // Reference to User
  website: String,
  username: String,
  encryptedPassword: String,           // AES-256 encrypted
  salt: String,                        // Unique salt for this credential
  createdAt: Date,
  updatedAt: Date
}
```


