import axios from "axios";

const instance = axios.create({
  baseURL: "https://kanban-app-react-backend.vercel.app",
});

export default instance;
