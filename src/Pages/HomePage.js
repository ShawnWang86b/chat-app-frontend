import React, { useEffect, useState } from "react";
import { Box, Container, Image } from "@chakra-ui/react";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register.tsx";
import ForgotPassword from "../Components/Auth/ForgotPassword.tsx";
import { useHistory } from "react-router";
import EmailNotify from "../Components/Auth/EmailNotify.tsx";
import { useUserData } from "../hooks/useUserData";
const HomePage = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState("login");
  const { userData } = useUserData();

  useEffect(() => {
    if (userData) {
      history.push("/chats");
    }
  }, [history]);

  return (
    <Container display="flex" maxW="7xl" height="100%">
      {/* {setCurrentPage("Login")} */}
      <Box
        width="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === "register" && (
          <Register setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "forgotPassword" && (
          <ForgotPassword setCurrentPage={setCurrentPage} />
        )}
        {/* {currentPage === "resetPassword" && <ResetPassword />} */}
        {currentPage === "email-notification" && <EmailNotify />}
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
