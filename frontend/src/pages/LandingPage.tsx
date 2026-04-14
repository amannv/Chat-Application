import { useEffect, useRef } from "react";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const wsRef = useRef<WebSocket>(null);
  const roomInput = useRef<HTMLInputElement>(null);
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

  return (
    <div className="h-screen max-w-[23vw] mx-auto flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center p-4 rounded-sm bg-neutral-950 border border-neutral-900 gap-2">
        <div className="text-l text-foreground mb-2 font-jetbrains font-semibold">
          Create your chat room
        </div>
        <InputBox
          ref={usernameInput}
          placeholder="Enter your name"
          classname="w-80"
        />
        <InputBox
          ref={roomInput}
          placeholder="Any name for RoomId"
          classname="w-80"
        />
        <Button
          onclick={joinFunction}
          placeholder="Join room"
          classname="w-80"
        />
      </div>
    </div>
  );
};

export default LandingPage;
