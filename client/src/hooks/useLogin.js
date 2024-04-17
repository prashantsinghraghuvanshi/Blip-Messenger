import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (userName, password) => {
    //data validation
    const success = handleInputErrors({
      userName,
      password,
    });
    if (!success) return;

    //post
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      //setting data in local DOM
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

//function for login form validation
function handleInputErrors({ userName, password }) {
  console.log(userName, password);
  if (!userName || !password) {
    toast.error("Please fill out all the entries");

    return false;
  }

  return true;
}
