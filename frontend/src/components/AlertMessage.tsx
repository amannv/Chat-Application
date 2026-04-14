import type { AlertMessageProps } from "../props/AlertMessageProps";

const AlertMessage = ({ message }: AlertMessageProps) => {
  return (
    <div className="text-xs text-center mx-auto font-jetbrains w-[30%] text-white">
      {message}
    </div>
  );
};

export default AlertMessage;
