import type { InputBoxProps } from "../props/InputBoxProps";
import { cn } from "../utils/utils";

const InputBox = ({ placeholder, ref, classname }: InputBoxProps) => {
  return (
    <div className="flex items-center">
      <input
        className={cn(
          "rounded-md text-center bg-neutral-900 text-white border border-neutral-800 font-jetbrains w-80 h-12",
          classname,
        )}
        placeholder={placeholder}
        ref={ref}
      />
    </div>
  );
};

export default InputBox;
