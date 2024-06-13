"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useBoundStore } from "@/store";
import { Center, Spinner, Text, VStack } from "@chakra-ui/react";
import { APP_ROUTES } from "@/global/const/routes";

const Layout = ({ children }) => {
  const { user } = useBoundStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user && !pathname.includes(APP_ROUTES.LOGIN)) {
      router.push(APP_ROUTES.LOGIN);
    }
  }, [user, pathname, router]);

  if (!user && pathname !== APP_ROUTES.LOGIN) {
    return (
      <Center height="100%">
        <VStack>
          <Text mr={4} textAlign="center">
            Please log in to access this page. Redirecting to login...
          </Text>
          <Spinner size="xl" />
        </VStack>
      </Center>
    );
  }

  return <>{children}</>;
};

export default Layout;
