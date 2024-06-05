import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
import User from "../models/user/user.models.js";
import { verifyUserEmail } from "../utils/gmail.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, email, password, confirmPassword, gender } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUserName = await User.findOne({userName});
    console.log(existingUserName);

    if (existingUserName) {
      return res
        .status(400)
        .json({ error: "Username already exists" });
    }
     
    // checking for existing email addreeses
    // const existingUserEmail = await User.findOne({email});
    // if (existingUserEmail) {
    //   return res
    //     .status(400)
    //     .json({ error: "User with this email already exists" });
    // }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const profilePic = `https://api.multiavatar.com/${userName}.svg`;

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

    // Assuming verifyUserEmail is defined as an async function
    try {
      await verifyUserEmail(fullName, email, userName, emailToken);
    } catch (emailError) {
      return res
        .status(500)
        .json({
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
      email:newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    // Log the error for internal debugging
    console.error("Signup Error:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const user_Id = user._id;
    console.log(user_Id)

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
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      result: users.length,
      data: { users },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { userName, emailToken } = req.body;
    const user = await User.findOne(userName);
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "No user found 120" });
    }

    try {
      const decoded = jwt.verify(emailToken, process.env.JWT_SECRET_KEY);
      console.log(decoded);

      await User.updateOne(
        { userName: req.body.userName },
        { $set: { confirmedEmail: true } }
      );

      console.log("User found and email confirmed");
      return res.json({ status: "okay" });
    } catch (err) {
      console.error("Invalid email token", err);
      return res.status(400).json({ error: "Invalid email token" });
    }
  } catch (err) {
    console.error("Error finding user", err);
    return res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};
