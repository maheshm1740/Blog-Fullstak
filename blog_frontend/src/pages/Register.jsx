/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../service/axiosClient";
import AuthForm from "../components/AuthForm";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [registerSuccess, setRegisterSuccess]=useState(false);
  const [errorMessage, setErrorMessage]=useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/register", { username, password });
      setRegisterSuccess(true)
      setTimeout(()=>{
        navigate("/login");
      }, 1000)
    } catch (err) {
      setErrorMessage("Username already taken or error occurred.");
        setTimeout(() => {
        setErrorMessage("");
      }, 1200);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 -mt-2">
      <div className="flex flex-col items-center -mt-32">
        {errorMessage && (
      <div className="mb-4 bg-red-600 text-white px-4 py-2 rounded shadow">
        {errorMessage}
      </div>
      )}
        {registerSuccess && (
        <div className="mb-4 bg-green-600 text-white px-4 py-2 rounded shadow">
          Registered successfully you can login!
        </div>
      )}
        <AuthForm 
          title="Register"
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={handleRegister}
          buttonText="Sign up"

        />
        <div className="mt-4 text-center">
          <p className="text-gray-700 italic mb-2">"Alredy have an account?"</p>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline font-semibold"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
