import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { ClientSocketType } from '@/types/socket';

interface ISocketContext {
  socket: ClientSocketType | null;
  isConnected: boolean;
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<ClientSocketType | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket: ClientSocketType = io('http://localhost:3000', {
      path: '/api/socket/io',
      addTrailingSlash: false,
    });

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('error', (error: Error) => {
      console.error(error);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    setSocket(socket);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
