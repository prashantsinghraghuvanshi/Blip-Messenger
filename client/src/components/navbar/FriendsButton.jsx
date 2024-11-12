import { LiaUserFriendsSolid } from "react-icons/lia";
import useConversation from "../../zustand/useConversation";
// import {useDispatch} from 'react-redux';
// import { setSidebarStatus } from "../../store/viewSlice";

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
    <div className="my-auto">
      <LiaUserFriendsSolid
        className="w-6 h-6 text-white cursor-pointer"
        onClick={handleSubmit}
      />
    </div>
  );
}
