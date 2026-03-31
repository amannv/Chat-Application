import type { ButtonProps } from "../props/ButtonProps";
import { cn } from "../utils/utils";

const Button = ({ onclick, placeholder, classname }: ButtonProps) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center font-jetbrains w-80 h-12 bg-neutral-800 border border-neutral-700 text-white rounded-md cursor-pointer hover:bg-neutral-900",
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
