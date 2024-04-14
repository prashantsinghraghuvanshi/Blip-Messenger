import MessageInput from "./MessageInput";
import Messages from "./Messages";
// import { TiMessages } from "react-icons/ti";

export default function MessageContainer() {
  const noChatSelected = true;
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {noChatSelected ? (
        <NoChatSelected />
      ) : (
        <>
          {/* header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To : </span>{" "}
            <span className="text-gray-900 font-bold">Abhishek</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

// incase no chat is selected
const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-xl md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome Prashant!</p>
        <p>Select a chat to start messaging 🫡</p>
        <img
          className="object-contain mt-4 h-60 w-100 items-center"
          src="../../../assets/logo/svg/final-logo.svg"
          alt="Blip Logo"
        />
      </div>
    </div>
  );
};
