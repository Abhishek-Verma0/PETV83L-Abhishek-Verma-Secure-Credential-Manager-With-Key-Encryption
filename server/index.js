const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const app = express();

//  setup cors
app.use(cors());
app.use(express.json());

//   connecting to the mongo db

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to mongo db"))
  .catch((err) => console.error("Mongo connection falied with error: ", err));

//  imorting routes

const authRoutes = require("./routes/auth");
const credentialRoutes = require("./routes/credentials");
const mfaRoutes = require("./routes/mfa");
const passwordResetRoutes = require("./routes/passwordReset");

//  use routes

try {
  app.use("/api/auth", require("./routes/auth"));
  console.log("auth routes loaded");
  app.use("/api/credentials", require("./routes/credentials"));
  console.log("credentials routes loaded");
  app.use("/api/mfa", require("./routes/mfa"));
  console.log("mfa routes loaded");
  app.use("/api/password-reset", require("./routes/passwordReset"));
  console.log("passwordReset routes loaded");
} catch (err) {
  console.error("Error loading routes:", err);
}


app.get("/favicon.ico", (req, res) => res.status(204).end());

// port decided by hosting platform
app.get("/api/health", (req, res) => {
  res.send("Server is running ✅");
});

//  for deployment

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  const clientPath = path.join(__dirname, "../client/dist"); // or build if CRA
  app.use(express.static(clientPath));

  app.use((req, res, next) => {
    if (!req.url.startsWith("/api")) {
      res.sendFile(path.join(clientPath, "index.html"));
    } else {
      next();
    }
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Server accessible at: http://0.0.0.0:${PORT}`);
  console.log(`Network access: http://10.0.2.23:${PORT}`);
  console.log(`MFA API: http://10.0.2.23:${PORT}/api/mfa/status`);
});
