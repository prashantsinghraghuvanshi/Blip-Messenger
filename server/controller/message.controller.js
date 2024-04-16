import Conversation from "../models/user/conversation.model.js";
import Message from "../models/user/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    console.log(newMessage.message)

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {

try {
    const { id: userToChatId } = req.params;
    console.log(userToChatId);
    const senderId = req.user._id;
  
    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId] },
    }).populate('messages'); // NOT REFERENCE BUT ACTUAL MESSAGES

    console.log(conversation);

    if (!conversation) return res.status(200).json({status:"fail"});
    
    const messages = conversation.messages;

    res.status(200).json(messages);
} catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
}
};
