import User from "../models/user/user.models.js";
import Conversation from "../models/user/conversation.model.js";

export const getGlobalUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    console.log("loggedInUserId = " , loggedInUserId)

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    // console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFriendUsers = async (req, res) => {

  try {
   
    const loggedInUserId = req.user._id.toString();
    // console.log("loggedInUserId = ", loggedInUserId);


    const conversations = await Conversation.find({
      participants: { $all: [loggedInUserId] },
    }).sort({ updatedAt: -1 });
    console.log("Conversations found: ", conversations.length);

    const uniqueIdsSet = new Set();
    conversations.forEach(conversation => {
      conversation.participants.forEach(id => {
        uniqueIdsSet.add(id.toString());
      });
    });


    let uniqueIdsArray = Array.from(uniqueIdsSet).filter(id => id !== loggedInUserId);
    console.log("Unique friend user IDs: ", uniqueIdsArray);

    const usersMap = {};
    const users = await User.find({ _id: { $in: uniqueIdsArray } }).select("-password");
    users.forEach(user => {
      usersMap[user._id.toString()] = user;
    });

    const orderedUsers = uniqueIdsArray.map(id => usersMap[id]);
    // console.log("Ordered users: ", orderedUsers.map(user => user?._id)); 

    res.status(200).json(orderedUsers);
  } catch (error) {
    console.error("Error in getFriendUsers controller: ", error); 
    res.status(500).json({ error: "Internal server error" });
  }
};
