import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Flex,
  Button,
  FormLabel,
  FormControl,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { useState } from "react";
import axios from "axios";
import UserListItem from "./UserListItem";
import UserBadge from "./UserBadge";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chats, setChats } = ChatState();

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
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: "Failed to load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const HandleGroup = (addUser) => {
    if (selectedUsers.includes(addUser)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, addUser]);
    console.log(selectedUsers);
  };

  const handleDeleteUser = (deleteUser) => {
    setSelectedUsers(
      selectedUsers.filter((selectUser) => selectUser._id !== deleteUser._id)
    );
  };
  const handleSubmit = async () => {
    try {
      if (!groupChatName || !selectedUsers) {
        toast({
          title: "Please fill all fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const createGroup = {
        name: groupChatName,
        users: JSON.stringify(selectedUsers),
      };
      const { data } = await axios.post("/api/chat/group", createGroup, config);
      setChats([data, ...chats]);
      setLoading(false);
      onClose();
      toast({
        title: "New Group Chat has Created",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Filed to Create the Chat!",
        description: error.response.data,
        status: error,
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Chat Name:</FormLabel>
              <Input
                placeholder="Chat Name ..."
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Add User:</FormLabel>
              <Input
                placeholder="Add Users ..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {/* here to render selected user badge */}
            <Flex gridGap={2}>
              {selectedUsers.map((user) => (
                <UserBadge
                  user={user}
                  handleFunction={() => handleDeleteUser(user)}
                  key={user._id}
                />
              ))}
            </Flex>

            {/* here to render searched users */}
            {loading ? (
              <div>Loading</div>
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  user={user}
                  key={user._id}
                  handleFunction={() => HandleGroup(user)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
