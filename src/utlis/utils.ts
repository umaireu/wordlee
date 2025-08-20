import { REGES } from "./constants";

export const logDetails = (message: unknown) => {
  console.log(message);
};

export const isChar = (value: string) => REGES.CHAR_ONLY.test(value);
