import AlertMessage from "../components/AlertMessage";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import SentMessage from "../components/SentMessage";
import ReceiveMessage from "../components/ReceiveMessage";

const ChatPage = () => {
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
