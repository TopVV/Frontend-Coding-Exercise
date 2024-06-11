import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { APP_ROUTES } from "@/global/const/routes";
import { EXISTING_USERS } from "@/global/const/users";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/store", () => ({
  useStore: jest.fn(),
}));

describe("LoginForm", () => {
  const mockRouterPush = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      push: mockRouterPush,
    }));
    useStore.mockImplementation(() => ({
      login: mockLogin,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders form fields correctly", () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test("shows validation errors when submitting empty form", async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() => {
      expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  test("shows validation error for invalid username", async () => {
    render(<LoginForm />);

    fireEvent.input(screen.getByPlaceholderText(/Username/i), {
      target: { value: "invalidUser" },
    });
    fireEvent.input(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() => {
      expect(screen.getByText(/Invalid username/i)).toBeInTheDocument();
    });
  });

  test("calls login and redirects on valid form submission", async () => {
    render(<LoginForm />);

    fireEvent.input(screen.getByPlaceholderText(/Username/i), {
      target: { value: EXISTING_USERS.user1 },
    });
    fireEvent.input(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(EXISTING_USERS.user1);
      expect(mockRouterPush).toHaveBeenCalledWith(APP_ROUTES.HOME);
    });
  });
});
