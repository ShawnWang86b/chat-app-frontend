import axios from "axios";

const instance = axios.create({
  baseURL: "https://chat-app-9yo2.onrender.com",
});

export default instance;
