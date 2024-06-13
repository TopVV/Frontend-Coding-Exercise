export const createElementsSlice = (set) => ({
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

});
