import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  FormErrorMessage,
  Box,
  HStack,
} from "@chakra-ui/react";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { glassEffectStyles } from "@/global/styles/componentStyles";
import { useCallback } from "react";
import { APP_ROUTES } from "@/global/const/routes";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  severity: z.enum(["0", "1", "2"], {
    errorMap: () => ({ message: "Severity is required" }),
  }),
});

export const AddForm = () => {
  const { addElement } = useStore();
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
      addElement({
        id: Date.now(),
        title: data.title,
        description: data.description,
        completed: false,
        severity: parseInt(data.severity, 10),
      });
      router.push(APP_ROUTES.HOME);
    },
    [addElement, router],
  );

  const handleCancel = useCallback(() => {
    router.push(APP_ROUTES.HOME);
  }, [router]);

  return (
    <Box
      p={4}
      sx={{
        ...glassEffectStyles,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={errors.title}>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input id="title" placeholder="Title" {...register("title")} />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.description}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              placeholder="Description"
              maxHeight="200px"
              {...register("description")}
            />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.severity}>
            <FormLabel htmlFor="severity">Severity</FormLabel>
            <Select
              id="severity"
              placeholder="Select severity"
              {...register("severity")}
            >
              <option value="0">Low</option>
              <option value="1">Medium</option>
              <option value="2">High</option>
            </Select>
            <FormErrorMessage>{errors.severity?.message}</FormErrorMessage>
          </FormControl>

          <HStack justifyContent="space-between">
            <Button type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};
