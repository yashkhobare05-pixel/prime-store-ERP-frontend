import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [realtimeAlert, setRealtimeAlert] = useState(null);

  useEffect(() => {
    let socketUrl = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL?.replace('/api', '');
    if (!socketUrl) {
      if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        socketUrl = 'https://prime-store-erp-backend.onrender.com';
      } else {
        socketUrl = '/';
      }
    }
    const newSocket = io(socketUrl, { path: '/socket.io' });
    setSocket(newSocket);

    newSocket.on('stock_alert', (data) => {
      setRealtimeAlert(data);
    });

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, realtimeAlert }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
