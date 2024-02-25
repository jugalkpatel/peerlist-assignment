import { cn } from "@/utils/utils";
import { HTMLAttributes } from "react";

export function CardsContainer(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="something"
      {...props}
      className={cn("p-2 flex flex-col gap-2 h-full", props.className)}
    >
      {props.children}
    </div>
  );
}
