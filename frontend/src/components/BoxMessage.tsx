import type { BoxMessageProps } from "../props/BoxMessageProps";
import { cn } from "../utils/utils";

const BoxMessage = ({ message }: BoxMessageProps) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center font-jetbrains w-100 h-24 bg-neutral-800 border border-neutral-700 text-white rounded-md cursor-pointer hover:bg-neutral-900",
      )}
    >
      <div className="flex flex-col justify-center items-center gap-1">
        <div className="font-jetbrains text-2xl font-bold">{message}</div>
        <div className="font-jetbrains text-sm">
           Join using this RoomId
        </div>
      </div>
    </div>
  );
};

export default BoxMessage;
