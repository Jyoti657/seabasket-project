import axios from "axios";
 
const axiosInstance = axios.create({
  baseURL: "http://localhost:3100",
  withCredentials: true,
});
 export default axiosInstance;

 
 
