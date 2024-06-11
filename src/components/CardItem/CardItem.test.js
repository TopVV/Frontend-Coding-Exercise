import { render, screen, fireEvent } from "@testing-library/react";
import { CardItem } from "./CardItem";
import { useStore } from "@/store";

jest.mock("@chakra-ui/icons", () => ({
  MinusIcon: () => <div data-testid="MinusIcon" />,
  TriangleDownIcon: () => <div data-testid="TriangleDownIcon" />,
  TriangleUpIcon: () => <div data-testid="TriangleUpIcon" />,
  DeleteIcon: () => <div data-testid="DeleteIcon" />,
  CheckIcon: () => <div data-testid="CheckIcon" />,
}));

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  Card: ({ children }) => <div data-testid="Card">{children}</div>,
  CardHeader: ({ children }) => <div data-testid="CardHeader">{children}</div>,
  Heading: ({ children, sx }) => (
    <div data-testid="Heading" style={{ ...sx }}>
      {children}
    </div>
  ),
  CardBody: ({ children }) => <div data-testid="CardBody">{children}</div>,
  Center: ({ children }) => <div data-testid="Center">{children}</div>,
  CardFooter: ({ children }) => <div data-testid="CardFooter">{children}</div>,
  IconButton: ({
    onClick,
    icon,
    "aria-label": ariaLabel,
    "data-testid": testId,
  }) => (
    <button onClick={onClick} aria-label={ariaLabel} data-testid={testId}>
      {icon}
    </button>
  ),
  Text: ({ children, "data-testid": testId }) => (
    <div data-testid={testId}>{children}</div>
  ),
}));

jest.mock("@/store", () => ({
  useStore: jest.fn(),
}));

describe("CardItem", () => {
  const mockToggleCompleted = jest.fn();
  const mockDeleteElement = jest.fn();

  beforeEach(() => {
    useStore.mockImplementation(() => ({
      toggleCompleted: mockToggleCompleted,
      deleteElement: mockDeleteElement,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders card item correctly", () => {
    render(
      <CardItem
        title="Test Title"
        severity={1}
        id={1}
        description="Test Description"
        completed={false}
      />,
    );

    expect(screen.getByTestId("Heading")).toBeInTheDocument();
    expect(screen.getByTestId("CardBody")).toBeInTheDocument();
    expect(screen.getByTestId("CardFooter")).toBeInTheDocument();
  });

  test("calls toggleCompleted on check button click", () => {
    render(
      <CardItem
        title="Test Title"
        severity={1}
        id={1}
        description="Test Description"
        completed={false}
      />,
    );

    fireEvent.click(screen.getByTestId("toggleCompleteButton"));

    expect(mockToggleCompleted).toHaveBeenCalledTimes(1);
    expect(mockToggleCompleted).toHaveBeenCalledWith(1);
  });

  test("calls deleteElement on delete button click", () => {
    render(
      <CardItem
        title="Test Title"
        severity={1}
        id={1}
        description="Test Description"
        completed={false}
      />,
    );

    fireEvent.click(screen.getByTestId("DeleteIcon"));

    expect(mockDeleteElement).toHaveBeenCalledTimes(1);
    expect(mockDeleteElement).toHaveBeenCalledWith(1);
  });

  test.each`
    severity | expectedIcon          | expectedTestId
    ${0}     | ${"TriangleDownIcon"} | ${"TriangleDownIcon"}
    ${1}     | ${"MinusIcon"}        | ${"MinusIcon"}
    ${2}     | ${"TriangleUpIcon"}   | ${"TriangleUpIcon"}
  `(
    "renders correct icon for severity $severity",
    ({ severity, expectedTestId }) => {
      render(
        <CardItem
          title="Test Title"
          severity={severity}
          id={1}
          description="Test Description"
          completed={false}
        />,
      );

      const iconElement = screen.getByTestId(expectedTestId);
      expect(iconElement).toBeInTheDocument();
    },
  );
});
