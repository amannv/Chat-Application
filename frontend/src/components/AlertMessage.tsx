import type { AlertMessageProps } from "../props/AlertMessageProps";

const AlertMessage = ({ message }: AlertMessageProps) => {
  return (
    <div className="text-center mx-auto font-jetbrains m-3 bg-neutral-200 border border-neutral-100 w-[40%] rounded-md ">
      {message}
    </div>
  );
};

export default AlertMessage;
