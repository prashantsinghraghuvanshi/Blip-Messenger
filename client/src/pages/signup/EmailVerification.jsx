import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import userEmailVerification from '../../hooks/userEmailVerification'; // Correct the import statement

const EmailVerification = () => {
  const { username, token } = useParams();
  const [isValidateToken, setisValidateToken] = useState(false);

  const verifyEmailToken = async (username, emailToken) => {
    console.log("testing function");
    const usernameAndToken = {
      username: username,
      emailToken: emailToken,
    };

    console.log(usernameAndToken);

    try {
      const response = await fetch("/api/auth/verifyEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usernameAndToken),
      });
      const data = await response.json();
      console.log("29", data);
      const responseStatus = data.status;
      console.log("30", responseStatus);
      if (responseStatus === "okay") {
        setisValidateToken(true);
      }
      console.log(isValidateToken);
    } catch (error) {
      console.error("Error verifying email token:", error);
    }
  };

  useEffect(() => {
    verifyEmailToken(username, token);
  }, []);

  return (
    <div>
      {isValidateToken ? (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
          <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
              Email verified
            </h1>
            <div>
              <Link
                to="/"
                className="text-sm flex items-center justify-center hover:underline hover:text-blue-600 mt-2 inline-block my-auto"
              >
                Click here to {"login"}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Verifying...</h1>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
