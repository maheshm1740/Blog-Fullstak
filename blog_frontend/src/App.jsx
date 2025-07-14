import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/UseAuth";
import Navbar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <div className="pt-16">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
