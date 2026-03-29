import Button from "../components/Button";
import InputBox from "../components/InputBox";

const LandingPage = () => {
  return (
    <div className="h-screen max-w-md mx-auto flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center p-4 rounded-md bg-neutral-950 border border-neutral-900 gap-2">
        <div className="text-l text-foreground mb-2 font-jetbrains font-semibold">Create your chat room</div>
        <InputBox placeholder="Enter your username" classname="w-100" />
        <div className="flex justify-center items-center gap-2 max-w-100">
          <InputBox placeholder="Enter RoomId" classname="w-60"/>
        <Button placeholder="Join room" classname="w-40"/>
        </div>
        <Button placeholder="Create chat room" classname="w-100" />
      </div>
    </div>
  );
};

export default LandingPage;
