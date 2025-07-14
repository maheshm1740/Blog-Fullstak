import { Link } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";


function Navbar({ onLogout }) {

  const {isAuthenticated}=useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-300 shadow-md py-3">
      <div className="px-2 flex items-center justify-between">
        
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            BlogApp
          </Link>
          {isAuthenticated && <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>}
          {isAuthenticated && <Link to="/myposts" className="text-gray-700 hover:text-blue-600">MyPosts</Link>}
          {isAuthenticated && <Link to="/create" className="text-gray-700 hover:text-blue-600">AddPost</Link>}
        </div>

        {isAuthenticated && <button
          onClick={onLogout}
          className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>}
      </div>
    </nav>
  );
}

export default Navbar;