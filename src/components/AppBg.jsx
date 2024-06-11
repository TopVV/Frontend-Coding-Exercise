"use client";

import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sharedCirclesStyles = {
  borderRadius: "50%",
  position: "absolute",
};

const sharedBigCirclesStyles = {
  ...sharedCirclesStyles,
  width: "250px",
  height: "250px",
};

const sharedSmallCirclesStyles = {
  ...sharedCirclesStyles,
  width: "30px",
  height: "30px",
};

const FOOTER_HEIGHT = 100;

export const AppBg = ({ children }) => {
  // get current rout and check if it's login

  const pathname = usePathname();
  const isLogin = pathname === "/login";

  console.log("router", pathname);

  const loginBg = useMemo(
    () => (
      <Box
        sx={{
          width: "700px",
          height: "80%",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <Box
          sx={{
            ...sharedBigCirclesStyles,
            background: "linear-gradient(45deg, #662397, #700cf8)",
            top: "10%",
            left: 0,
          }}
        />
        <Box
          sx={{
            ...sharedBigCirclesStyles,
            background: "linear-gradient(45deg, #ef0f03, #fc9618)",
            bottom: "10%",
            right: 0,
          }}
        />
        <Box
          sx={{
            ...sharedSmallCirclesStyles,
            background: "linear-gradient(45deg, #f9a703, #ee2104)",
            bottom: "15%",
            left: 0,
          }}
        />
        <Box
          sx={{
            ...sharedSmallCirclesStyles,
            top: "15%",
            right: 0,
            background: "linear-gradient(45deg, #770cfa, #2c0f3f)",
          }}
        />
        {children}
      </Box>
    ),
    [children],
  );

  return (
    <>
      <Box as="header">
        <Header />
      </Box>
      <Box
        width="100%"
        height={`calc(100vh - ${56 + 56}px)`}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: isLogin
            ? "black"
            : "linear-gradient(45deg, #553C9A, #322659)",
        }}
      >
        {isLogin ? (
          loginBg
        ) : (
          <Box width="100%" height="100%">
            {children}
          </Box>
        )}
      </Box>
      <Footer />
      {/*<Center*/}
      {/*  as="footer"*/}
      {/*  position="absolute"*/}
      {/*  left={0}*/}
      {/*  right={0}*/}
      {/*  bottom={0}*/}
      {/*  height={`${FOOTER_HEIGHT}px`}*/}
      {/*  backgroundColor="#662397"*/}
      {/*  borderTopRadius={16}*/}
      {/*>*/}
      {/*  <VStack>*/}
      {/*    <Text>Test Exercise App For Digis</Text>*/}
      {/*    <Text>Vadym Topchieiev</Text>*/}
      {/*  </VStack>*/}
      {/*</Center>*/}
    </>
  );
};
