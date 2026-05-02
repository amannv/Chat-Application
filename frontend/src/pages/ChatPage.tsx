import AlertMessage from "../components/AlertMessage";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import SentMessage from "../components/SentMessage";
import ReceiveMessage from "../components/ReceiveMessage";
import { useUser } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ChatPage = () => {
  const { username, roomId, socket, setUser, connectSocket } = useUser();
  const navigate = useNavigate();

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
    if(socket?.readyState !== 1) {
    connectSocket();
    }
  socket?.send(JSON.stringify({
      type: "join",
      payload: {
        username: username,
        roomId: roomId,
      }
    }));
  }, []);

  return (
    <div className="h-screen max-w-[23vw] mx-auto flex justify-center items-center">
      <div className="bg-neutral-950 flex flex-col gap-3 items-center justify-center w-full h-[61vh] rounded border border-neutral-900 ">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="w-78 rounded border border-neutral-900 bg-black h-90 p-2">
            <div className="flex flex-col gap-2 justify-between w-full">
              <AlertMessage message="Aman Joined" />
              <SentMessage
                message="Hey there! How are you doing!"
                username="Aman"
              />
              <AlertMessage message="Ankit Joined" />
              <ReceiveMessage
                message="I am Fine! What About You!"
                username="Ankit"
              />
              <ReceiveMessage
                message="I am Fine! What About You!"
                username="Ankit"
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 max-w-78">
            <InputBox placeholder="Enter your message." classname="w-60" />
            <Button placeholder="Send" classname="w-18" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
