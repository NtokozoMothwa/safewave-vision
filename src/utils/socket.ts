import { io } from 'socket.io-client';

// Use environment variable or fallback to localhost
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
});

export default socket;
