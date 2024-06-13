import { Button, Center, Text } from "@chakra-ui/react";
import { gradientAnimation } from "@/global/styles/componentStyles";
import { useCallback } from "react";
import { APP_ROUTES } from "@/global/const/routes";
import { useRouter } from "next/navigation";

export const NoElementsPlaceholder = () => {
  const router = useRouter();
  const handleAddTodo = useCallback(() => {
    router.push(APP_ROUTES.ADD);
  }, [router]);

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
};
