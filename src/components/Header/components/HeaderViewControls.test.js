import { render, screen, fireEvent } from "@testing-library/react";
import { HeaderViewControls } from "./HeaderViewControls";
import { useBoundStore } from "@/store";
import { SORT_VARIANTS } from "@/global/const/sortVariants";

jest.mock("@/store", () => ({
  useBoundStore: jest.fn(),
}));

describe("HeaderViewControls", () => {
  const mockSetSortBy = jest.fn();
  const mockToggleHideCompleted = jest.fn();

  beforeEach(() => {
    useBoundStore.mockReturnValue({
      setSortBy: mockSetSortBy,
      toggleHideCompleted: mockToggleHideCompleted,
      viewSettings: { hideCompleted: false, sortBy: SORT_VARIANTS.NAME },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders HeaderViewControls correctly", () => {
    render(<HeaderViewControls />);

    expect(screen.getByText("Hide Completed")).toBeInTheDocument();
    expect(screen.getByText("Sort by")).toBeInTheDocument();
  });

  test("calls setSortBy on sort select change", () => {
    render(<HeaderViewControls />);

    fireEvent.change(screen.getByTestId("haeder-view-controls-select"), {
      target: { value: SORT_VARIANTS.PRIORITY },
    });

    expect(mockSetSortBy).toHaveBeenCalledWith(SORT_VARIANTS.PRIORITY);
  });

  test("calls toggleHideCompleted on hide completed checkbox change", () => {
    render(<HeaderViewControls />);

    fireEvent.click(screen.getByLabelText(/Hide Completed/i));

    expect(mockToggleHideCompleted).toHaveBeenCalledTimes(1);
  });
});
