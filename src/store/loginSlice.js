// export const createFishSlice = (set) => ({
//   fishes: 0,
//   addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
// })
import { defaultTodos } from "../../mocks/data/defaultTodos";

export const createLoginSlice = (set) => ({
  user: null,
  login: (username) =>
    set({ user: username, elements: defaultTodos[username] }),
  logout: () => set({ user: null }),
});
