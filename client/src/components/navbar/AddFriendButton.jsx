import { IoPersonAddOutline } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";

export default function AddFriendButton() {
  const { selectFriends, setSelectFriends, setSelectedConversation } =
    useConversation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectFriends) return;
    setSelectedConversation(null);
    setSelectFriends();
  };

  return (
    <div className="mt-auto">
      <IoPersonAddOutline
        className="w-6 h-6 text-white cursor-pointer"
        onClick={handleSubmit}
      />
    </div>
  );
}
