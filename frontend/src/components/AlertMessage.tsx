import type { AlertMessageProps } from "../props/AlertMessageProps";

const AlertMessage = ({ message }: AlertMessageProps) => {
  return (
    <div className="text-xs text-center mx-auto font-jetbrains bg-neutral-200 border border-neutral-100 w-[30%] rounded-md">
      {message}
    </div>
  );
};

export default AlertMessage;
