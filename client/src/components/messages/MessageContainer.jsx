import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";
import Messages from "./Messages";
import { capitalize } from "lodash";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { TbHexagonLetterB, TbHexagonLetterL, TbHexagonLetterI, TbHexagonLetterP } from "react-icons/tb";

export default function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    //cleanup function
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col w-full">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* header */}
          <div className="bg-slate-500 px-4 py-2 flex flex-row">
            <span className="w-7 rounded-full">
              <img src={selectedConversation.profilePic} alt="user avatar" />
            </span>
            <span className="text-gray-900 font-bold mx-2">
              {selectedConversation.fullName}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

// incase no chat is selected
const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-xl md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Hello {capitalize(authUser.userName)}!</p>
        <p>Select a chat to start messaging 🫡</p>
        <div className="flex flex-row ">
          <TbHexagonLetterB size={100} />
          <TbHexagonLetterL size={100} />
          <TbHexagonLetterI size={100} />
          <TbHexagonLetterP size={100} />
        </div>
      </div>
    </div>
  );
};
