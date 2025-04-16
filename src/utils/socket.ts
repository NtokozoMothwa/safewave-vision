import { io } from 'socket.io-client';
import { EmergencyAlert } from '../types';

export type SocketAlertCallback = (data: EmergencyAlert) => void;

export const listenToEmergencyAlerts = (callback: SocketAlertCallback) => {
  socket.on('emergency-alert', callback);
};


// Use environment variable or fallback to localhost
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
});

export default socket;
