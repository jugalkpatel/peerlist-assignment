import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import {
  type ApplicantStore,
  createCounterStore,
} from "@/stores/counter-store";

export const ApplicantStoreContext =
  createContext<StoreApi<ApplicantStore> | null>(null);

export interface ApplicantStoreProviderProps {
  children: ReactNode;
}

export const CounterStoreProvider = ({
  children,
}: ApplicantStoreProviderProps) => {
  const storeRef = useRef<StoreApi<ApplicantStore>>();
  if (!storeRef.current) {
    storeRef.current = createCounterStore();
  }

  return (
    <ApplicantStoreContext.Provider value={storeRef.current}>
      {children}
    </ApplicantStoreContext.Provider>
  );
};

export const useApplicantStore = <T,>(
  selector: (store: ApplicantStore) => T
): T => {
  const applicantStoreContext = useContext(ApplicantStoreContext);

  if (!applicantStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`);
  }

  return useStore(applicantStoreContext, selector);
};
