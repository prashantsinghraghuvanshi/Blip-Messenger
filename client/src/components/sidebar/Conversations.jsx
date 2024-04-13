import Conversation from "./Conversation";

export default function Conversations() {
  return (
    <div className="py-2 flex flex-col overflow-auto no-scrollbar">
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
}
