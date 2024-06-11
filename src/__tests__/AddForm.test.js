import { render, screen, fireEvent } from "@testing-library/react";
import { useStore } from "../store";
import AddForm from "../components/AddForm";
import { useRouter } from "next/navigation";

jest.mock("../store");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

test("submits form and adds element", () => {
  const addElement = jest.fn();
  useStore.mockReturnValue({
    addElement,
  });
  const push = jest.fn();
  useRouter.mockReturnValue({ push });

  render(<AddForm />);

  fireEvent.input(screen.getByPlaceholderText("Element"), {
    target: { value: "New Element" },
  });
  fireEvent.submit(screen.getByRole("button", { name: /add element/i }));

  expect(addElement).toHaveBeenCalledWith("New Element");
  expect(push).toHaveBeenCalledWith("/");
});
