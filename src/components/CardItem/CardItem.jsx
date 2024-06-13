import { DeleteIcon, CheckIcon } from "@chakra-ui/icons";
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
import { useBoundStore } from "@/store";
import { clampTextStyles } from "@/global/styles/componentStyles";
import { SeverityIndicator } from "@/components/SeverityIndicator/SeverityIndicator";

export const CardItem = ({ title, severity, id, description, completed }) => {
  const { toggleCompleted, deleteElement } = useBoundStore();

  const handleToggleComplete = () => {
    toggleCompleted(id);
  };

  const handleDelete = () => {
    deleteElement(id);
  };

  const sharedTextStyles = {
    textDecoration: completed ? "line-through" : "none",
    ...clampTextStyles,
  };

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
          <SeverityIndicator severity={severity} />
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
            data-testid="deleteButton"
          />
        </CardFooter>
      </Card>
    </Center>
  );
};
