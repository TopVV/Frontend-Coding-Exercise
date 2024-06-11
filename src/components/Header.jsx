import { Box, Button, Select, HStack } from "@chakra-ui/react";
import { useStore } from "../store";
import { usePathname, useRouter } from "next/navigation";
import { gradientAnimation } from "@/global/styles/componentStyles";

const Header = () => {
  const { user, logout, sortBy, setSortBy } = useStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleAuthButtonClick = () => {
    if (user) {
      logout();
      router.push("/login");
    } else {
      router.push("/login");
    }
  };

  const handleAddTodo = () => {
    router.push("/add");
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Box
      as="header"
      py={2}
      px={4}
      bg="gray.900"
      color="white"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>Test Exercise App For Digis</Box>
      <HStack>
        <Select
          size="sm"
          mr={4}
          borderRadius={4}
          placeholder="Sort by"
          value={sortBy}
          onChange={handleSortChange}
          // disabled={!user}
          bg="white"
          color="black"
          _disabled={{ bg: "gray.500" }}
          hidden={pathname !== "/"}
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
          <option value="name">Name</option>
          <option value="priority">Priority</option>
          <option value="completed">Completed</option>
        </Select>
        <Button
          onClick={handleAddTodo}
          size="sm"
          mr={4}
          disabled={pathname === "/add" || !user}
          flexShrink={0}
          sx={{
            background:
              pathname === "/add" || !user
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
          disabled={pathname === "/login"}
          flexShrink={0}
          sx={{
            background:
              pathname === "/login"
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
    </Box>
  );
};

export default Header;
