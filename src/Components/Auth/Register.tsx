import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Text,
  Box,
  Flex,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import axios from "../../config/axios";
import { useHistory } from "react-router-dom";
import { InfoIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

export const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const REGISTER_URL = "/api/user";

const Register = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);

  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordConfirmShow, setPasswordConfirmShow] = useState(false);

  //Name
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  //Email
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  //Password
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  //Match Password
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  //Avatar
  const [avatar, setAvatar] = useState("");
  const [avatarLoading, setAvatarLoading] = useState(false);

  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

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

  const postDetials = (avatar) => {
    setAvatarLoading(true);
    if (avatar === undefined) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setAvatarLoading(false);
      return;
    }
    if (avatar.type === "image/jpeg" || avatar.type === "image/png") {
      const data = new FormData();
      data.append("file", avatar);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dmfmwtxje");
      fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setAvatar(data.url.toString());
          setAvatarLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setAvatarLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setAvatarLoading(false);
      return;
    }
  };

  const handleSubmit = async () => {
    setAvatarLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please input all fields",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setAvatarLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "passwords do not match",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setAvatarLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, avatar },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setAvatarLoading(false);
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
      setAvatarLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="1em">
      <FormControl id="name" isRequired>
        <Box display="flex" alignItems="center">
          <FormLabel fontSize="xl">Name</FormLabel>
          {name &&
            (validName ? (
              <CheckIcon color="green.500" paddingBottom={2} fontSize="2xl" />
            ) : (
              <CloseIcon color="red.500" paddingBottom={2} fontSize="2xl" />
            ))}
        </Box>
        <Input
          placeholder="Enter Your Name"
          ref={nameRef}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
        />
        {nameFocus && (
          <Box
            display="flex"
            padding={1}
            marginTop={3}
            backgroundColor="blue.100"
            fontSize="xl"
            borderRadius="md"
          >
            <InfoIcon marginTop={1} marginRight={2} marginLeft={1} />
            <Text fontFamily="Poppin">
              4 to 24 characters.
              <br /> Must begin with a letter.
              <br /> Letters, numbers, underscores, hyphens allowed.
            </Text>
          </Box>
        )}
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          placeholder="Enter Your Email Address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        {emailFocus && (
          <Box
            display="flex"
            padding={1}
            marginTop={3}
            backgroundColor="blue.100"
            fontSize="xl"
            borderRadius="md"
          >
            <InfoIcon marginTop={1} marginRight={2} marginLeft={1} />
            <Text fontFamily="Poppin">Must a valid email address.</Text>
          </Box>
        )}
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={passwordShow ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handlePasswordShowClick}>
              {passwordShow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {passwordFocus && (
          <Box
            display="flex"
            padding={1}
            marginTop={3}
            backgroundColor="blue.100"
            fontSize="xl"
            borderRadius="md"
          >
            <InfoIcon marginTop={1} marginRight={2} marginLeft={1} />
            <Text fontFamily="Poppin">
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:!@#$%
            </Text>
          </Box>
        )}
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={passwordConfirmShow ? "text" : "password"}
            placeholder="Enter Password Again"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            onFocus={() => setConfirmPasswordFocus(true)}
            onBlur={() => setConfirmPasswordFocus(false)}
          />
          <InputRightElement width="4.5rem">
            <Button size="sm" onClick={handlePasswordConfirmShowClick}>
              {passwordConfirmShow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {confirmPasswordFocus && (
          <Box
            display="flex"
            padding={1}
            marginTop={3}
            backgroundColor="blue.100"
            fontSize="xl"
            borderRadius="md"
          >
            <InfoIcon marginTop={1} marginRight={2} marginLeft={1} />
            <Text fontFamily="Poppin">
              Must match the first password input field.
            </Text>
          </Box>
        )}
      </FormControl>

      <FormControl id="avatar">
        <FormLabel>Upload Your Avatar</FormLabel>
        <Input
          type="file"
          p={1.5}
          onChange={(e) => {
            postDetials(e.target.files[0]);
          }}
        />
      </FormControl>
      <Button
        width="100%"
        isLoading={avatarLoading}
        loadingText="Loading"
        onClick={handleSubmit}
        backgroundColor="blue.100"
        disabled={!validName || !validEmail || !validPassword || !validMatch}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Register;
