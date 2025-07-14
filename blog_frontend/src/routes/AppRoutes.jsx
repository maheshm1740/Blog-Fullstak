import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import { useAuth } from "../hooks/UseAuth";
import Myposts from "../pages/MyPosts";
import CreatePost from "../pages/CreatePost";

function AppRoutes(){

  const {isAuthenticated}=useAuth();

  return(
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="/login"element={<Login/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={ isAuthenticated ? <Dashboard/> : <Navigate to="/login" />}/>
        <Route path="/myposts" element={isAuthenticated?<Myposts/> : <Navigate to="/login"/>}/>
        <Route path="/create" element={isAuthenticated?<CreatePost/> : <Navigate to="/login"/>}/>
      </Routes>
  );
}

export default AppRoutes;