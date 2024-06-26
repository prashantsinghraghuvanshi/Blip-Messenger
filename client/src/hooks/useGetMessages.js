import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);

        const data = await res.json();
        console.log("15");
        if (!data) {
          console.log("16", data);
        }
        if (data.error) throw new Error(data.error);
        console.log(data);
        if (data.status !== "fail") setMessages([...data]);
      } catch (error) {
        setMessages([]);
        // toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
