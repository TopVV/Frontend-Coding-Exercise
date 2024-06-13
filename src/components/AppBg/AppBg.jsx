"use client";

import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { APP_ROUTES } from "@/global/const/routes";

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

export const AppBg = ({ children }) => {
  const pathname = usePathname();
  const isLogin = pathname === APP_ROUTES.LOGIN;

  const loginBg = useMemo(
    () => (
      <Box width="700px" height="80%" mx="auto" position="relative">
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

  const appContent = useMemo(
    () =>
      isLogin ? (
        loginBg
      ) : (
        <Box width="100%" height="100%">
          {children}
        </Box>
      ),
    [children, isLogin, loginBg],
  );

  return (
    <>
      <Header />
      <Box
        width="100%"
        // 56px - header height, 56px - footer height
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
        {appContent}
      </Box>
      <Footer />
    </>
  );
};
