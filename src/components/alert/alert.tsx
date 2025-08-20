import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "../button/button";
import { twMerge } from "tailwind-merge";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useMemo } from "react";

type AlertProps = {
  title: string;
  message: string;
  type: "success" | "error";
  onClick: () => void;
  className?: string;
};

export const Alert = ({
  title,
  message,
  type,
  onClick,
  className,
}: AlertProps) => {
  const getIcon = useMemo(() => {
    if (type === "success") {
      return <CheckCircleIcon className="text-green-700 w-16 h-16" />;
    }
    return <XMarkIcon className="text-red-500 w-16 h-16" />;
  }, [type]);

  return (
    <div
      className={twMerge(
        "bg-[#3F3A3A99]",
        "flex",
        "w-full",
        "flex-col",
        "items-center",
        "justify-center",
        "gap-2",
        "text-white",
        "p-4",
        "rounded-md",
        "shadow-md",
        className
      )}
      role="alert"
    >
      {getIcon}
      <strong className="font-bold">{title}</strong>
      <p>{message}</p>
      <Button onClick={onClick}>Try again</Button>
    </div>
  );
};
