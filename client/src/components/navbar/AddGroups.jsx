import { GrGroup } from "react-icons/gr";
import useConversation from "../../zustand/useConversation";

export default function GroupsButton() {
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
      <GrGroup
        className="w-6 h-6 text-white cursor-pointer"
        onClick={handleSubmit}
      />
      {/* <button
        //   onClick={onClick}
        className="fixed bottom-5 right-5 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors duration-300"
        aria-label="Add"
      >
        +
      </button> */}
    </div>
  );
}
