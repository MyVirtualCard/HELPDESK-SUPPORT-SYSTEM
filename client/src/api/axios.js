import axios from "axios";

const API = axios.create({
  baseURL: "https://helpdesk-support-system-jdch.onrender.com/api",
});

export default API;