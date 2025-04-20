// src/services/AlertEngine.ts
import { io } from 'socket.io-client';
import { AlertData, evaluateAlert } from '../utils/alertRules';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');

export function processAlert(data: AlertData) {
  const action = evaluateAlert(data);

  switch (action) {
    case 'notify_dashboard':
      socket.emit('alert:dashboard', data);
      break;
    case 'notify_responder':
      socket.emit('alert:responder', data);
      break;
    case 'escalate_authorities':
      socket.emit('alert:authorities', data);
      break;
    default:
      console.warn('Unhandled alert action:', action);
  }
}
