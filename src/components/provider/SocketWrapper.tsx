import { createContext, useContext, useEffect, useState } from 'react';

// libraries
import { io } from 'socket.io-client';

// types
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
    const socket: ClientSocketType = io(`${process.env.NEXT_PUBLIC_ADDRESS}`, {
      path: '/api/socket/io/api/socket/io',
      addTrailingSlash: false,
    });

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected');
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
