import { Box, ListItem, Tag, Tooltip, UnorderedList } from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { existUsers } from "@/global/const";

export const LoginUserTooltip = () => {
  return (
    <Tooltip
      label={
        <Box display="flex" flexDirection="column" borderRadius={4}>
          There are 2 users available for login (any password):
          <UnorderedList>
            <ListItem>{existUsers.user1.name}</ListItem>
            <ListItem>{existUsers.user2.name}</ListItem>
          </UnorderedList>
        </Box>
      }
      borderRadius={8}
    >
      <Box p="1">
        <QuestionOutlineIcon />
      </Box>
    </Tooltip>
  );
};
