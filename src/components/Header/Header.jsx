import { Button, HStack, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useBoundStore } from "@/store";
import { gradientAnimation } from "@/global/styles/componentStyles";
import { APP_ROUTES } from "@/global/const/routes";
import { HeaderViewControls } from "./components/HeaderViewControls";

export const Header = () => {
  const { user, logout } = useBoundStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleAuthButtonClick = () => {
    if (user) logout();
    router.push(APP_ROUTES.LOGIN);
  };

  const handleAddTodo = () => {
    router.push(APP_ROUTES.ADD);
  };

  return (
    <HStack
      as="header"
      justifyContent="space-between"
      py={2}
      px={4}
      bg="gray.900"
      color="white"
    >
      <Text
        fontSize={{
          base: "xs",
          md: "md",
        }}
      >
        Test Exercise App For Digis
      </Text>
      <HStack gap={2}>
        {pathname === APP_ROUTES.HOME ? <HeaderViewControls /> : null}
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
