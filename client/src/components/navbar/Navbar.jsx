import LogoutButton from "./LogoutButton";
import HomeButton from "./HomeButton";
import FriendsButton from "./FriendsButton";
import AddFriendButton from "./AddFriendButton";
import GroupsButton from "./AddGroups";

export default function Navbar() {
  return (
    <div className="flex flex-col justify-between h-full py-4 px-2 backdrop-filter backdrop-blur-lg bg-opacity-60 border border-gray-900">
      
      {/* top */}
      <div className="flex justify-start">
        <button
          type="button"
          className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center text-sm font-semibold border border-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-700"
        >
          <HomeButton />
        </button>
      </div>
      
      {/* middle */}
      <div className="flex flex-col items-center gap-y-4">
        {[
          FriendsButton,
          AddFriendButton,
          GroupsButton,
        ].map((ButtonComponent, index) => (
          <button
            key={index}
            type="button"
            className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-700"
          >
            <ButtonComponent />
          </button>
        ))}
      </div>

      {/* bottom */}
      <div className="flex justify-center">
        <button
          type="button"
          className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center text-sm font-semibold border border-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-700"
        >
          <LogoutButton />
        </button>
      </div>
    </div>
  );
}
