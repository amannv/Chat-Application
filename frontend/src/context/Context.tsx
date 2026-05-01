import React, { createContext, useRef, useState } from "react";

type userContextType = {
  username: string | undefined;
  roomId: string | undefined;
  socket: WebSocket | null;
  setUser: (username: string | undefined, roomId: string | undefined) => void;
  connectSocket: () => void;
};

export const userContext = createContext<userContextType | undefined>(
  undefined,
);

export const UserData = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | undefined>();
  const [roomId, setRoomId] = useState<string | undefined>();
  const socket = useRef<WebSocket | null>(null);

  const setUser = (
    username: string,
    roomId: string,
  ) => {
    if(!username && !roomId) return null;
    setUsername(username);
    setRoomId(roomId);
  };

  const connectSocket = () => {
    if (socket.current == undefined) {
    const ws = new WebSocket("ws://localhost:3000");
    socket.current = ws;
    } else {
        return null;
    }
  };

  return (
    <userContext.Provider
      value={{ username, roomId, setUser, socket.current, connectSocket }}
    >
      {children}
    </userContext.Provider>
  );
};
