import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../Components/SideDrawer";
import MyChats from "../Components/MyChats";
import ChatBox from "../Components/ChatBox";
import { useUserData } from "../hooks/useUserData";
const ChatPage = () => {
  const { userData } = useUserData();
  const [fetchAgain, setFetchAgain] = useState(false);
  if (!userData) {
    return null;
  }
  return (
    <>
      <SideDrawer />
      <Box display="flex" justifyContent="space-between" h="91.5vh" p="10px">
        <MyChats fetchAgain={fetchAgain} />
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </>
  );
};

export default ChatPage;
