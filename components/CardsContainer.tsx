import { cn } from "@/utils/utils";
import { HTMLAttributes } from "react";

export function CardsContainer(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "p-2 flex flex-col gap-2 h-full bg-primaryBackground lg:min-h-[calc(100vh-280px)]",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
