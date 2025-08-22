# 🔌 API Documentation

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

