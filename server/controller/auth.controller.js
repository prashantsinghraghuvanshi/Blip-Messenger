import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
import User from "../models/user/user.models.js";
import { verifyUserEmail } from "../utils/gmail.js";
import { providers } from "../outhConfig.js";
import axios from "axios";

// Signup Function
export const signup = async (req, res) => {
  try {
    const { fullName, userName, email, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const profilePic = `https://api.multiavatar.com/${userName}.svg`;

    // Create new user
    const newUser = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
      gender,
      profilePic,
    });

    const emailToken = jwt.sign({ userName }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Send verification email
    try {
      await verifyUserEmail(fullName, email, userName, emailToken);
    } catch (emailError) {
      return res.status(500).json({
        error: "Error sending verification email",
        message: emailError.message,
      });
    }

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      status: "success",
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

// Login Function
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ error: "Incorrect username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ error: "Incorrect username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.json({
      _id: user._id,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

// Logout Function
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

// Get User Function
export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      result: users.length,
      data: { users },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

// Verify Email Function
export const verifyEmail = async (req, res) => {
  try {
    const { userName, emailToken } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    try {
      const decoded = jwt.verify(emailToken, process.env.JWT_SECRET_KEY);
      await User.updateOne({ userName }, { $set: { confirmedEmail: true } });

      res.json({ status: "Email confirmed successfully" });
    } catch (err) {
      console.error("Invalid email token", err);
      res.status(400).json({ error: "Invalid email token" });
    }
  } catch (err) {
    console.error("Error finding user", err);
    res.status(500).json({ error: "Internal server error", message: err.message });
  }
};

// OAuth 2.0 Auth Function
export const oAuth = async (req, res) => {
  console.log("146")
  try {
    const provider = req.params.provider;
    const config = providers[provider];

    if (!config) {
      return res.status(400).send('Invalid provider');
    }

    const authUrl = `${config.authUrl}?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scope}&response_type=code`;
    res.redirect(authUrl);
  } catch (error) {
    console.error("OAuth Error:", error);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

// Callback Route for OAuth
export const callBackRoute = async (req, res) => {
  const provider = req.params.provider;
  const config = providers[provider];
  const code = req.query.code;

  if (!config || !code) {
    return res.status(400).json({ error: 'Invalid provider or missing authorization code' });
  }

  try {
    // Exchange authorization code for tokens
    const { data } = await axios.post(config.tokenUrl, {
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUri,
      grant_type: provider === 'github' ? undefined : 'authorization_code' // GitHub doesn't require this
    }, {
      headers: { Accept: 'application/json' }
    });

    const idToken = data.id_token || data.access_token;
    const user = jwt.decode(idToken);

    res.json({ user, access_token: data.access_token });
  } catch (error) {
    console.error("Callback Error:", error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};
