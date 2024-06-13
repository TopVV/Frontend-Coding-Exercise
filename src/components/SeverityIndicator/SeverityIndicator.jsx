import { SEVERITY_LEVELS } from "@/global/const/severity";
import { MinusIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

export const SeverityIndicator = ({ severity }) => {
  switch (severity) {
    case SEVERITY_LEVELS.low.value:
      return (
        <TriangleDownIcon boxSize="14px" data-testid="triangle-down-icon" />
      );
    case SEVERITY_LEVELS.medium.value:
      return <MinusIcon boxSize="14px" data-testid="minus-icon" />;
    case SEVERITY_LEVELS.high.value:
      return <TriangleUpIcon boxSize="14px" data-testid="triangle-up-icon" />;
    default:
      return null;
  }
};
