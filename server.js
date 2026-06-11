const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes"); // Importer your routes gateway

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON payloads coming from Postman
app.use(express.json());

// Main Route Gateway
app.use("/api", routes);

// MongoDB Connection with error handling
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected successfully!");
  })
  .catch((err) => {
    console.error("Database Connection Error: ", err.message);
  });

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
