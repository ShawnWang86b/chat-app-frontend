import React from "react";
import {
  Box,
  Container,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../Components/Auth/Login";
import SignUp from "../Components/Auth/SignUp";

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent backgroundColor="#faf8f4">
      <Box>
        <Text fontSize="xl" fontFamily="Poppins" margin="1em">
          Pet Nanny User Chat Test Project
        </Text>
      </Box>
      <Box width="100%">
        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList marginBottom="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
//2113604
export default HomePage;
