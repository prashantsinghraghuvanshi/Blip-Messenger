import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
// import { FaPlus } from "react-icons/fa";
import useGetConversations from "../../hooks/useGetConversations";

export default function GroupModal({ isOpen, onClose }) {
  const [groupName, setGroupName] = useState("");
  // const [participants, setParticipants] = useState();
  const { conversations } = useGetConversations();
  console.log("9", conversations);

  const handleCreateGroup = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      {/* Set fixed height to modal, 70% of screen height */}
      <div className="bg-gray-800 text-white rounded-lg shadow-xl w-full max-w-md h-[70vh]">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Create New Group</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <RxCross2 className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 h-[calc(100%-130px)]">
          {/* Group Name */}
          <div className="mb-6">
            <label
              htmlFor="groupName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-900 text-white placeholder-gray-400"
              placeholder="Enter group name"
            />
          </div>

          {/* Select Group Members */}
          <div className="flex flex-col items-center justify-center gap-4 w-full mb-4">
            <div className="w-full text-lg font-semibold text-left">
              Select Group Members
            </div>

            {/* Search bar component */}
            <div className="w-full flex gap-2">
              <input
                type="text"
                placeholder="Search Users"
                className=" pl-5  bg-gray-900 h-9 rounded-2xl w-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                // onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Friend list component */}
          <div className="overflow-y-auto w-full max-h-[200px]">
            {conversations.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded-md"
              >
                {/* Profile picture */}
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={item.profilePic}
                    alt="user avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* User info */}
                <div className="flex flex-col flex-1">
                  <p className="font-bold text-gray-200">{item.fullName}</p>
                  {/* Add additional details if needed */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex justify-end items-center p-4 border-t  border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-gray-300 mr-2 "
          >
            Cancel
          </button>
          <button
            onClick={handleCreateGroup}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
}
