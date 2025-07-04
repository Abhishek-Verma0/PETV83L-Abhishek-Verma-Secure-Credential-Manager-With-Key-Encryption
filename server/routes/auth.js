const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// FIXED: Registration route - removed manual password hashing since User model handles it
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists" });
    }

    // Create user (password hashing handled by User model pre-save hook)
    user = new User({
      username,
      email,
      password, // Will be hashed by pre-save hook
    });
    await user.save();

    // Creating a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Finding user
    const user = await User.findOne({
      $or: [{ email: username }, { username }],
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check for the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Credential token access time one minute
router.post("/credential-access", async (req, res) => {
  try {
    const { userId } = req.body;

    // Generating short lived token for credential access
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });
    res.json({ token });
  } catch (error) {
    console.error("Credential access error:", error);
    res.status(500).json({
      message: error.message || "Error generating credential access token",
    });
  }
});

// FIXED: Password verification - corrected response property name
router.post("/verify-password", auth, async (req, res) => {
  let rawPassword = req.body.password;
  try {
    // Getting the user
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If found then verify password
    const isValid = await user.comparePassword(rawPassword);

    // FIXED: Changed from isvalid to isValid to match frontend expectation
    res.json({ isValid });
  } catch (error) {
    console.error("Password verification error:", error);
    res.status(500).json({ message: "Error verifying the password" });
  } finally {
    // Clear all sensitive data
    rawPassword = null;
  }
});

// Get current user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password -salt");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
});

module.exports = router;
