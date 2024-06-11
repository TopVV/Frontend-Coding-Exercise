"use client";

import {
  Box,
  VStack,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { LoginUserTooltip } from "@/components/LoginUserTooltip";
import {
  glassEffectStyles,
  gradientAnimation,
} from "@/global/styles/componentStyles";

const schema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .refine((value) => {
      return value === "user1" || value === "user2";
    }, "Invalid username"),
  password: z.string().min(1, "Password is required"),
});

const LoginPage = () => {
  const { login } = useStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    login(data.username);
    router.push("/");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" h="100%">
      <Box
        py={8}
        px={6}
        w={400}
        border="1px solid"
        borderColor="gray.200"
        borderRadius={8}
        a
        sx={{ ...glassEffectStyles }}
      >
        <Box
          display="flex"
          justifyContent="center"
          gap={2}
          alignItems="center"
          mb={2}
        >
          <Text fontSize="2xl" textAlign="center">
            Login
          </Text>
          <LoginUserTooltip />
        </Box>
        <Text fontSize="sm" textAlign="center" mb={4}>
          Please login to your account. Check the tooltip for available users.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.username}>
              <Input placeholder="Username" {...register("username")} />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <Input placeholder="Password" {...register("password")} />
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
      </Box>
    </Box>
  );
};

export default LoginPage;
