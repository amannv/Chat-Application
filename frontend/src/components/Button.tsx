import type { ButtonProps } from "../props/ButtonProps";
import { cn } from "../utils/utils";

const Button = ({ onclick, placeholder, classname }: ButtonProps) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center font-jetbrains w-80 h-10 bg-neutral-700 border border-neutral-500 text-white rounded-sm cursor-pointer hover:bg-neutral-900 text-sm",
        classname,
      )}
    >
      <button className="cursor-pointer" onClick={onclick}>
        {placeholder}
      </button>
    </div>
  );
};

export default Button;
