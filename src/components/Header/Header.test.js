import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "./Header";
import { useStore } from "@/store";
import { useRouter, usePathname } from "next/navigation";
import { APP_ROUTES } from "@/global/const/routes";
import { SORT_VARIANTS } from "@/global/const/sortVariants";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  Box: ({ children }) => <div>{children}</div>,
  Button: ({ onClick, children, ...props }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  Select: ({ onChange, children, ...props }) => (
    <select onChange={onChange} {...props}>
      {children}
    </select>
  ),
  HStack: ({ children }) => <div>{children}</div>,
  Checkbox: ({ onChange, isChecked, children }) => (
    <label>
      <input type="checkbox" onChange={onChange} checked={isChecked} />
      {children}
    </label>
  ),
  Text: ({ children }) => <span>{children}</span>,
}));

jest.mock("@/store", () => ({
  useStore: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("Header", () => {
  const mockLogout = jest.fn();
  const mockSetSortBy = jest.fn();
  const mockToggleHideCompleted = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    useStore.mockReturnValue({
      user: { name: "Test User" },
      logout: mockLogout,
      setSortBy: mockSetSortBy,
      toggleHideCompleted: mockToggleHideCompleted,
      viewSettings: { hideCompleted: false, sortBy: SORT_VARIANTS.NAME },
    });
    useRouter.mockReturnValue({ push: mockRouterPush });
    usePathname.mockReturnValue(APP_ROUTES.HOME);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Header correctly", () => {
    render(<Header />);

    expect(screen.getByText("Test Exercise App For Digis")).toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("calls logout and redirects to login on logout button click", () => {
    render(<Header />);

    fireEvent.click(screen.getByText("Logout"));

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith(APP_ROUTES.LOGIN);
  });

  test("redirects to login on login button click when not authenticated", () => {
    useStore.mockReturnValue({
      user: null,
      logout: mockLogout,
      setSortBy: mockSetSortBy,
      toggleHideCompleted: mockToggleHideCompleted,
      viewSettings: { hideCompleted: false, sortBy: SORT_VARIANTS.NAME },
    });

    render(<Header />);

    fireEvent.click(screen.getByText("Login"));

    expect(mockRouterPush).toHaveBeenCalledWith(APP_ROUTES.LOGIN);
  });

  test("redirects to add todo on add todo button click", () => {
    render(<Header />);

    fireEvent.click(screen.getByText("Add Todo"));

    expect(mockRouterPush).toHaveBeenCalledWith(APP_ROUTES.ADD);
  });

  test("calls setSortBy on sort select change", () => {
    render(<Header />);

    fireEvent.change(screen.getByPlaceholderText("Sort by"), {
      target: { value: SORT_VARIANTS.PRIORITY },
    });

    expect(mockSetSortBy).toHaveBeenCalledWith(SORT_VARIANTS.PRIORITY);
  });

  test("calls toggleHideCompleted on hide completed checkbox change", () => {
    render(<Header />);

    fireEvent.click(screen.getByLabelText(/Hide Completed/i));

    expect(mockToggleHideCompleted).toHaveBeenCalledTimes(1);
  });
});
