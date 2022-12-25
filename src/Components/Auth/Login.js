import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const Login = () => {
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
      <Button width="100%" colorScheme="linkedin">
        Login
      </Button>
    </VStack>
  );
};

export default Login;
