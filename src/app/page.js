"use client";

import {
  Box,
  Flex,
  SimpleGrid,
  HStack,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import {
  glassEffectStyles,
  gradientAnimation,
} from "@/global/styles/componentStyles";
import { CardItem } from "@/components/CardItem";

export default function Home() {
  const { user, elements, sortBy } = useStore();
  const router = useRouter();

  const handleAddTodo = () => {
    router.push("/add");
  };

  const sortedElements = useMemo(() => {
    switch (sortBy) {
      case "name":
        return [...elements].sort((a, b) => a.title.localeCompare(b.title));
      case "priority":
        return [...elements].sort((a, b) => b.severity - a.severity);
      case "completed":
        return [...elements].sort((a, b) => a.completed - b.completed);
      default:
        return elements;
    }
  }, [elements, sortBy]);

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/login");
  //   }
  // }, [user, router]);

  // if (!user) {
  //   return null;
  // }

  if (sortedElements.length === 0) {
    return (
      <VStack p={4} spacing={4} justify="center" align="center" height="100%">
        <Text>No tasks found.</Text>
        <Text>Start by adding a new task.</Text>
        <Button
          onClick={handleAddTodo}
          size="sm"
          mr={4}
          flexShrink={0}
          sx={{
            background: "linear-gradient(90deg, #5e1e96, #f41e04)",
            backgroundSize: "200% 200%",
            transition: "background-position 0.5s ease",
            _hover: {
              backgroundPosition: "100% 50%",
            },
          }}
          css={gradientAnimation}
        >
          Add Todo
        </Button>
      </VStack>
    );
  }

  return (
    <SimpleGrid
      minChildWidth="300px"
      spacing="40px"
      p={4}
      overflowY="scroll"
      height="100%"
    >
      {sortedElements.map((element) => (
        <CardItem
          key={element.id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          {...element}
        />
      ))}
    </SimpleGrid>
  );
}
