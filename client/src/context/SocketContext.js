import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// Create a context for Socket.io
const SocketContext = createContext(null);

// Create a provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize the socket connection
    const socketIo = io(process.env.REACT_APP_BASE_URL); // Update with your backend URL
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use socket context
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
