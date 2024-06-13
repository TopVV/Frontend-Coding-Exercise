import { render, screen, fireEvent } from "@testing-library/react";
import { CardItem } from "./CardItem";
import { useBoundStore } from "@/store";

jest.mock("@/store", () => ({
  useBoundStore: jest.fn(),
}));

const testCardData = {
  title: "Test Title",
  severity: 1,
  id: 1,
  description: "Test Description",
  completed: false,
};

describe("CardItem", () => {
  const mockToggleCompleted = jest.fn();
  const mockDeleteElement = jest.fn();

  beforeEach(() => {
    useBoundStore.mockImplementation(() => ({
      toggleCompleted: mockToggleCompleted,
      deleteElement: mockDeleteElement,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders card item correctly", () => {
    render(<CardItem {...testCardData} />);

    expect(screen.getByText(testCardData.title)).toBeInTheDocument();
    expect(screen.getByText(testCardData.description)).toBeInTheDocument();
  });

  test("calls toggleCompleted on check button click", () => {
    render(<CardItem {...testCardData} />);

    fireEvent.click(screen.getByTestId("toggleCompleteButton"));

    expect(mockToggleCompleted).toHaveBeenCalledTimes(1);
    expect(mockToggleCompleted).toHaveBeenCalledWith(1);
  });

  test("calls deleteElement on delete button click", () => {
    render(<CardItem {...testCardData} />);

    fireEvent.click(screen.getByTestId("deleteButton"));

    expect(mockDeleteElement).toHaveBeenCalledTimes(1);
    expect(mockDeleteElement).toHaveBeenCalledWith(1);
  });
});
