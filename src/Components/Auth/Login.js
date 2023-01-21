import {
  VStack,
  FormControl,
  Input,
  Box,
  Text,
  Button,
  FormLabel,
  Checkbox,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "../../config/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as GoogleIcon } from "../../assets/google.svg";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useUserData } from "../../hooks/useUserData";
import { useGoogleLogin } from "@react-oauth/google";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const { setUserData } = useUserData();

  const toast = useToast();
  const navigate = useNavigate();
  const handlePasswordShowClick = () => {
    setPasswordShow(!passwordShow);
  };
  const handleSubmitClick = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUserData(data);
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  //Google login use costume button
  // const handleGoogleLoginClick = useGoogleLogin({
  //   onSuccess: (tokenResponse) => console.log(tokenResponse),
  // });

  return (
    <VStack spacing="1em" width="60%">
      <Text fontSize="3xl" as="b">
        Welcome back
      </Text>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          border="2px"
          borderColor="#000"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={passwordShow ? "text" : "password"}
            border="2px"
            borderColor="#000"
            placeholder="Enter password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button
              size="sm"
              backgroundColor="#FFF"
              onClick={handlePasswordShowClick}
            >
              {passwordShow ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Box display="flex" justifyContent="space-between" width="100%">
        <Checkbox defaultChecked colorScheme="red">
          <Text fontSize="sm">Remember me</Text>
        </Checkbox>

        <Text
          fontSize="sm"
          cursor="pointer"
          onClick={() => setCurrentPage("forgotPassword")}
          _hover={{ textDecoration: "underline" }}
        >
          Forgot password
        </Text>
      </Box>

      <Button
        width="100%"
        isLoading={loading}
        loadingText="Loading"
        backgroundColor="#000"
        color="#fff"
        onClick={handleSubmitClick}
      >
        Sign in
      </Button>
      <Button
        width="100%"
        isLoading={loading}
        loadingText="Loading"
        backgroundColor="#fff"
        // onClick={() => handleGoogleLoginClick()}
        border="2px"
        borderColor="#000"
        leftIcon={<GoogleIcon />}
      >
        Sign in with Google
      </Button>

      <Box display="flex">
        <Text fontSize="sm" marginRight={1}>
          Don't have an account?
        </Text>
        <Text
          fontSize="sm"
          cursor="pointer"
          as="ins"
          onClick={() => setCurrentPage("register")}
        >
          Sign up
        </Text>
      </Box>
    </VStack>
  );
};

export default Login;
