import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../Components/SideDrawer";
import MyChats from "../Components/MyChats";
import ChatBox from "../Components/ChatBox";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <>
      <div>{user && <SideDrawer />} </div>
      <Box display="flex" justifyContent="space-between">
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </>
  );
};

export default ChatPage;
