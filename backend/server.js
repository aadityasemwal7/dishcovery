require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(cors({ origin: "https://dish-covery-delta.vercel.app" }));
app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(err => console.log("MongoDB connection failed", err));

// Use only the router, not individual routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});