import Conversation from "./Conversation";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import useGetGlobalUsers from "../../hooks/useGetGlobalUsers";
import { getRandomEmoji } from "../../utils/emojis";

export default function Conversations() {
  const { selectFriends } = useConversation();
  const { loading, conversations } = useGetConversations();
  const { allUsers } = useGetGlobalUsers();

  return (
    <div className="py-2 flex flex-col overflow-auto no-scrollbar">
      {(selectFriends ? allUsers : conversations).map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
}
