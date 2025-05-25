import axios from "axios";

const blog = axios.create({
  baseURL: import.meta.env.VITE_API_URL 
});

export default blog;
