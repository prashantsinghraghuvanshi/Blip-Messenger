import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetGlobalUsers = () => {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  //fetching conversation data from api
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/getUsers/getGlobalUsers");

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        //set data into conversation state
        setAllUsers(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
    //added a dependency here
  }, []);

  return { loading, allUsers };
};

export default useGetGlobalUsers;
