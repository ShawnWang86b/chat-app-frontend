import React from "react";
import { useState, useEffect, useRef } from "react";
import {
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
import {
  USER_REGEX,
  PWD_REGEX,
  EMAIL_REGEX,
  REGISTER_URL,
} from "../../constants/register";

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
    console.log(nameRef.current);
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(name));
    console.log("validName", validName);
  }, [name]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    console.log("email", email);
  }, [email]);

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
          console.log(data);
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
      console.log("name", name);
      console.log("email", email);
      console.log("password", password);
      console.log("confirmPassword", confirmPassword);
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
      {console.log("renderTime", 1)}
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          ref={nameRef}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          placeholder="Enter Your Email Address"
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
            placeholder="Enter password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handlePasswordShowClick}>
              {passwordShow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
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
          />
          <InputRightElement width="4.5rem">
            <Button size="sm" onClick={handlePasswordConfirmShowClick}>
              {passwordConfirmShow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
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
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Register;
