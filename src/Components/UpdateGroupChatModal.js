import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  useToast,
  Flex,
  FormControl,
  Input,
  FormLabel,
  Spinner,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider";
import UserBadge from "../Components/UserBadge";
import UserListItem from "./UserListItem";
import axios from "axios";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const toast = useToast();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const handleAddUser = (addUser) => {
    if (selectedChat.users.find((user) => user._id === addUser._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const postData = {
        chatId: selectedChat._id,
        userId: addUser._id,
      };

      const { data } = axios.put("/api/chat/groupadd", postData, config);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const handleRemove = (deleteUser) => {
    if (
      selectedChat.groupAdmin._id !== user._id &&
      deleteUser._id !== user._id
    ) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const postData = {
        chatId: selectedChat._id,
        userId: deleteUser._id,
      };

      const { data } = axios.put("/api/chat/groupremove", postData, config);
      deleteUser._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  //update group name
  const handleUpdateGroupName = async () => {
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can change name",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const postData = {
        chatId: selectedChat._id,
        chatName: groupChatName,
      };

      const { data } = await axios.put("/api/chat/rename", postData, config);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      onClose();
    } catch (error) {}
  };

  return (
    <>
      <IconButton onClick={onOpen} icon={<HamburgerIcon />} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gridGap={2}>
              {selectedChat.users.map((user) => (
                <UserBadge
                  user={user}
                  key={user._id}
                  handleFunction={() => handleRemove(user)}
                />
              ))}
            </Flex>
            <FormControl>
              <FormLabel mt={3}>Chat Name:</FormLabel>
              <Flex>
                <Input
                  mr={1}
                  placeholder="Chat Name ..."
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <Button
                  bg="blue.500"
                  color="#FFF"
                  onClick={handleUpdateGroupName}
                >
                  Update
                </Button>
              </Flex>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Add User:</FormLabel>
              <Input
                placeholder="Add Users ..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
