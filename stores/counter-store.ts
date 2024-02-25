import { Candidate, JobApplicationStatus } from "@/types/common.types";
import { createStore } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";
import { type UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

function filterApplicants(
  status: JobApplicationStatus,
  candidates: Candidate[]
) {
  return candidates.filter((i) => i.jobApplicationProgress.status === status);
}

// const rejectedCandidates = filterApplicants("REJECTED", candidates);
// const appliedCandidates = filterApplicants("APPLIED", candidates);
// const shortListedCandidates = filterApplicants("SHORTLISTED", candidates);

function getDataState(candidates: Candidate[]): ApplicantData {
  return candidates.reduce((acc: ApplicantData, candidate) => {
    acc[candidate.id] = candidate;

    return acc;
  }, {});
}

function getApplicantIds(candidates: Candidate[]) {
  return candidates.map((i) => i.id);
}

export type ApplicantData = {
  [key: string]: Candidate;
};

export type ApplicantStateValue = {
  order: string[];
  data: ApplicantData;
};

export type ApplicantsState = {
  panes: {
    [k in JobApplicationStatus]: ApplicantStateValue;
  };
  activeId: UniqueIdentifier;
};

export type ApplicantActions = {
  setApplicantsState: (candidates: Candidate[]) => void;
  setDragOverFn: (activeId: UniqueIdentifier, overId: UniqueIdentifier) => void;
  setDragEndFn: (activeId: UniqueIdentifier, overId: UniqueIdentifier) => void;
  setActiveIdFn: (id: UniqueIdentifier) => void;
};

export type ApplicantStore = ApplicantsState & ApplicantActions;

// export const initApplicantState = (): ApplicantsState => {
//   return {
//     activeId: "",
//     APPLIED: {
//       data: getDataState(appliedCandidates),
//       order: getApplicantIds(appliedCandidates),
//     },
//     SHORTLISTED: {
//       data: getDataState(shortListedCandidates),
//       order: getApplicantIds(shortListedCandidates),
//     },
//     REJECTED: {
//       data: getDataState(rejectedCandidates),
//       order: getApplicantIds(rejectedCandidates),
//     },
//     EXTERNAL: {
//       data: {},
//       order: [],
//     },
//   };
// };

const initialApplicantState: ApplicantsState = {
  panes: {
    APPLIED: {
      data: {},
      order: [],
    },
    SHORTLISTED: {
      data: {},
      order: [],
    },
    REJECTED: {
      data: {},
      order: [],
    },
    EXTERNAL: {
      data: {},
      order: [],
    },
  },
  activeId: "",
};

export const defaultInitState: ApplicantsState = initialApplicantState;

export const createCounterStore = (
  initState: ApplicantsState = defaultInitState
) => {
  return createStore<ApplicantStore>()(
    immer((set) => ({
      ...initState,
      setApplicantsState: (candidates) => {
        set((state) => {
          const panes = state.panes;
          const applied = filterApplicants("APPLIED", candidates);
          panes.APPLIED.data = getDataState(applied);
          panes.APPLIED.order = getApplicantIds(applied);

          const rejected = filterApplicants("REJECTED", candidates);
          panes.REJECTED.data = getDataState(rejected);
          panes.REJECTED.order = getApplicantIds(rejected);

          const shortlisted = filterApplicants("SHORTLISTED", candidates);
          panes.SHORTLISTED.data = getDataState(shortlisted);
          panes.SHORTLISTED.order = getApplicantIds(shortlisted);

          const external = filterApplicants("EXTERNAL", candidates);
          panes.EXTERNAL.data = getDataState(external);
          panes.EXTERNAL.order = getApplicantIds(external);
        });
      },
      setDragOverFn: (activeId, overId) => {
        set((state) => {
          const activeIdAsString = String(activeId);
          const overIdAsString = String(overId);
          const panes = state.panes;
          const activeContainer = Object.keys(panes).find((i) =>
            panes[i as JobApplicationStatus].order.includes(activeIdAsString)
          ) as JobApplicationStatus;
          const overContainer = Object.keys(panes).find((i) =>
            panes[i as JobApplicationStatus].order.includes(overIdAsString)
          ) as JobApplicationStatus;
          console.log({ activeContainer, overContainer });
          if (
            activeContainer &&
            overContainer &&
            activeContainer !== overContainer
          ) {
            const activeContainerValues = panes[activeContainer];
            const overContainerValues = panes[overContainer];
            const activeIndex = panes[activeContainer].order.findIndex(
              (i) => i === activeIdAsString
            );
            const overIndex = panes[overContainer].order.findIndex(
              (i) => i === overIdAsString
            );
            const removedItemIndex = panes[activeContainer].order.splice(
              activeIndex,
              1
            )[0];
            const removedItem = activeContainerValues.data[removedItemIndex];
            // updating status progress
            removedItem.jobApplicationProgress.status = overContainer;
            // remove item from source pane
            delete activeContainerValues.data[removedItemIndex];
            // adding applicant to destination pane at the same index as it started
            panes[overContainer].order.splice(overIndex, 0, removedItemIndex);
            // adding it to data
            overContainerValues.data[removedItem.id] = removedItem;
          }
        });
      },
      setDragEndFn: (activeId, overId) => {
        set((state) => {
          const activeIdAsString = String(activeId);
          const overIdAsString = String(overId);
          const panes = state.panes;
          const activeContainer = Object.keys(panes).find((i) =>
            panes[i as JobApplicationStatus].order.includes(activeIdAsString)
          ) as JobApplicationStatus;
          const overContainer = Object.keys(panes).find((i) =>
            panes[i as JobApplicationStatus].order.includes(overIdAsString)
          ) as JobApplicationStatus;

          if (
            activeContainer &&
            overContainer &&
            activeContainer === overContainer
          ) {
            const activeIndex = panes[activeContainer].order.findIndex(
              (i) => i === activeIdAsString
            );
            const overIndex = panes[overContainer].order.findIndex(
              (i) => i === overIdAsString
            );

            if (activeIndex !== overIndex) {
              panes[overContainer].order = arrayMove(
                panes[overContainer].order,
                activeIndex,
                overIndex
              );
            }
          }
        });
      },
      setActiveIdFn(id: UniqueIdentifier) {
        set((state) => {
          state.activeId = id;
        });
      },
    }))
  );
};

export const selectRejectedApplicants = (state: ApplicantStore) =>
  state.panes.REJECTED;

export const selectShortlistedApplicants = (state: ApplicantStore) =>
  state.panes.SHORTLISTED;

export const selectAppliedApplicants = (state: ApplicantStore) =>
  state.panes.APPLIED;

export const selectExternalApplicants = (state: ApplicantStore) =>
  state.panes.EXTERNAL;

export const setApplicantsToStore = (state: ApplicantStore) =>
  state.setApplicantsState;

export const selectApplicants =
  (status: JobApplicationStatus) => (state: ApplicantStore) =>
    state.panes[status];

export const selectActiveId = (state: ApplicantStore) => state.activeId;

export const setDragOverFn = (state: ApplicantStore) => state.setDragOverFn;

export const setDragEndFn = (state: ApplicantStore) => state.setDragEndFn;

export const setActiveIdFn = (state: ApplicantStore) => state.setActiveIdFn;

export const selectApplicantWithId =
  (id: string) => (state: ApplicantsState) => {
    const panes = state.panes;
    const status = Object.keys(panes).find((i) =>
      panes[i as JobApplicationStatus].order.includes(id)
    ) as JobApplicationStatus;
  };
