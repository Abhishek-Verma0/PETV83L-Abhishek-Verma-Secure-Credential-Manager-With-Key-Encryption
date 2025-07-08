const mongoose = require("mongoose");
const crypto = require("crypto");

const credentialSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    encryptedData: {
      data: {
        type: String,
        required: true,
      },
      iv: {
        type: String,
        required: true,
      },
    },
    website: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    
  }
);

// index for faster queries
credentialSchema.index({ user: 1, title: 1 });

// static method to encrypt credential data
credentialSchema.statics.encryptCredential = function (data, encryptionKey) {
  try {
    const iv = crypto.randomBytes(16);
    const keyBuffer = Buffer.from(encryptionKey, "hex");

    const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, iv);

    const dataStr = typeof data === "string" ? data : JSON.stringify(data);
    let encrypted = cipher.update(dataStr, "utf8", "hex");
    encrypted += cipher.final("hex");

    return {
      data: encrypted,
      iv: iv.toString("hex"),
    };
  } catch (error) {
    throw new Error("Failed to encrypt credential: " + error.message);
  }
};

// static method to decrypt credential data
credentialSchema.statics.decryptCredential = function (
  encryptedData,
  encryptionKey
) {
  try {
    if (!encryptedData.data || !encryptedData.iv) {
      throw new Error("Missing required encryption data");
    }

    const keyBuffer = Buffer.from(encryptionKey, "hex");
    const ivBuffer = Buffer.from(encryptedData.iv, "hex");

    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      keyBuffer,
      ivBuffer
    );

    let decrypted = decipher.update(encryptedData.data, "hex", "utf8");
    decrypted += decipher.final("utf8");

    // clear sensitive buffers
    keyBuffer.fill(0);
    ivBuffer.fill(0);

    return JSON.parse(decrypted);
  } catch (error) {
    throw new Error("Failed to decrypt credential: " + error.message);
  }
};

const Credential = mongoose.model("Credential", credentialSchema);
module.exports = Credential;
