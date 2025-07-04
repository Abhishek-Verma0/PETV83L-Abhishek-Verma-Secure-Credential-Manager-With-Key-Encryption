const router = require("express").Router();
const Credential = require("../models/Credential");
const User = require("../models/User");
const auth = require("../middleware/auth");

// creating credential
router.post("/", auth, async (req, res) => {
  let rawPassword = req.body.userPassword;
  try {
    const { title, fields } = req.body;

    if (!title || !fields || !rawPassword) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await user.comparePassword(rawPassword);
    if (!isValid) {
      return res.status(401).json({ message: "Failed to verify password" });
    }

    const tempCredential = new Credential();
    tempCredential.user = user._id;
    tempCredential.title = title;

    const encryptionKey = user.generateEncryptionKey(
      rawPassword,
      tempCredential._id.toString()
    );
    const encryptedData = Credential.encryptCredential(fields, encryptionKey);
    tempCredential.encryptedData = encryptedData;

    await tempCredential.save();

    res.status(201).json({
      _id: tempCredential._id,
      title,
      createdAt: tempCredential.createdAt,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error creating credential" });
  } finally {
    rawPassword = null;
  }
});

// get all credentials (without sensitive data)
router.get("/", auth, async (req, res) => {
  try {
    const credentials = await Credential.find({ user: req.user.userId }).select(
      "title createdAt"
    );
    res.json(credentials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching credentials" });
  }
});

// get single credential with decrypted data
router.post("/:id/decrypt", auth, async (req, res) => {
  let rawPassword = req.body.userPassword;
  let encryptionKey = null;
  try {
    const credential = await Credential.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!credential) {
      return res.status(404).json({ message: "Credential not found" });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await user.comparePassword(rawPassword);
    if (!isValid) {
      return res.status(401).json({ message: "Failed to verify password" });
    }

    encryptionKey = user.generateEncryptionKey(
      rawPassword,
      credential._id.toString()
    );

    if (!encryptionKey) {
      return res
        .status(500)
        .json({ message: "Failed to generate encryption key" });
    }

    const decryptedData = Credential.decryptCredential(
      credential.encryptedData,
      encryptionKey
    );

    // clear encryption key immediately after use
    encryptionKey = null;

    res.json({
      _id: credential._id,
      title: credential.title,
      fields: decryptedData,
      createdAt: credential.createdAt,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error fetching credential" });
  } finally {
    // clear sensitive data
    rawPassword = null;
    encryptionKey = null;
  }
});

// update credential
router.put("/:id", auth, async (req, res) => {
  let rawPassword = req.body.userPassword;
  try {
    const { title, fields } = req.body;

    const credential = await Credential.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!credential) {
      return res.status(404).json({ message: "Credential not found" });
    }

    const user = await User.findById(req.user.userId);
    const isValid = await user.comparePassword(rawPassword);
    if (!isValid) {
      return res.status(401).json({ message: "Failed to verify password" });
    }

    const encryptionKey = user.generateEncryptionKey(
      rawPassword,
      credential._id.toString()
    );

    if (fields) {
      credential.encryptedData = Credential.encryptCredential(
        fields,
        encryptionKey
      );
    }

    if (title) credential.title = title;

    await credential.save();

    res.json({
      _id: credential._id,
      title: credential.title,
      createdAt: credential.createdAt,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error updating credential" });
  } finally {
    rawPassword = null;
  }
});

// delete credential
router.delete("/:id", auth, async (req, res) => {
  let rawPassword = req.body.userPassword;
  try {
    const credential = await Credential.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!credential) {
      return res.status(404).json({ message: "Credential not found" });
    }

    // verify password before deletion
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await user.comparePassword(rawPassword);
    if (!isValid) {
      return res.status(401).json({ message: "Failed to verify password" });
    }

    // proceed with deletion using the existing logic
    await Credential.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    res.json({ message: "Credential deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting credential" });
  } finally {
    // clear sensitive data
    rawPassword = null;
  }
});

module.exports = router;
