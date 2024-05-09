import User from "../models/user/user.models.js";
import Conversation from "../models/user/conversation.model.js";

export const getUser = async (req, res) => {
  // try {
  //   const loggedInUserId = req.user._id;
  
  //   // Find conversations where the logged-in user participates
  //   const conversations = await Conversation.find({
  //     participants: { $all: [loggedInUserId] },
  //   }).sort({ updatedAt: -1 });
  
  //   const uniqueIdsSet = new Set();
  
  //   conversations.forEach(conversation => {
  //     conversation.participants.forEach(id => {
  //       // Convert ObjectId to string representation before adding to Set
  //       uniqueIdsSet.add(id.toString());
  //     });
  //   });
  
  //   // Convert Set back to Array
  //   const uniqueIdsArray = Array.from(uniqueIdsSet);
  
  //   console.log(uniqueIdsArray);
  
  //   // Fetch users corresponding to unique participant IDs
  //   const usersMap = {};
  //   const users = await User.find({ _id: { $in: uniqueIdsArray } });
  //   users.forEach(user => usersMap[user._id.toString()] = user);
  
  //   // Arrange users in the same order as uniqueIdsArray
  //   const orderedUsers = uniqueIdsArray.map(id => usersMap[id]);
  
  //   orderedUsers.forEach(user => console.log("users", user._id));
  
  //   res.status(200).json(orderedUsers);
  // } catch (error) {
  //   console.error("Error in getUser controller: ", error.message);
  //   res.status(500).json({ error: "Internal server error" });
  // }
  

  try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		// console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
