import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useUserData } from "../hooks/useUserData";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const { userData } = useUserData();
  const history = useHistory();
  useEffect(() => {
    if (!userData) {
      history.push("/");
      return;
    }
  }, [userData, history]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
