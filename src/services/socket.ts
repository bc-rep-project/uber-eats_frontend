import { io } from 'socket.io-client';

// Create Socket.IO instance
export const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
  autoConnect: false,
  transports: ['websocket'],
});

// Handle connection events
socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

socket.on('connect_error', (error) => {
  console.error('WebSocket connection error:', error);
});

// Export functions to manage socket connection
export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

// Add authentication token to socket connection
export const setSocketAuth = (token: string) => {
  socket.auth = { token };
  if (socket.connected) {
    socket.disconnect().connect();
  }
}; 