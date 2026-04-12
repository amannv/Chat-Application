import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import BoxMessage from "../components/BoxMessage";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const wsRef = useRef<WebSocket>(null);
  const roomInput = useRef<HTMLInputElement>(null);
  const [roomCreatedId, setRoomCreatedId] = useState<number>();
  const usernameInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;
  }, []);

  const joinFunction = async () => {
    if (wsRef.current?.readyState !== 1) {
      return console.error("Websocket is not connected!");
    }
    const username = usernameInput.current?.value;
    const roomId = roomInput.current?.value;

    if (!username && !roomId) {
      return console.error("Username and RoomId is not given.");
    }

    wsRef.current?.send(
      JSON.stringify({
        type: "join",
        payload: {
          username: username,
          roomId: roomId,
        },
      }),
    );
    navigate("/chat");
  };

  const generateRoomNumber = () => {
    const min = 10000;
    const max = 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const createRoomId = async () => {
    const roomId = generateRoomNumber();
    setRoomCreatedId(roomId);
  };

  return (
    <div className="h-screen max-w-md mx-auto flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center p-4 rounded-md bg-neutral-950 border border-neutral-900 gap-2">
        <div className="text-l text-foreground mb-2 font-jetbrains font-semibold">
          Create your chat room
        </div>
        <InputBox
          ref={usernameInput}
          placeholder="Enter your username"
          classname="w-100"
        />
        <div className="flex justify-center items-center gap-2 max-w-100">
          <InputBox
            ref={roomInput}
            placeholder="Enter RoomId"
            classname="w-60"
          />
          <Button
            onclick={joinFunction}
            placeholder="Join room"
            classname="w-40"
          />
        </div>
        {roomCreatedId ? (
          <BoxMessage message={roomCreatedId} />
        ) : (
          <Button
            onclick={createRoomId}
            placeholder="Create new chat room"
            classname="w-100"
          />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
