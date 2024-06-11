import { render, screen } from "@testing-library/react";
import { useStore } from "../store";
import CardList from "../components/CardList";

jest.mock("../store");

test("renders elements from the store", () => {
  useStore.mockReturnValue({
    elements: ["Element 1", "Element 2"],
  });

  render(<CardList />);

  expect(screen.getByText("Element 1")).toBeInTheDocument();
  expect(screen.getByText("Element 2")).toBeInTheDocument();
});
