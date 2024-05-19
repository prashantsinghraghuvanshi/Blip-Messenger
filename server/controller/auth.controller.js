import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
import User from "../models/user/user.models.js";

export const signup = async (req, res) => {
  // console.log("client request accepted");
  try {
    // console.log("client request accepted by try");

    const { fullName, userName, password, confirmPassword, gender } = req.body;

    // confirm password condition
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password don't match" });
    }
    // finding user in database

    const user = await User.findOne({ userName });

    // if userName already exist
    if (user) {
      return res.status(400).json({ error: "userName already exists" });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // getting rabndom user profile  from avatar.iran
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?userName=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?userName=${userName}`;

    // creating user object
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    // user doees not exist already then save it to database
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        status: "success",
        _id: newUser._id,
        userName: newUser.userName,
        password: newUser.password,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(201).json({ error: "invalid user data" });
    }
  } catch (error) {
    // console.log(req.body);
    res
      .status(500)
      .json({ error: "internal server error", message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password);

    if (!user || !isPasswordCorrect) {
      return res.status(404).json({ error: "incorrect userName or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.json({
      _id: user._id,
      userName: user.userName,
      password: user.password,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: "internet server error" });
    console.log("error", error.message);
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      result: User.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "No user found " });
  }
};
