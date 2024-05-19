import LogoutButton from "./LogoutButton";
import HomeButton from "./HomeButton";
import FriendsButton from "./FriendsButton";
import AddFriendButton from "./AddFriendButton";

export default function Navbar() {
  return (
    <>
      <div className="flex flex-col items-center gap-y-2 py-4">
        <div className="mb-2">
          <HomeButton />
        </div>

        <div className="hs-tooltip [--placement:right] inline-block">
          <button
            type="button"
            className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700"
          >
            <FriendsButton />
            <span
              className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg whitespace-nowrap dark:bg-neutral-700"
              role="tooltip"
            >
              Home
            </span>
          </button>
        </div>

        <div className="hs-tooltip [--placement:right] inline-block">
          <button
            type="button"
            className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700"
          >
            <AddFriendButton />
            <span
              className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg whitespace-nowrap dark:bg-neutral-700"
              role="tooltip"
            >
              Users
            </span>
          </button>
        </div>

        <div className="mt-auto">
          <LogoutButton />
        </div>
      </div>
    </>
  );
}
