import { Box, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const UserBadge = ({ user, handleFunction }) => {
  return (
    <Box
      as="span"
      display="inline-flex"
      bg="blue.400"
      alignItems="center"
      color="#FFF"
      my={2}
      px={2}
    >
      <Text fontFamily="Poppin" fontSize="xl">
        {user.name}
      </Text>
      <CloseIcon
        onClick={handleFunction}
        cursor="pointer"
        ml={2}
        _hover={{ bg: "#fff", color: "blue.400" }}
      />
    </Box>
  );
};

export default UserBadge;
