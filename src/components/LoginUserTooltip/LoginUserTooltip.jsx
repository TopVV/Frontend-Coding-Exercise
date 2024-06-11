import { Box, ListItem, Tooltip, UnorderedList } from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { EXISTING_USERS } from "@/global/const/users";

export const LoginUserTooltip = () => {
  return (
    <Tooltip
      label={
        <Box display="flex" flexDirection="column" p={2}>
          There are 2 users available for login (any password):
          <UnorderedList>
            <ListItem>{EXISTING_USERS.user1}</ListItem>
            <ListItem>{EXISTING_USERS.user2}</ListItem>
          </UnorderedList>
        </Box>
      }
      borderRadius={8}
      color="white"
      backgroundColor="gray.700"
    >
      <QuestionOutlineIcon mt={1} alignSelf="start" boxSize="14px" />
    </Tooltip>
  );
};
