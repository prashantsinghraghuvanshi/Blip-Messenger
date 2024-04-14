import toast from "react-hot-toast";
import { useState } from "react";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const signup = async (
    fullName,
    userName,
    password,
    confirmPassword,
    gender
  ) => {
    const success = handleInputErrors({
      fullName,
      userName,
      password,
      confirmPassword,
      gender,
    });

    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch("need-server-api", {
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
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
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
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error("Please fill out all the entries");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match!");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be atleast 6 characters!");
    return false;
  }

  return true;
}
