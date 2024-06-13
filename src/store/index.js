import { create } from "zustand";
import { createElementsSlice } from "@/store/elementsSlice";
import { createLoginSlice } from "@/store/loginSlice";
import { createViewSettingsSlice } from "@/store/viewSettingsSlice";

export const useBoundStore = create((...a) => ({
  ...createElementsSlice(...a),
  ...createLoginSlice(...a),
  ...createViewSettingsSlice(...a),
}));
