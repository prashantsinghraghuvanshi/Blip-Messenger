import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";

export default function GroupModal({ isOpen, onClose }) {
  const [groupName, setGroupName] = useState("");
  const [participants, setParticipants] = useState(["John Doe", "Jane Smith"]);

  const handleCreateGroup = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 text-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Create New Group</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <RxCross2 className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Participants
            </label>
            <div className="flex flex-wrap gap-2">
              {participants.map((participant, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-gray-300 text-sm px-2 py-1 rounded-full flex items-center"
                >
                  {participant}
                  <button
                    onClick={() =>
                      setParticipants(
                        participants.filter((_, i) => i !== index)
                      )
                    }
                    className="ml-1 text-gray-500 hover:text-gray-400"
                  >
                    <RxCross2 className="w-4 h-4" />
                  </button>
                </span>
              ))}
              <button className="text-green-500 hover:text-green-400">
                <FaPlus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-gray-300 mr-2"
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
