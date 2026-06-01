import { io } from "socket.io-client";

const socket = io("https://helpdesk-support-system-jdch.onrender.com", {
  transports: ["websocket"],
});

export default socket;