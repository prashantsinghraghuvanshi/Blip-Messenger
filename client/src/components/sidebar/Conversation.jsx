import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

export default function Conversation({ conversation, lastIdx, emoji }) {
  //zustand state to check for selected conversation
  const { selectedConversation, setSelectedConversation } = useConversation();
  //to change background color
  const isSelected = selectedConversation?._id === conversation._id;
  //to check online users
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  console.log(conversation._id)

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-orange-600 rounded p-2 py-1 cursor-pointer 
          ${isSelected ? "bg-sky-500" : ""}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-5 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
}
