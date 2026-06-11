const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not set");
    // Mongoose 6+ no longer requires these options; pass the URI only
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection error:", err.message || err);
    process.exit(1);
  }
};

module.exports = connectDB;
