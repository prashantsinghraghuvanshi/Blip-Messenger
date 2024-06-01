import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar.jsx";
import MessageContainer from "../../components/messages/MessageContainer";

export default function Home() {
  return (
    <div className="flex h-screen sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Navbar className="pl-10" />
      <Sidebar />
      <MessageContainer />
    </div>
  );
}
