"use client";

import { useMemo } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { useBoundStore } from "@/store";
import { CardItem } from "@/components/CardItem/CardItem";
import { SORT_VARIANTS } from "@/global/const/sortVariants";
import { NoElementsPlaceholder } from "@/components/NoElementsPlaceholder/NoElementsPlaceholder";

export default function Home() {
  const { elements, viewSettings } = useBoundStore();
  const { sortBy, hideCompleted } = viewSettings;

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
    return <NoElementsPlaceholder />;
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
