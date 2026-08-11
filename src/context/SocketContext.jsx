import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [realtimeAlert, setRealtimeAlert] = useState(null);

  useEffect(() => {
    const newSocket = io('/', { path: '/socket.io' });
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
