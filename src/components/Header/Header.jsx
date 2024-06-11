import { Box, Button, Select, HStack, Checkbox, Text } from "@chakra-ui/react";
import { useStore } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { gradientAnimation } from "@/global/styles/componentStyles";
import { APP_ROUTES } from "@/global/const/routes";
import { SORT_VARIANTS } from "@/global/const/sortVariants";
import { useCallback, useMemo } from "react";

export const Header = () => {
  const { user, logout, setSortBy, toggleHideCompleted, viewSettings } =
    useStore();
  const { hideCompleted } = viewSettings;
  const pathname = usePathname();
  const router = useRouter();

  const handleAuthButtonClick = () => {
    if (user) {
      logout();
      router.push(APP_ROUTES.LOGIN);
    } else {
      router.push(APP_ROUTES.LOGIN);
    }
  };

  const handleAddTodo = useCallback(() => {
    router.push(APP_ROUTES.ADD);
  }, [router]);

  const handleSortChange = useCallback(
    (event) => {
      setSortBy(event.target.value);
    },
    [setSortBy],
  );

  const handleToggleHideCompleted = useCallback(() => {
    toggleHideCompleted();
  }, [toggleHideCompleted]);

  const viewControls = useMemo(
    () => (
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
        >
          <option value={SORT_VARIANTS.NAME}>Name</option>
          <option value={SORT_VARIANTS.PRIORITY}>Priority</option>
        </Select>
      </>
    ),
    [handleSortChange, handleToggleHideCompleted, hideCompleted, viewSettings],
  );

  return (
    <HStack
      as="header"
      justifyContent="space-between"
      py={2}
      px={4}
      bg="gray.900"
      color="white"
    >
      <Text>Test Exercise App For Digis</Text>
      <HStack gap={2}>
        {pathname === APP_ROUTES.HOME ? viewControls : null}
        <Button
          onClick={handleAddTodo}
          size="sm"
          mr={4}
          isDisabled={pathname !== APP_ROUTES.HOME || !user}
          flexShrink={0}
          sx={{
            background:
              pathname === APP_ROUTES.ADD || !user
                ? "gray.500"
                : "linear-gradient(90deg, #5e1e96, #f41e04)",
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
        <Button
          onClick={handleAuthButtonClick}
          size="sm"
          isDisabled={pathname === APP_ROUTES.LOGIN}
          flexShrink={0}
          sx={{
            background:
              pathname === APP_ROUTES.LOGIN
                ? "gray.500"
                : "linear-gradient(90deg, #5e1e96, #f41e04)",
            backgroundSize: "200% 200%",
            transition: "background-position 0.5s ease",
            _hover: {
              backgroundPosition: "100% 50%",
            },
          }}
          css={gradientAnimation}
        >
          {user ? "Logout" : "Login"}
        </Button>
      </HStack>
    </HStack>
  );
};
