import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../service/axiosClient";
import { useAuth } from "../hooks/UseAuth";
import AuthForm from "../components/AuthForm";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginSuccess, setLoginSuccess]=useState(false);
  const [errorMessage, setErrorMessage]=useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/login", { username, password });
      login(username, res.data.token);
      setLoginSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      setUsername('');
      setPassword('');
    } catch {
      setErrorMessage("Invalid credentials");
      setPassword('');
      setTimeout(()=>{
        setErrorMessage("");
      }, 1200);
    }
  };

  return (
    
    <div className="fixed inset-0 flex items-center justify-center min-h-screen bg-gray-300 mt-10">
      <div className="flex flex-col items-center -mt-32">
        {errorMessage && (
        <div className="mb-4 bg-red-600 text-white px-4 py-2  text-sm font-medium rounded shadow">
          {errorMessage}
        </div>)}
        {loginSuccess && (
        <div className="mb-4 bg-green-600 text-white px-4 py-2 rounded shadow">
          Logged in successfully!
        </div>
      )}
        <AuthForm 
          title="Login"
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={handleLogin}
          buttonText="Login"

        />
        <div className="mt-4 text-center">
          <p className="text-gray-700 italic mb-2">"Don't have an account yet?"</p>
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline font-semibold"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
    
  );
}

export default Login;
