"use client";

import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

export function Providers({ children }) {
  return (
    <ChakraProvider>
      <ColorModeProvider value="dark">{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
