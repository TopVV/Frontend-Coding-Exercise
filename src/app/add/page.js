"use client";

import { Box, Center, VStack } from "@chakra-ui/react";
import AddForm from "../../components/AddForm";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddPage() {
  const { user } = useStore();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/login");
  //   }
  // }, [user, router]);
  //
  // if (!user) {
  //   return null;
  // }

  return (
    <Center height="100%">
      <AddForm />
    </Center>
  );
}
