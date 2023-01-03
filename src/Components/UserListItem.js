import { Box, Avatar, Text, Stack } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      display="flex"
      alignItems="center"
      border="1px"
      borderColor="gray.200"
      cursor="pointer"
      px={3}
      py={2}
      mb={2}
      _hover={{
        background: "#faf8f4",
      }}
      borderRadius="lg"
    >
      <Avatar src={user.avatar} mr={2} name={user.name} />
      <Stack padding={1} marginLeft={2}>
        <Text fontFamily="Poppin" fontSize="xl">
          {user.name}
        </Text>
        <Text fontFamily="Poppin">
          <b>Email:</b>
          {` ${user.email}`}
        </Text>
      </Stack>
    </Box>
  );
};

export default UserListItem;
