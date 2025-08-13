const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    salt: {
      type: String,
      required: false,
    },
    // MFA related fields
    mfaEnabled: {
      type: Boolean,
      default: false,
    },
    mfaMethod: {
      type: String,
      enum: ['email', 'sms', 'totp'],
      default: null,
    },
    totpSecret: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    // Temporary OTP storage
    otpCode: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
    otpUsed: {
      type: Boolean,
      default: false,
    },
    // MFA backup codes
    backupCodes: [{
      code: String,
      used: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }],
    // Password reset fields
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordResetExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

//  generatin salt and the hash password before saving

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    //  generate a new salt when password change
    this.salt = crypto.randomBytes(16).toString("hex");

    //  hashing password with salt
    const hashedPassword = await bcrypt.hash(this.password + this.salt, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

//  comparing passwords method

userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!candidatePassword) return false;

  try {
    return await bcrypt.compare(candidatePassword + this.salt, this.password);
  } catch (error) {
    return false;
  }
};

//  generating encryption key for the credential

userSchema.methods.generateEncryptionKey = function (password, credentialId) {
  if (!password || !credentialId) return null;
  try {
    return crypto
      .createHash("sha256")
      .update(password + this.salt + credentialId)
      .digest("hex");
  } catch (error) {
    return null;
  }
};

// Generate OTP for email/SMS
userSchema.methods.generateOTP = function() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  this.otpCode = crypto.createHash('sha256').update(otp).digest('hex'); // Store hashed OTP
  this.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
  this.otpUsed = false;
  return otp; // Return plain OTP for sending
};

// Verify OTP
userSchema.methods.verifyOTP = function(candidateOTP) {
  if (!candidateOTP || !this.otpCode || !this.otpExpires || this.otpUsed) {
    return false;
  }
  
  if (this.otpExpires < new Date()) {
    return false; // OTP expired
  }
  
  const hashedCandidate = crypto.createHash('sha256').update(candidateOTP).digest('hex');
  return hashedCandidate === this.otpCode;
};

// Clear OTP data
userSchema.methods.clearOTP = function() {
  this.otpCode = null;
  this.otpExpires = null;
  this.otpUsed = false;
};

// Generate backup codes
userSchema.methods.generateBackupCodes = function() {
  const codes = [];
  for (let i = 0; i < 10; i++) {
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();
    codes.push(code);
    this.backupCodes.push({ code: crypto.createHash('sha256').update(code).digest('hex') });
  }
  return codes; // Return plain codes for user to save
};

// Verify backup code
userSchema.methods.verifyBackupCode = function(candidateCode) {
  const hashedCandidate = crypto.createHash('sha256').update(candidateCode.toUpperCase()).digest('hex');
  const backupCode = this.backupCodes.find(bc => bc.code === hashedCandidate && !bc.used);
  
  if (backupCode) {
    backupCode.used = true;
    return true;
  }
  return false;
};


const User = mongoose.model("User", userSchema);
module.exports = User;
