import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar.jsx";
import MessageContainer from "../../components/messages/MessageContainer";

export default function Home() {
  return (
    <div className="flex sm:h-[500px] md:h-[600px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Navbar />
      <Sidebar />
      <MessageContainer />
    </div>
  );
}
