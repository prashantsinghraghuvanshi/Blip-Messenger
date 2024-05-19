import { LiaUserFriendsSolid } from "react-icons/lia";
import useConversation from "../../zustand/useConversation";

export default function FriendsButton() {
  const { selectFriends, setSelectFriends, setSelectedConversation } =
    useConversation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectFriends) return;
    setSelectedConversation(null);
    setSelectFriends();
  };

  return (
    <div className="mt-auto">
      <LiaUserFriendsSolid
        className="w-6 h-6 text-white cursor-pointer"
        onClick={handleSubmit}
      />
    </div>
  );
}
