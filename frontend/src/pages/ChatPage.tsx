import AlertMessage from "../components/AlertMessage";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import SentMessage from "../components/SentMessage";
import ReceiveMessage from "../components/ReceiveMessage";
import { useUser } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

type MessageType = {
  type: "join" | "leave" | "chat";
  username?: string;
  message: string;
};

const ChatPage = () => {
  const { username, roomId, socket, setUser, connectSocket } = useUser();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const messageInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!username || !roomId) {
      const localUsername = localStorage.getItem("chat-user");
      const localRoomId = localStorage.getItem("chat-room");
      if (localUsername && localRoomId) {
        setUser(localUsername, localRoomId);
      } else {
        navigate("/");
      }
    }
  }, [username, roomId]);

  useEffect(() => {
    let ws = socket;

    if (!ws || ws?.readyState !== 1) {
      ws = connectSocket();
    }

    ws.onopen = () => {
      ws?.send(
        JSON.stringify({
          type: "join",
          payload: {
            username: username,
            roomId: roomId,
          },
        }),
      );
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setMessages((prev) => [...prev, data]);
    };

    return () => {
      socket.onmessage = null;
    };
  });

  const sendMessage = () => {
    const message = messageInput.current?.value;

    if (!message?.trim()) return;

    socket?.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: message,
        },
      }),
    );
  };

  return (
    <div className="h-screen max-w-[23vw] mx-auto flex justify-center items-center">
      <div className="bg-neutral-950 flex flex-col gap-3 items-center justify-center w-full h-[61vh] rounded border border-neutral-900 ">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="w-78 rounded border border-neutral-900 bg-black h-90 p-2">
            <div className="flex flex-col gap-2 justify-between w-full"></div>
          </div>
          <div className="flex justify-center items-center gap-2 max-w-78">
            <InputBox
              ref={messageInput}
              placeholder="Enter your message."
              classname="w-60"
            />
            <Button onclick={sendMessage} placeholder="Send" classname="w-18" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
