import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  headers:{
    "Content-Type":"application/json"
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const resInterceptor = axiosClient.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosClient.interceptors.response.eject(resInterceptor);
    };
  }, [navigate]);
};

export default axiosClient;
