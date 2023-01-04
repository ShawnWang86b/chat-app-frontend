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
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider";
import UserBadge from "../Components/UserBadge";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const toast = useToast();
  const handleSearch = () => {};
  const handleDeleteUser = (deleteUser) => {};

  //remove self
  const handleRemove = (user) => {};
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
                  handleFunction={() => handleDeleteUser(user)}
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
                <Button bg="blue.500" color="#FFF">
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
