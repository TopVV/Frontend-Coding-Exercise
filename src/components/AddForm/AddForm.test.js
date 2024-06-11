import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { useStore } from "@/store";
import { useRouter } from "next/router";
import { AddForm } from "./AddForm";
import { APP_ROUTES } from "@/global/const/routes";

// Mocking useRouter and useStore
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/store", () => ({
  useStore: jest.fn(),
}));

describe("AddForm", () => {
  const mockRouterPush = jest.fn();
  const mockAddElement = jest.fn();

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      push: mockRouterPush,
    }));
    useStore.mockImplementation(() => ({
      addElement: mockAddElement,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders form fields correctly", () => {
    render(<AddForm />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Severity/i)).toBeInTheDocument();
  });

  test("shows validation errors when submitting empty form", async () => {
    render(<AddForm />);

    fireEvent.click(screen.getByText(/Add Task/i));

    await waitFor(() => {
      expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Severity is required/i)).toBeInTheDocument();
    });
  });

  test("calls addElement and redirects on valid form submission", async () => {
    render(<AddForm />);

    fireEvent.input(screen.getByLabelText(/Title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.input(screen.getByLabelText(/Description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/Severity/i), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByText(/Add Task/i));

    await waitFor(() => {
      expect(mockAddElement).toHaveBeenCalledWith({
        id: expect.any(Number),
        title: "Test Title",
        description: "Test Description",
        completed: false,
        severity: 1,
      });
      expect(mockRouterPush).toHaveBeenCalledWith(APP_ROUTES.HOME);
    });
  });

  test("redirects to home on cancel", () => {
    render(<AddForm />);

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(mockRouterPush).toHaveBeenCalledWith(APP_ROUTES.HOME);
  });
});
