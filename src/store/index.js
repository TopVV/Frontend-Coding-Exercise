import { create } from "zustand";
import { defaultTodos } from "../../mocks/data/defaultTodos";

const useStore = create((set) => ({
  user: null,
  login: (username) =>
    set({ user: username, elements: defaultTodos[username] }),
  logout: () => set({ user: null }),
  elements: [],
  addElement: (element) =>
    set((state) => ({
      elements: [...state.elements, element],
    })),
  toggleCompleted: (id) =>
    set((state) => ({
      elements: state.elements.map((element) =>
        element.id === id
          ? {
              ...element,
              completed: !element.completed,
            }
          : element,
      ),
    })),
  deleteElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((element) => element.id !== id),
    })),
  viewSettings: {
    sortBy: "default",
    hideCompleted: true,
  },
  setSortBy: (sortBy) =>
    set((state) => ({
      viewSettings: {
        ...state.viewSettings,
        sortBy,
      },
    })),
  toggleHideCompleted: () =>
    set((state) => ({
      viewSettings: {
        ...state.viewSettings,
        hideCompleted: !state.viewSettings.hideCompleted,
      },
    })),
}));

export { useStore };
