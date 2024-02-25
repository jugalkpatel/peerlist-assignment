import { Inter } from "next/font/google";
import { candidates as candidatesData } from "@/utils/mock.utils";
import { HTMLAttributes, useEffect } from "react";
import Card from "@/components/Card";
import { Pane } from "@/components/Pane";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  closestCorners,
  DragOverlay,
  useDroppable,
  closestCenter,
} from "@dnd-kit/core";
import {
  selectActiveId,
  selectApplicantWithId,
  selectAppliedApplicants,
  selectRejectedApplicants,
  selectShortlistedApplicants,
  setActiveIdFn,
  setApplicantsToStore,
  setDragEndFn,
  setDragOverFn,
} from "@/stores/counter-store";
import {
  CounterStoreProvider,
  useApplicantStore,
} from "@/stores/counter-store-provider";
import { cn } from "@/utils/utils";
import { JobApplicationStatus } from "@/types/common.types";

const inter = Inter({ subsets: ["latin"] });

export function CardsContainer(props: HTMLAttributes<HTMLDivElement>) {
  // const { isOver, setNodeRef } = useDroppable({
  //   id: props.variant,
  // });
  return (
    <div
      id="something"
      {...props}
      className={cn("p-2 flex flex-col gap-2 h-full", props.className)}
      // ref={setNodeRef}
    >
      {props.children}
    </div>
  );
}

function RejectedPane() {
  const rejected = useApplicantStore(selectRejectedApplicants);
  return (
    <Pane variant="REJECTED" count={rejected.order.length}>
      {rejected.order.map((i) => {
        const props = rejected.data[i];
        return (
          <Card
            key={props.id}
            variant={props.jobApplicationProgress.status}
            {...props}
          />
        );
      })}
    </Pane>
  );
}

function AppliedPane() {
  const applied = useApplicantStore(selectAppliedApplicants);

  return (
    <Pane variant="APPLIED" count={applied.order.length}>
      {applied.order.map((i) => {
        const props = applied.data[i];
        return (
          <Card
            key={props.id}
            variant={props.jobApplicationProgress.status}
            {...props}
          />
        );
      })}
    </Pane>
  );
}

function ShortlistedPane() {
  const shortlisted = useApplicantStore(selectShortlistedApplicants);

  return (
    <Pane variant="SHORTLISTED" count={shortlisted.order.length}>
      {shortlisted.order.map((i) => {
        const props = shortlisted.data[i];
        return (
          <Card
            key={props.id}
            variant={props.jobApplicationProgress.status}
            {...props}
          />
        );
      })}
    </Pane>
  );
}

// function OverlayCard() {
//   const activeId = useApplicantStore(selectActiveId);
//   const applicant = useApplicantStore(selectApplicantWithId(String(activeId)));

//   return (
//     <Card variant={applicant.jobApplicationProgress.status} {...applicant} />
//   );
// }

export function ApplicantDashboard() {
  const setApplicants = useApplicantStore(setApplicantsToStore);
  const setDragOver = useApplicantStore(setDragOverFn);
  const setDragEnd = useApplicantStore(setDragEndFn);
  const setActiveId = useApplicantStore(setActiveIdFn);
  const activeId = useApplicantStore(selectActiveId);

  useEffect(() => {
    setApplicants(candidatesData);
  }, []);

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    console.log({ active, over });
    const { id: activeId } = active;
    const overId = over?.id || null;
    // console.log({ activeId, overId });

    if (!overId) {
      return;
    }

    setDragOver(activeId, overId);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    console.log("end", { active, over });
    const { id: activeId } = active;
    const overId = over?.id || null;

    if (!overId) {
      return;
    }

    setDragEnd(activeId, overId);
  };

  const handleDragStart = (e: DragStartEvent) => {
    const value = e.active.id;
    setActiveId(value);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      collisionDetection={closestCenter}
    >
      <div className="bg-white h-vh grid grid-cols-3 gap-4 m-8">
        <RejectedPane />
        <AppliedPane />
        <ShortlistedPane />
      </div>{" "}
      {/* <DragOverlay>{activeId ? <OverlayCard /> : null}</DragOverlay> */}
    </DndContext>
  );
}

export default function Home() {
  return (
    <CounterStoreProvider>
      <ApplicantDashboard />
    </CounterStoreProvider>
  );
}
