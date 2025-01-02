import { FaHome } from "react-icons/fa";

import useConversation from "../../zustand/useConversation";

export default function LogoutButton() {
  const { setSelectedConversation } = useConversation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSelectedConversation(null);
  };

  return (
    <div>
      <FaHome
        className="h-6 w-8 text-white cursor-pointer"
        onClick={handleSubmit}
      />
    </div>
  );
}
