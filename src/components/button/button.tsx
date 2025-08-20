import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"button">;

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        `w-full
        rounded-md
        font-normal
        bg-gray-100
        text-black
        border
        cursor-pointer
        border-gray-200`
      )}
      {...props}
    >
      {children}
    </button>
  );
};
