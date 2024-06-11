import {
  ChevronDownIcon,
  MinusIcon,
  ChevronUpIcon,
  DeleteIcon,
  CheckIcon,
} from "@chakra-ui/icons";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Center,
  CardFooter,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import { useStore } from "@/store";
import { clampTextStyles } from "@/global/styles/componentStyles";

export const CardItem = ({ title, severity, id, description, completed }) => {
  const { toggleCompleted, deleteElement } = useStore();

  const severityIndicator = useMemo(() => {
    switch (severity) {
      case 0:
        return {
          icon: <ChevronDownIcon />,
          color: "gray.400",
        };
      case 1:
        return {
          icon: "-",
          color: "yellow.400",
        };

      case 2:
        return {
          icon: <ChevronUpIcon />,
          color: "red.400",
        };
      default:
        return {
          icon: <MinusIcon />,
          color: "gray.500",
        };
    }
  }, [severity]);

  const handleToggleComplete = useCallback(() => {
    toggleCompleted(id);
  }, [id, toggleCompleted]);

  const handleDelete = useCallback(() => {
    deleteElement(id);
  }, [id, deleteElement]);

  const sharedTextStyles = useMemo(
    () => ({
      textDecoration: completed ? "line-through" : "none",
      ...clampTextStyles,
    }),
    [completed],
  );

  return (
    <Center>
      <Card
        width="300px"
        height="250px"
        borderRadius={16}
        background="linear-gradient(147deg, #FFE53B 0%, #fd3838 74%)"
        transition="transform 0.3s, box-shadow 0.3s"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <CardHeader display="flex" justifyContent="space-between">
          <Heading size="md" sx={sharedTextStyles}>
            {title}
          </Heading>
          <Center
            width={5}
            height={5}
            flexShrink={0}
            borderRadius="50%"
            backgroundColor={severityIndicator.color}
          >
            {severityIndicator.icon}
          </Center>
        </CardHeader>
        <CardBody>
          <Text sx={sharedTextStyles}>{description}</Text>
        </CardBody>
        <CardFooter
          display="flex"
          alignSelf="end"
          justifyContent="space-between"
          width="100%"
          pt={0}
        >
          <IconButton
            onClick={handleToggleComplete}
            mr={2}
            icon={<CheckIcon />}
            backgroundColor={completed ? "green.500" : "transparent"}
            _hover={
              completed
                ? {
                    backgroundColor: "gray.500",
                  }
                : {
                    backgroundColor: "green.500",
                  }
            }
            aria-label="mark as completed"
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={handleDelete}
            aria-label="delete"
          />
        </CardFooter>
      </Card>
    </Center>
  );
};
