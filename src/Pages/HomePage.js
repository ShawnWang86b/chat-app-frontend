import React, { useEffect } from "react";
import {
  Box,
  Stack,
  Flex,
  Container,
  Image,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Center,
  Divider,
} from "@chakra-ui/react";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register.tsx";
import ForgotPassword from "../Components/Auth/ForgotPassword.tsx";
import { useHistory } from "react-router";
import { ChatState } from "../Context/ChatProvider";

const HomePage = () => {
  const history = useHistory();
  const { currentPage } = ChatState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
    }
  }, [history]);

  return (
    <Container display="flex" maxW="7xl" height="100%">
      <Box
        width="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {currentPage === "login" && <Login />}
        {currentPage === "register" && <Register />}
        {currentPage === "forgotPassword" && <ForgotPassword />}
      </Box>

      <Box
        width="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderLeft="2px"
        borderLeftColor="#000"
      >
        <Image
          height="90%"
          src="https://res.cloudinary.com/dmfmwtxje/image/upload/v1673618933/signin_img_sts3ee.png"
          alt="colorComposition"
        />
      </Box>
    </Container>
  );
};
export default HomePage;
