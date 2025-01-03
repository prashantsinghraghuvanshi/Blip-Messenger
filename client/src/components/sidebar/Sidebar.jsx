import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

export default function Sidebar() {
  return (
    <div className="flex flex-col border border-gray-600">
      <SearchInput />
      <span className="divider px-1"></span>
      <Conversations />
    </div>
  );
}
