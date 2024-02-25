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
} from "@/stores/applicant-store";
import {
  CounterStoreProvider,
  useApplicantStore,
} from "@/stores/applicants-store-provider";
import { Search } from "@/components/Search";
import { RejectedPane } from "@/components/RejectedPane";
import { AppliedPane } from "@/components/AppliedPane";
import { ShortlistedPane } from "@/components/ShortlistedPane";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

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
      <div className="grid grid-rows-1 grid-cols-1 h-screen relative lg:grid-cols-[minmax(100px,_212px),_1fr]">
        <Sidebar />
        <div className="overflow-auto">
          <div className="sticky top-[60px] lg:top-0 z-10">
            <Header />
            <Search />
          </div>
          <div className="bg-white grid grid-auto-rows grid-cols-1 sm:grid-cols-3 sm:grid-rows-1 gap-4 p-4 pt-16 lg:pt-0">
            <RejectedPane />
            <AppliedPane />
            <ShortlistedPane />
          </div>
        </div>
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
