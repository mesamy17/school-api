const express = require("express");
const router = express.Router();
const Profile = require("./models/Profile");
const authenticateToken = require("./authMiddleware");



// POST API - Create/Update Profile
router.post("/profile", authenticateToken, async (req, res) => {
  const {
    name,
    rollNumber,
    class: className,
    department,
    teacher,
    phoneNumber,
  } = req.body;

  try {
    let profile = await Profile.findOne({ userId: req.user.id });

    if (profile) {
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
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// GET API - Fetch Profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    if (!profile)
      return res.status(404).json({ message: "Profile not found!" });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;

