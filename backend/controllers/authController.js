const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Helper: Generate JWT
const generateToken = (id) => {
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// @desc Register new user
// @route POST /api/auth/register
// @access Public
exports.registerUser = async (req, res) => {
  try {
    // Make sure req.body exists
    const { name, email, password } = req.body || {};

    console.log("REQ.BODY:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    console.log("USER EXISTS:", userExists);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({ name, email, password });
    console.log("USER CREATED:", user);

    // Generate token
    const token = generateToken(user._id);
    console.log("TOKEN GENERATED:", token);

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err); // log full error
    res.status(500).json({ message: err.message }); // send real error
  }
};

// @desc  Login user
// @route POST /api/auth/login
// @access Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      res.json({
        message: "Login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(500).json({ message: "Invalid credentails" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get current logged-in user
// @route GET /api/auth/profile
// @access Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isPro: user.isPro,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Update user profile
// @route PUT /api/auth/me
// @access Private
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;

      const updateUser = await user.save();

      res.json({
        _id: updateUser._id,
        name: updateUser.name,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
