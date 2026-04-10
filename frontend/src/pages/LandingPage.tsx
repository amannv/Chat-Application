import { useEffect, useRef } from "react";
import Button from "../components/Button";
import InputBox from "../components/InputBox";

const LandingPage = () => {
  const wsRef = useRef<WebSocket>(null);
  const roomInput = useRef<HTMLInputElement>(null);
  const usernameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, []);

  const joinFunction = async () => {
    const username = usernameInput.current?.value;
    const roomId = roomInput.current?.value;

    wsRef.current?.send(JSON.stringify({
          type: "join",
          payload: {
            username: username,
            roomId: roomId,
          },
        }),
      );

      return roomId;
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
          <Button onclick={joinFunction} placeholder="Join room" classname="w-40" />
        </div>
        <Button placeholder="Create chat room" classname="w-100" />
      </div>
    </div>
  );
};

export default LandingPage;
