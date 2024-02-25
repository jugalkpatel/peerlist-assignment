import { JobApplicationStatus } from "@/types/common.types";
import { cn } from "@/utils/utils";
import { HTMLAttributes } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  AppliedContainerIcon,
  RejectedContainerIcon,
  ShortListedContainerIcon,
} from "@/helpers/Svgs";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useApplicantStore } from "@/stores/counter-store-provider";
import { selectApplicants } from "@/stores/counter-store";
import Card from "./Card";

type PaneVariants = Exclude<JobApplicationStatus, "EXTERNAL">;

type PaneProps = HTMLAttributes<HTMLDivElement> & {
  variant: PaneVariants;
  count: number;
};

const variantsBackground: Record<PaneVariants, string> = {
  REJECTED: "bg-rejectedBackground",
  APPLIED: "bg-appliedBackground",
  SHORTLISTED: "bg-shortlistedBackground",
};

const bordersBackground: Record<PaneVariants, string> = {
  REJECTED: "border-rejectedBackground",
  APPLIED: "border-appliedBackground",
  SHORTLISTED: "border-shortlistedBackground",
};

const variantsTextColor: Record<PaneVariants, string> = {
  REJECTED: "text-error",
  APPLIED: "text-txt-primary",
  SHORTLISTED: "text-success",
};

const statusToLabelMapping: Record<PaneVariants, string> = {
  APPLIED: "APPLIED",
  REJECTED: "REJECTED",
  SHORTLISTED: "SHORTLISTED",
};

export function Pane({ variant, count, ...props }: PaneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: variant,
  });
  const applicants = useApplicantStore(selectApplicants(variant));

  const style = {
    color: isOver ? "green" : undefined,
  };

  const icon =
    variant === "SHORTLISTED" ? (
      <ShortListedContainerIcon />
    ) : variant === "REJECTED" ? (
      <RejectedContainerIcon />
    ) : (
      <AppliedContainerIcon />
    );

  const items = applicants.order.map((id) => applicants.data[id]);
  // console.log({ items });
  return (
    <div
      className={cn(
        `bg-white border rounded-lg ${bordersBackground[variant]}`,
        props.className
      )}
      style={style}
    >
      <div
        className={`flex items-center rounded-t-lg p-2 gap-2 ${variantsBackground[variant]}`}
      >
        {icon}
        <p className={`text-xs font-semibold ${variantsTextColor[variant]}`}>
          {statusToLabelMapping[variant]} • {count}
        </p>
      </div>
      <SortableContext
        id={variant}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div
          className="p-2 flex flex-col gap-2 h-full"
          ref={setNodeRef}
          style={style}
        >
          {items.map((i) => {
            return (
              <Card
                key={i.id}
                variant={i.jobApplicationProgress.status}
                {...i}
              />
            );
          })}
        </div>
      </SortableContext>
    </div>
  );
}
