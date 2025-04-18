import { io } from 'socket.io-client';
import { getUserRole } from './auth';

const role = getUserRole();

const socket = io('http://localhost:5000', {
  auth: {
    role,
  },
});

export default socket;

