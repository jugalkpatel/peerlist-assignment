import { clsx, type ClassValue } from "clsx";
import { twMerge, extendTailwindMerge } from "tailwind-merge";

//https://github.com/dcastil/tailwind-merge/issues/297
const customTailwindMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": ["text-xxs"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTailwindMerge(clsx(inputs));
}
