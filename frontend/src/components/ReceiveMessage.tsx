import type { MessageProps } from "../props/MessageProps";
import { cn } from "../utils/utils";

const ReceiveMessage = ({ message, username, className }: MessageProps) => {
  return (
    <div className={cn("flex flex-col items-end gap-1", className)}>
      <div className="flex items-center justify-center border border-neutral-800 bg-neutral-900 text-neutral-200 rounded-md p-2 h-8 ">
        {message}
      </div>
      <div className="flex justify-center items-center bg-neutral-200 text-neutral-900 text-md rounded-md p-2 h-6">
        {username}
      </div>
    </div>
  );
};

export default ReceiveMessage;
