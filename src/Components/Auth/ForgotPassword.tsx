import React, { useState } from "react";
import {
  VStack,
  Text,
  Box,
  FormLabel,
  FormControl,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router";
import axios from "../../config/axios";

const ForgotPassword = ({ setCurrentPage }) => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const history = useHistory();

  const handleSubmitClick = async () => {
    setLoading(true);
    if (!email) {
      toast({
        title: "Please fill email",
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
        "/api/user/forget-password",
        { email },
        config
      );
      toast({
        title: "Send Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setCurrentPage("email-notification");
      setLoading(false);
      console.log("data", data);
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
        Forgot password?
      </Text>
      <Text color="gray.600">
        No worries, we'll send you reset instructions.
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

      <Button
        width="100%"
        isLoading={loading}
        loadingText="Loading"
        backgroundColor="#000"
        color="#fff"
        onClick={handleSubmitClick}
      >
        Reset password
      </Button>

      <Box display="flex">
        <Text fontSize="sm" marginRight={1}>
          Back to
        </Text>
        <Text
          fontSize="sm"
          cursor="pointer"
          as="ins"
          onClick={() => setCurrentPage("login")}
        >
          log in
        </Text>
      </Box>
    </VStack>
  );
};

export default ForgotPassword;
