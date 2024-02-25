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
  const { setNodeRef } = useDroppable({
    id: variant,
  });
  const applicants = useApplicantStore(selectApplicants(variant));

  const icon =
    variant === "SHORTLISTED" ? (
      <ShortListedContainerIcon />
    ) : variant === "REJECTED" ? (
      <RejectedContainerIcon />
    ) : (
      <AppliedContainerIcon />
    );

  const items = applicants.order.map((id) => applicants.data[id]);
  return (
    <div
      className={cn(
        `bg-white border rounded-lg ${bordersBackground[variant]}`,
        props.className
      )}
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
        id={variant as string}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef}>{props.children}</div>
      </SortableContext>
    </div>
  );
}
