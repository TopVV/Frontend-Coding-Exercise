"use client";

import { SimpleGrid, Text, Button, Center } from "@chakra-ui/react";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { gradientAnimation } from "@/global/styles/componentStyles";
import { CardItem } from "@/components/CardItem/CardItem";
import { APP_ROUTES } from "@/global/const/routes";
import { SORT_VARIANTS } from "@/global/const/sortVariants";

export default function Home() {
  const { elements, viewSettings } = useStore();
  const { sortBy, hideCompleted } = viewSettings;
  const router = useRouter();

  const handleAddTodo = useCallback(() => {
    router.push(APP_ROUTES.ADD);
  }, [router]);

  const elementsWithAppliedSettings = useMemo(() => {
    let updatedElements = elements;

    if (hideCompleted) {
      updatedElements = updatedElements.filter((element) => !element.completed);
    }

    switch (sortBy) {
      case SORT_VARIANTS.NAME:
        updatedElements = [...updatedElements].sort((a, b) =>
          a.title.localeCompare(b.title),
        );
        break;
      case SORT_VARIANTS.PRIORITY:
        updatedElements = [...updatedElements].sort(
          (a, b) => b.severity - a.severity,
        );
        break;
    }

    return updatedElements;
  }, [elements, sortBy, hideCompleted]);

  if (elementsWithAppliedSettings.length === 0) {
    return (
      <Center flexDirection="column" p={4} gap={4} height="100%">
        <Text>No tasks found.</Text>
        <Text>Start by adding a new task.</Text>
        <Button
          onClick={handleAddTodo}
          size="sm"
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
      </Center>
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
      {elementsWithAppliedSettings.map((element) => (
        <CardItem key={element.id} {...element} />
      ))}
    </SimpleGrid>
  );
}
