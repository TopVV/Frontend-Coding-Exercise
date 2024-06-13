import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useBoundStore } from "@/store";
import { useRouter } from "next/navigation";
import { AddForm } from "./AddForm";
import { APP_ROUTES } from "@/global/const/routes";
import { SEVERITY_LEVELS } from "@/global/const/severity";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/store", () => ({
  useBoundStore: jest.fn(),
}));

describe("AddForm", () => {
  const mockRouterPush = jest.fn();
  const mockAddElement = jest.fn();

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      push: mockRouterPush,
    }));
    useBoundStore.mockImplementation(() => ({
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
    const severityKey = Object.keys(SEVERITY_LEVELS)[0];
    const newElement = {
      title: "Test Title",
      description: "Test Description",
      completed: false,
      severity: SEVERITY_LEVELS[severityKey].value,
    };

    fireEvent.input(screen.getByLabelText(/Title/i), {
      target: { value: newElement.title },
    });
    fireEvent.input(screen.getByLabelText(/Description/i), {
      target: { value: newElement.description },
    });
    fireEvent.change(screen.getByLabelText(/Severity/i), {
      target: { value: severityKey },
    });

    fireEvent.click(screen.getByText(/Add Task/i));

    await waitFor(() => {
      expect(mockAddElement).toHaveBeenCalledWith({
        ...newElement,
        id: expect.any(Number),
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
