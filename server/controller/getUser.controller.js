import User from "../models/user/user.models.js";
import Conversation from "../models/user/conversation.model.js";

export const getUser = async (req, res) => {
  // try {
  //   const loggedInUserId = req.user._id;

    
  //   const conversations = await Conversation.find({
  //     participants: { $in: [loggedInUserId] }
  //   });

    
  //   let participantIds = [];
  //   conversations.forEach(conversation => {
  //     participantIds = participantIds.concat(conversation.participants);
  //   });
  //   const uniqueParticipantIds = [...new Set(participantIds)];

    
  //   const filteredParticipantIds = uniqueParticipantIds.filter(id => id.toString() !== loggedInUserId.toString());

   
  //   const usersIConversedWith = await User.find({ _id: { $in: filteredParticipantIds } }).select("-password");

  //   res.status(200).json(usersIConversedWith);



    
  // } catch (error) {
  //   console.error("error in getUser : ", error.message);
  //   res.status(500).json({ error: "Internal server Error" });
  // }

  try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
