import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useGetConversations() {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  //fetching conversation data from api
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        console.log("13");
        const res = await fetch("http://localhost:8000/api/getUsers");
        console.log("14");

        const data = await res.json();
        console.log("18", data);
        if (data.error) {
          throw new Error(data.error);
        }
        console.log(data, "50");
        //set data into conversation state
        console.log("conversations : ", conversations, typeof conversations);

        setConversations(data);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
    //added a dependency here
  }, [conversations]);

  return { loading, conversations };
}

export default useGetConversations;
