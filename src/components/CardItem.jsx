import {
  ChevronDownIcon,
  MinusIcon,
  ChevronUpIcon,
  DeleteIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Center,
  CardFooter,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useStore } from "@/store";

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

  const handleToggleComplete = () => {
    toggleCompleted(id);
  };

  const handleDelete = () => {
    deleteElement(id);
  };

  return (
    <Center>
      <Card
        borderRadius={16}
        background="linear-gradient(147deg, #FFE53B 0%, #fd3838 74%)"
        width="300px"
        height="250px"
        transition="transform 0.3s, box-shadow 0.3s"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <CardHeader
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Heading
            size="md"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textDecoration: completed ? "line-through" : "none",
            }}
          >
            {title}
          </Heading>
          <Center
            borderRadius="50%"
            width={5}
            height={5}
            backgroundColor={severityIndicator.color}
            flexShrink={0}
          >
            {severityIndicator.icon}
          </Center>
        </CardHeader>
        <CardBody>
          <Text
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textDecoration: completed ? "line-through" : "none",
            }}
          >
            {description}
          </Text>
        </CardBody>
        <CardFooter
          alignSelf="end"
          width="100%"
          pt={0}
          display="flex"
          justifyContent="space-between"
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
          />
          <IconButton icon={<DeleteIcon />} onClick={handleDelete} />
        </CardFooter>
      </Card>
    </Center>
  );
};
