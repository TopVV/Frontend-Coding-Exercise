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
import { useBoundStore } from "@/store";
import { useRouter } from "next/navigation";
import { glassEffectStyles } from "@/global/styles/componentStyles";
import { APP_ROUTES } from "@/global/const/routes";
import { SEVERITY_LEVELS } from "@/global/const/severity";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  severity: z.enum(Object.keys(SEVERITY_LEVELS), {
    errorMap: () => ({ message: "Severity is required" }),
  }),
});

export const AddForm = () => {
  const { addElement } = useBoundStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    addElement({
      id: Date.now(),
      title: data.title,
      description: data.description,
      completed: false,
      severity: SEVERITY_LEVELS[data.severity].value,
    });
    router.push(APP_ROUTES.HOME);
  };

  const handleCancel = () => {
    router.push(APP_ROUTES.HOME);
  };

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
              {Object.entries(SEVERITY_LEVELS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.text}
                </option>
              ))}
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
