import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:5000",
  baseURL: "https://shawns-chat-app-api.onrender.com",
});

export default instance;
