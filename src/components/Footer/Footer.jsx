import { Center, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Center as="footer" p={4} bg="gray.900" color="white" textAlign="center">
      <Text
        fontSize={{
          base: "xs",
          md: "md",
        }}
      >
        © Test Exercise App For Digis by Vadym Topchieiev
      </Text>
    </Center>
  );
};
