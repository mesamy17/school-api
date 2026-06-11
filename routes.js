const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// 1. Import Models safely
const User = require("./models/User");
const Profile = require("./models/Profile");

// 2. Import Middleware safely
const authenticateToken = require("./authMiddleware");

// ==========================================
// AUTH ROUTES (Signup & Login)
// ==========================================

// SIGNUP: Register a test user
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error during signup", error: error.message });
  }
});

// LOGIN: Verify user and return JWT Token
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // Generate JWT Token containing user id (Expires in 1 hour)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error during login", error: error.message });
  }
});

// ==========================================
// PROTECTED PROFILE ROUTES (Uses Middleware)
// ==========================================

// POST API: Create or Update Profile
router.post("/profile", authenticateToken, async (req, res) => {
  try {
    const {
      name,
      rollNumber,
      class: className,
      department,
      teacher,
      phoneNumber,
    } = req.body;

    if (
      !name ||
      !rollNumber ||
      !className ||
      !department ||
      !teacher ||
      !phoneNumber
    ) {
      return res
        .status(400)
        .json({ message: "All profile fields are required!" });
    }

    let profile = await Profile.findOne({ userId: req.user.id });

    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { userId: req.user.id },
        {
          name,
          rollNumber,
          class: className,
          department,
          teacher,
          phoneNumber,
        },
        { new: true },
      );
      return res
        .status(200)
        .json({ message: "Profile updated successfully!", profile });
    }

    // Create a completely new profile if it doesn't exist
    profile = new Profile({
      userId: req.user.id,
      name,
      rollNumber,
      class: className,
      department,
      teacher,
      phoneNumber,
    });

    await profile.save();
    res.status(201).json({ message: "Profile created successfully!", profile });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server Error during profile creation",
        error: error.message,
      });
  }
});

// GET API: Fetch Stored Profile Details
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    if (!profile) {
      return res
        .status(404)
        .json({ message: "Profile not found for this user!" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server Error during profile fetch",
        error: error.message,
      });
  }
});

module.exports = router;
