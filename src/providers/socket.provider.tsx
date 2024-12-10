import { io, Socket } from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";

interface SocketType {
  socket: Socket | undefined;
}

const SocketContext = createContext<SocketType | undefined>(undefined);

const SOCKET_SERVER_URL = "http://localhost:4000";

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, {
      withCredentials: true,
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useSocket must be used within a SocketProvider");
  return context;
};
