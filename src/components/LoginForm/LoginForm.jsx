import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import { gradientAnimation } from "@/global/styles/componentStyles";
import { useBoundStore } from "@/store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback } from "react";
import { EXISTING_USERS } from "@/global/const/users";
import { APP_ROUTES } from "@/global/const/routes";

const schema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .refine((value) => {
      return value === EXISTING_USERS.user1 || value === EXISTING_USERS.user2;
    }, "Invalid username"),
  password: z.string().min(1, "Password is required"),
});

export const LoginForm = () => {
  const { login } = useBoundStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    (data) => {
      login(data.username);
      router.push(APP_ROUTES.HOME);
    },
    [login, router],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl isInvalid={errors.username}>
          <Input
            {...register("username")}
            placeholder="Username"
            autoComplete="username"
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <Input
            {...register("password")}
            placeholder="Password"
            type="password"
            autoComplete="current-password"
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          mt={8}
          sx={{
            width: "100%",
            background: "linear-gradient(90deg, #5e1e96, #f41e04)",
            backgroundSize: "200% 200%",
            transition: "background-position 0.5s ease",
            _hover: {
              backgroundPosition: "100% 50%",
            },
          }}
          css={gradientAnimation}
        >
          Login
        </Button>
      </VStack>
    </form>
  );
};
