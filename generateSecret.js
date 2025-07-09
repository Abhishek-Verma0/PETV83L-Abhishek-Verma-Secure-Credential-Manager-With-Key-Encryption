const crypto = require("crypto");

// Generate a secure random secret (64 bytes = 512 bits)
const generateSecret = () => {
  const secret = crypto.randomBytes(64).toString("hex");
  console.log("\n=== Your Secure JWT Secret ===");
  console.log(secret);
  console.log("\nAdd this to your .env file as:");
  console.log(`JWT_SECRET=${secret}\n`);
};

generateSecret();
