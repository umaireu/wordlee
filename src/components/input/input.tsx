import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"input">;

export const Input = ({ className, ...props }: Props) => {
  return (
    <input
      className={twMerge(
        `w-[50px] 
        h-[50px] 
        border-2 
        border-[#3A3A3C] 
        background-transparent 
        rounded-sm 
        text-white 
        py-2 
        font-bold
        text-4xl
        text-center
        uppercase
        ${className}`
      )}
      maxLength={1}
      {...props}
    />
  );
};
