import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({
    fullName,
    userName,
    password,
    confirmPassword,
    gender,
  }) => {
    console.log(13);
    console.log([fullName, userName, password, confirmPassword, gender]);
    const success = handleInputErrors({
      fullName,
      userName,
      password,
      confirmPassword,
      gender,
    });
    console.log(21);
    console.log(success);

    if (!success) return;

    setLoading(true);
    console.log(26);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          userName,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      //localstorage to be returned from backend
      localStorage.setItem("chat-user", JSON.stringify(data));
      //auth context
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
    console.log(47);
  };

  return { loading, signup };
};
export default useSignup;

function handleInputErrors({
  fullName,
  userName,
  password,
  confirmPassword,
  gender,
}) {
  console.log([fullName, userName, password, confirmPassword, gender]);
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error("Please fill out all the entries");

    return false;
  }

  if (password !== confirmPassword) {
    console.log("password do n=not match");

    toast.error("Passwords do not match!");
    return false;
  }

  if (password.length < 6) {
    console.log("password lenght less then 6");

    toast.error("Password must be atleast 6 characters!");
    return false;
  }

  return true;
}
