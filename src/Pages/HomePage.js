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
import { useHistory } from "react-router";

const HomePage = () => {
  const history = useHistory();

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
        <Login />
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
          src="https://res.cloudinary.com/dmfmwtxje/image/upload/v1673607358/colorComposition_v4yeay.jpg"
          alt="colorComposition"
        />
      </Box>
    </Container>
  );
};
export default HomePage;
