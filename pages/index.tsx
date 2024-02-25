import { Inter } from "next/font/google";
import { candidates as candidatesData } from "@/utils/mock.utils";
import { useEffect } from "react";
import Card from "@/components/Card";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
  closestCenter,
} from "@dnd-kit/core";
import {
  selectActiveId,
  selectApplicantWithId,
  setActiveIdFn,
  setApplicantsToStore,
  setDragEndFn,
  setDragOverFn,
} from "@/stores/counter-store";
import {
  CounterStoreProvider,
  useApplicantStore,
} from "@/stores/counter-store-provider";
import { Search } from "@/components/Search";
import { RejectedPane } from "@/components/RejectedPane";
import { AppliedPane } from "@/components/AppliedPane";
import { ShortlistedPane } from "@/components/ShortlistedPane";

function OverlayCard() {
  const activeId = useApplicantStore(selectActiveId);
  const applicant = useApplicantStore(selectApplicantWithId(String(activeId)));

  return (
    <Card variant={applicant.jobApplicationProgress.status} {...applicant} />
  );
}

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
    console.log("over", { active, over });
    const { id: activeId } = active;
    const overId = over?.id || null;

    if (!overId) {
      return;
    }

    setDragOver(activeId, overId);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
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
      <div className="m-8 flex flex-col gap-4">
        <Search />
        <div className="bg-white h-vh grid grid-cols-3 gap-4">
          <RejectedPane />
          <AppliedPane />
          <ShortlistedPane />
        </div>{" "}
      </div>
      <DragOverlay>{activeId ? <OverlayCard /> : null}</DragOverlay>
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
