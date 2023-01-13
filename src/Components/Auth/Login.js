import {
  VStack,
  FormControl,
  Input,
  Box,
  Text,
  Button,
  Checkbox,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "../../config/axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import { ReactComponent as GoogleIcon } from "../../assets/google.svg";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const { setUser } = ChatState();

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
        "/api/user/login",
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
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      setLoading(false);
      history.push("/chats");
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
  return (
    <VStack spacing="1em" width="60%">
      <Text fontSize="3xl" as="b">
        Welcome back
      </Text>

      <FormControl id="email" isRequired>
        <Input
          placeholder="Enter your email address"
          border="2px"
          borderColor="#000"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>

      <FormControl id="password" isRequired>
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
            <Button size="sm" onClick={handlePasswordShowClick}>
              {passwordShow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Box display="flex" justifyContent="space-between">
        <Checkbox defaultChecked colorScheme="red">
          <Text fontSize="sm">Remember me</Text>
        </Checkbox>

        <Text fontSize="sm">Forgot password</Text>
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
        onClick={handleSubmitClick}
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
        <Text fontSize="sm" cursor="pointer" as="ins">
          Sign up
        </Text>
      </Box>
    </VStack>
  );
};

export default Login;
