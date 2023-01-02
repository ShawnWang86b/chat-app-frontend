import { useState } from "react";
import {
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuDivider,
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider";
import ProfileModal from "../Components/ProfileModal";
import { useHistory } from "react-router-dom";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const history = useHistory();
  const { user } = ChatState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      bg="#faf8f4"
      p="5px 10px"
      width="100%"
    >
      <Tooltip label="Search Users to Chat" hasArrow>
        <Button variant="ghost">
          <SearchIcon />
          <Text display={{ base: "none", md: "flex" }} px="20px">
            Search User
          </Text>
        </Button>
      </Tooltip>

      <Text fontSize="2xl" fontFamily="Poppin">
        Pet Nanny
      </Text>

      <div>
        <Menu>
          <MenuButton>
            <BellIcon fontSize="xl" cursor="pointer" />
          </MenuButton>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar
              size="sm"
              cursor="pointer"
              name={user.name}
              src={user.avatar}
            />
          </MenuButton>
          <MenuList>
            <ProfileModal user={user}>
              <MenuItem>My Profile</MenuItem>
            </ProfileModal>
            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
  );
};

export default SideDrawer;
