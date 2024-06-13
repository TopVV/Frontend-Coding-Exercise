import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "./Header";
import { useBoundStore } from "@/store";
import { useRouter, usePathname } from "next/navigation";
import { APP_ROUTES } from "@/global/const/routes";

jest.mock("./components/HeaderViewControls", () => ({
  HeaderViewControls: () => <div>HeaderViewControls</div>,
}));

jest.mock("@/store", () => ({
  useBoundStore: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("Header", () => {
  const mockLogout = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    useBoundStore.mockReturnValue({
      user: { name: "Test User" },
      logout: mockLogout,
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
    useBoundStore.mockReturnValue({
      user: null,
      logout: mockLogout,
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
});
