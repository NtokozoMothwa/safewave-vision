
import { io, Socket } from 'socket.io-client';
import { getUserRole } from './auth';

const role = getUserRole();
const URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

const socket: Socket = io(URL, {
  auth: {
    role,
  },
  transports: ["websocket"]
});

export default socket;
