export const createViewSettingsSlice = (set) => ({
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
});
