
import { io } from 'socket.io-client';
import { getUserRole } from './auth';

const role = getUserRole();
const URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

const socket = io(URL, {
  auth: {
    role,
  },
  transports: ["websocket"]
});

export default socket;

