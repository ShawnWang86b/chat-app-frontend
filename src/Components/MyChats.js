import { useState, useEffect } from "react";
import { useToast, Box, Button, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { AddIcon } from "@chakra-ui/icons";
import ChatsLoading from "./ChatsLoading";

const MyChats = () => {
  const { selectedChat, setSelectedChat, user, setUser, chats, setChats } =
    ChatState();
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  const getSender = (loggedUser, users) => {};
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      padding={3}
      margin={3}
      bg="white"
      borderRadius="lg"
      borderWidth="1px"
      w={{ base: "100%", md: "31%" }}
      h="100%"
    >
      <Box
        fontFamily="Poppin"
        w="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        fontSize={{ base: "28px", md: "30px" }}
      >
        My Chat
        <Button rightIcon={<AddIcon />}>New Group Chat</Button>
      </Box>
      {/* render all chats */}
      <Box display="flex" flexDirection="column" w="100%" h="100%" padding={3}>
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                key={chat._id}
                cursor="pointer"
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatsLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
