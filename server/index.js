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

//  use routes

app.use("/api/auth", authRoutes);
app.use("/api/credentials", credentialRoutes);

app.get("/favicon.ico", (req, res) => res.status(204).end());

// port decided by hosting platform
app.get("/api/health", (req, res) => {
  res.send("Server is running ✅");
});

//  for deployment

// if (process.env.NODE_ENV === "production") {
//   const __dirname1 = path.resolve();
//   const clientPath = path.join(__dirname1, "../client/dist");

//   app.use(express.static(clientPath));

//   app.get("*", (req, res) => {
//     if (!req.url.startsWith("/api"))
//       res.sendFile(path.join(clientPath, "index.html"));
//   });
// }
const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
