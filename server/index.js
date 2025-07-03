const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();


//  setup cors
app.use(cors());
app.use(express.json());

//   connecting to the mongo db

mongoose.connect(process.env.MONGODB_URL).then(() => console.log("Connected to mongo db")).catch((err) => console.error("Mongo connection falied with error: ", err));




