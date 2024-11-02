import Conversations from "./Conversations";

import SearchInput from "./SearchInput";
export default function Sidebar() {
  return (
    <div className="w-[20rem] border-r border-slate-500 flex flex-col ">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
    </div>
  );
}
