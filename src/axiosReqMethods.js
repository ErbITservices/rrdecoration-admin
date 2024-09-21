import axios from "axios";



const baseURL = `${process.env.REACT_APP_BACKEND_API_BASE_URL}` || "http://localhost:4000";

function getAccessToken() {
    const storage = JSON.parse(localStorage.getItem("persist:root"))
    const currentUser =  storage ? JSON.parse(storage.currentUser) : null;
    return currentUser ? currentUser?.accessToken : null
  }

export const req = axios.create({
    baseURL,
});
 
export const publicreq = axios.create({
    baseURL,
});

req.interceptors.request.use(config => {
    const newToken = getAccessToken();
    if (newToken) {
      config.headers.token = `Bearer ${newToken}`;
    }
    return config;
  });
  

