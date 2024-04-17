import mongoose from "mongoose";
import User from "../models/user/user.models.js";

const getUser = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const filterUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    console.log(filterUser);

    res.status(200).json(filterUser);
  } catch (error) {
    res.status(500).json({ error: "No user found ", message: error.message });
  }
};

export default getUser;
