import React, { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  username: string;
  roomId: string;
  socket: WebSocket | null;
  setUser: (username: string, roomId: string) => void;
  connectSocket: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [username, setUsername] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("chat-user");
    const roomId = localStorage.getItem("chat-room");
    if (username && roomId) {
      setUsername(username);
      setRoomId(roomId);
    }
  }, []);

  const setUser = (username: string, roomId: string) => {
    setUsername(username);
    setRoomId(roomId);
    localStorage.setItem("chat-user", username);
    localStorage.setItem("chat-room", roomId);
  };

  const connectSocket = async () => {
    if (!socket) {
      const ws = new WebSocket("ws://localhost:8080");
      setSocket(ws);
    }
  };

  return (
    <UserContext.Provider
      value={{ username, roomId, setUser, socket, connectSocket }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx)
    throw new Error("useUser must be used inside the UserData provider");
  return ctx;
};
