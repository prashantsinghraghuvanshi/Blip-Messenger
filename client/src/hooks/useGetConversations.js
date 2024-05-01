import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  //fetching conversation data from api
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/getUsers");

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        //set data into conversation state
        console.log("conversations : ", conversations, typeof conversations);

        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
    //added a dependency here
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
