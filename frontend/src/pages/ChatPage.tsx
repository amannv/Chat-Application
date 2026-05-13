import AlertMessage from "../components/AlertMessage";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import SentMessage from "../components/SentMessage";
import ReceiveMessage from "../components/ReceiveMessage";
import { useUser } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

type MessageType =
  | {
      type: "join" | "leave";
      message: string;
    }
  | {
      type: "chat";
      username: string;
      message: string;
    };

const ChatPage = () => {
  const { username, roomId, socket, setUser, connectSocket } = useUser();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const messageInput = useRef<HTMLInputElement>(null);
  const hasJoined = useRef(false);

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
    if (!username || !roomId) return;

    if (hasJoined.current) return;

    let ws = socket;

    const PayloadMessage = JSON.stringify({
      type: "join",
      payload: {
        username: username,
        roomId: roomId,
      },
    });

    if (!ws) {
      ws = connectSocket();
    }

    if (ws?.readyState !== WebSocket.OPEN) {
      ws.onopen = () => {
        ws?.send(PayloadMessage);
        hasJoined.current = true;
      };
    } else {
      ws?.send(PayloadMessage);
      hasJoined.current = true;
    }
  }, [username, roomId, socket]);

  
    useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setMessages((prev) => [...prev, data]);
    };

    return () => {
      socket.onmessage = null;
    };
  }, [socket]);

  const sendMessage = () => {
    const message = messageInput.current?.value;

    if (!message?.trim()) return;

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.log("socket not connected yet!");
      return;
    }

    socket?.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: message,
        },
      }),
    );

    if (messageInput.current) {
      messageInput.current.value = "";
    }
  };

  const LeaveRoom = () => {
    socket?.close();
    localStorage.removeItem("chat-user");
    localStorage.removeItem("chat-room");
    setUser("", "");
    navigate("/");
  };

  return (
    <div className="h-screen max-w-[23vw] mx-auto flex justify-center items-center">
      <div className="bg-neutral-950 flex flex-col gap-3 items-center justify-center w-full h-[61vh] rounded border border-neutral-900 ">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex justify-between gap-15">
            <div className="text-white">Room: {roomId}</div>
            <Button
              onclick={LeaveRoom}
              placeholder={"Leave Room"}
              classname="w-23 h-8 text-xs"
            />
          </div>
          <div className="w-78 rounded border border-neutral-900 bg-black h-90 p-2">
            <div className="flex flex-col gap-2 justify-between w-full overflow-y-scroll">
              {messages.map((msg, index) => {
                if (msg.type == "join" || msg.type == "leave") {
                  return <AlertMessage key={index} message={msg.message} />;
                }
                if (msg.type == "chat") {
                  if (msg.username == username) {
                    return (
                      <SentMessage
                        key={index}
                        message={msg.message}
                        username={msg.username}
                      />
                    );
                  }

                  return (
                    <ReceiveMessage
                      key={index}
                      message={msg.message}
                      username={msg.username}
                    />
                  );
                }
              })}
            </div>
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
