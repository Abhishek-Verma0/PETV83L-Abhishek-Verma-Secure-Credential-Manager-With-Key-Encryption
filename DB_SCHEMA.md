# 📊 Database Schema

## User Model

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

## Credential Model

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


