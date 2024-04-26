import User from "../models/user/user.models.js";

export const getUser = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const filterUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );

    res.status(200).json(filterUser);
  } catch (error) {
    console.error("error in getUser : ", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};
