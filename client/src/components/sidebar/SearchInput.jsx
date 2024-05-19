import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import useGetGlobalUsers from "../../hooks/useGetGlobalUsers";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation, selectFriends } = useConversation();
  const { conversations } = useGetConversations();
  const { allUsers } = useGetGlobalUsers();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast("Search term must be atleast 3 characters long!", {
        icon: "🧐",
      });
    }

    //implement search algo to select conversation
    const conversation = (selectFriends ? conversations : allUsers).find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
      toast("Users found", {
        icon: "✅",
      });
    } else toast.error("No such user found!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder={
          selectFriends ? "Global Search..." : "Search from friends..."
        }
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-orange-400 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
}
