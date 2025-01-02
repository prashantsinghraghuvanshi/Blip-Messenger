import LogoutButton from "./LogoutButton";
import HomeButton from "./HomeButton";
import FriendsButton from "./FriendsButton";
import AddFriendButton from "./AddFriendButton";
import GroupsButton from "./AddGroups";

export default function Navbar() {
  return (
    <>
      <div className="flex flex-col items-center gap-y-4 p-2 pt-10 backdrop-filter backdrop-blur-lg bg-opacity-60 bg-gray-100 dark:bg-neutral-800 dark:bg-opacity-60">

        <div className="flex flex-col items-center gap-y-4">

        <button
            type="button"
            className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 relative"
          >
            <HomeButton />
          </button>

          <button
            type="button"
            className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 relative"
          >
            <FriendsButton />
          </button>

          <button
            type="button"
            className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 relative"
          >
            <AddFriendButton />
          </button>

          <button
            type="button"
            className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 relative"
          >
            <GroupsButton />
          </button>

          <button
            type="button"
            className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 relative"
          >
            <LogoutButton />
          </button>

        </div>
      </div>
    </>
  );
}
