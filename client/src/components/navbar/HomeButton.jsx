import { FaHome } from "react-icons/fa";

import useConversation from "../../zustand/useConversation";

export default function LogoutButton() {
  const { setSelectedConversation } = useConversation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSelectedConversation(null);
  };

  return (
    <div className="mt-auto">
      <FaHome
        className="w-6 h-6 text-white cursor-pointer"
        onClick={handleSubmit}
      />
    </div>
  );
}
