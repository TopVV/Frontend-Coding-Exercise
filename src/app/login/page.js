"use client";

import { Box, Center, Text } from "@chakra-ui/react";
import { LoginUserTooltip } from "@/components/LoginUserTooltip/LoginUserTooltip";
import { glassEffectStyles } from "@/global/styles/componentStyles";
import { LoginForm } from "@/components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <Center h="100%">
      <Box
        py={8}
        px={6}
        w={400}
        border="1px solid"
        borderColor="gray.200"
        borderRadius={8}
        sx={{ ...glassEffectStyles }}
      >
        <Center gap={2} mb={2}>
          <Text fontSize="2xl" textAlign="center">
            Login
          </Text>
          <LoginUserTooltip />
        </Center>
        <Text fontSize="sm" textAlign="center" mb={4}>
          Please login to your account. Check the tooltip for available users.
        </Text>
        <LoginForm />
      </Box>
    </Center>
  );
};

export default LoginPage;
