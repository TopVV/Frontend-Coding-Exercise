import { render, screen } from "@testing-library/react";
import { SeverityIndicator } from "./SeverityIndicator";
import { SEVERITY_LEVELS } from "@/global/const/severity";

describe("SeverityIndicator", () => {
  test.each`
    severity                        | expectedTestId
    ${SEVERITY_LEVELS.low.value}    | ${"triangle-down-icon"}
    ${SEVERITY_LEVELS.medium.value} | ${"minus-icon"}
    ${SEVERITY_LEVELS.high.value}   | ${"triangle-up-icon"}
  `(
    "renders correct icon for severity $severity",
    ({ severity, expectedTestId }) => {
      render(<SeverityIndicator severity={severity} />);

      const iconElement = screen.getByTestId(expectedTestId);
      expect(iconElement).toBeInTheDocument();
    },
  );

  test("renders nothing for invalid severity", () => {
    render(<SeverityIndicator severity="invalid" />);
    expect(screen.queryByRole("img")).toBeNull();
  });
});
