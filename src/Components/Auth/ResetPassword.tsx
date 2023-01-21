import React, { useState, useEffect, useRef } from "react";
import {
  VStack,
  Text,
  Box,
  FormLabel,
  FormControl,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import {
  InfoIcon,
  CheckIcon,
  CloseIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { useParams } from "react-router-dom";

export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ResetPassword = ({ setCurrentPage }) => {
  const { id, token } = useParams();
  const [loading, setLoading] = useState(false);

  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordConfirmShow, setPasswordConfirmShow] = useState(false);
  //Password
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  //Match Password
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const handlePasswordShowClick = () => {
    setPasswordShow(!passwordShow);
  };

  const handlePasswordConfirmShowClick = () => {
    setPasswordConfirmShow(!passwordConfirmShow);
  };

  const handleSubmitClick = async () => {
    setLoading(true);
    if (!password || !confirmPassword) {
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
      const { data } = await axios.put(
        `/api/auth/reset-password/${id}/${token}`,
        { password },
        config
      );
      toast({
        title: "Password Reset Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // localStorage.setItem("userInfo", JSON.stringify(data));
      //   setUser(data);
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

  return (
    <VStack
      spacing="1em"
      width="20%"
      border="2px"
      borderColor="red.100"
      display="flex"
      justifyContent="center"
    >
      <Text fontSize="3xl" as="b">
        Reset password
      </Text>
      <Text color="gray.600">Please choose your new password</Text>

      <FormControl id="password" isRequired>
        <Box display="flex" alignItems="center">
          <FormLabel>New password</FormLabel>
          {password &&
            (validPassword ? (
              <CheckIcon color="green.500" paddingBottom={1} />
            ) : (
              <CloseIcon color="red.500" paddingBottom={1} />
            ))}
        </Box>

        <InputGroup size="md">
          <Input
            type={passwordShow ? "text" : "password"}
            placeholder="Enter your new password"
            border="2px"
            borderColor="#000"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              backgroundColor="#FFF"
              onClick={handlePasswordShowClick}
            >
              {passwordShow ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {passwordFocus && (
          <Box
            display="flex"
            padding={1}
            marginTop={3}
            backgroundColor="blue.100"
            borderRadius="md"
          >
            <InfoIcon marginTop={1} marginRight={2} marginLeft={1} />
            <Text>
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters,
              <br />
              a number and a special character.
              <br />
              Allowed special characters: !@#$%
            </Text>
          </Box>
        )}
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <Box display="flex" alignItems="center">
          <FormLabel>Confirm password</FormLabel>
          {confirmPassword &&
            (validMatch ? (
              <CheckIcon color="green.500" paddingBottom={1} />
            ) : (
              <CloseIcon color="red.500" paddingBottom={1} />
            ))}
        </Box>
        <InputGroup size="md">
          <Input
            type={passwordConfirmShow ? "text" : "password"}
            placeholder="Confirm you new password"
            border="2px"
            borderColor="#000"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            onFocus={() => setConfirmPasswordFocus(true)}
            onBlur={() => setConfirmPasswordFocus(false)}
          />
          <InputRightElement width="4.5rem">
            <Button
              size="sm"
              backgroundColor="#FFF"
              onClick={handlePasswordConfirmShowClick}
            >
              {passwordConfirmShow ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {confirmPasswordFocus && (
          <Box
            display="flex"
            padding={1}
            marginTop={3}
            backgroundColor="blue.100"
            borderRadius="md"
          >
            <InfoIcon marginTop={1} marginRight={2} marginLeft={1} />
            <Text>Must match the first password input field.</Text>
          </Box>
        )}
      </FormControl>

      <Button
        width="100%"
        isLoading={loading}
        loadingText="Loading"
        backgroundColor="#000"
        color="#fff"
        onClick={handleSubmitClick}
      >
        Save new password
      </Button>

      <Box display="flex">
        <Text fontSize="sm" marginRight={1}>
          Back to
        </Text>
        <Text
          fontSize="sm"
          cursor="pointer"
          as="ins"
          onClick={() => navigate("/")}
        >
          log in
        </Text>
      </Box>
    </VStack>
  );
};

export default ResetPassword;
