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
      required: true,
      
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


const User = mongoose.model("User", userSchema);
module.exports = User;
