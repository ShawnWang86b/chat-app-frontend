import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <VStack spacing="1em">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input placeholder="Enter Your Email Address" />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input placeholder="Enter Password" />
      </FormControl>
      <Button width="100%" loadingText="Loading">
        Login
      </Button>
    </VStack>
  );
};

export default Login;
