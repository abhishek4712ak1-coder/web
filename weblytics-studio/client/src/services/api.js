import axios from 'axios';

const api = axios.create({
  baseURL:  "https://web-gbbl.onrender.com/api" || "/api", 
  withCredentials: true,
});

export default api;
