import { create } from "zustand";

import createAuthSlice, { CreateAuthSliceType } from "./auth";

// Note: this introduces a circular dependency.
export type StoreType = CreateAuthSliceType;

const useStore = create<StoreType>()((...a) => ({
  ...createAuthSlice(...a),
}));

export default useStore;
