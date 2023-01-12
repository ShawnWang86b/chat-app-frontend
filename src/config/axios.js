import axios from "axios";

// for local development or deploy
export default axios.create({
  baseURL: "http://localhost:5000",
  //baseURL: "https://shawns-chat-app-api.onrender.com",
});
