import { Checkbox, Select, Text } from "@chakra-ui/react";
import { SORT_VARIANTS } from "@/global/const/sortVariants";
import { useBoundStore } from "@/store";

export const HeaderViewControls = () => {
  const { setSortBy, toggleHideCompleted, viewSettings } = useBoundStore();
  const { hideCompleted } = viewSettings;
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleToggleHideCompleted = () => {
    toggleHideCompleted();
  };

  return (
    <>
      <Checkbox
        onChange={handleToggleHideCompleted}
        isChecked={hideCompleted}
        colorScheme="purple"
        flexShrink={0}
      >
        <Text fontSize="sm">Hide Completed</Text>
      </Checkbox>

      <Select
        size="sm"
        mr={4}
        borderRadius={4}
        placeholder="Sort by"
        value={viewSettings.sortBy}
        onChange={handleSortChange}
        bg="white"
        color="black"
        _disabled={{ bg: "gray.500" }}
        sx={{
          option: {
            bg: "white",
            color: "black",
            _hover: { bg: "gray.200" },
            _focus: { bg: "gray.300" },
            _active: { bg: "gray.400" },
          },
        }}
        data-testid="haeder-view-controls-select"
      >
        <option value={SORT_VARIANTS.NAME}>Name</option>
        <option value={SORT_VARIANTS.PRIORITY}>Priority</option>
      </Select>
    </>
  );
};
