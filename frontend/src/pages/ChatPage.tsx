import Button from "../components/Button";
import InputBox from "../components/InputBox";

const ChatPage = () => {
  return (
    <div className="h-screen max-w-md mx-auto flex justify-center items-center">
      <div className="bg-neutral-950 w-full h-8/12 rounded-md border border-neutral-900 p-8">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="w-100 rounded-md border border-neutral-900 bg-black h-90"></div>
          <div className="flex justify-center items-center gap-2 max-w-100">
            <InputBox placeholder="Enter your message." classname="w-70" />
            <Button placeholder="Send" classname="w-30" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
