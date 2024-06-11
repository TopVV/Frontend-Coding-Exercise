import {
  MinusIcon,
  DeleteIcon,
  CheckIcon,
  TriangleDownIcon,
  TriangleUpIcon,
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
        return <TriangleDownIcon boxSize="14px" />;
      case 1:
        return <MinusIcon boxSize="14px" />;
      case 2:
        return <TriangleUpIcon boxSize="14px" />;
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
          <Heading
            size="md"
            sx={sharedTextStyles}
            data-testid="card-item-heading"
          >
            {title}
          </Heading>
          {severityIndicator}
        </CardHeader>
        <CardBody>
          <Text sx={sharedTextStyles} data-testid="card-item-description">
            {description}
          </Text>
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
            data-testid="toggleCompleteButton"
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
