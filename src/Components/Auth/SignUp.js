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
import { useState } from "react";

const SignUp = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordConfirmShow, setPasswordConfirmShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [avatar, setAvatar] = useState();
  const [avatarLoading, setAvatarLoading] = useState(false);
  const toast = useToast();
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
      return;
    }
    if (avatar.type === "image/jpeg" || avatar.type === "image/png") {
      const data = new FormData();
      data.append("file", avatar);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dmfmwtxje");
      fetch("https://api.cloudinary.com/v1_1/dmfmwtxje/image/upload", {
        method: "post",
        body: data,
      })
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
  return (
    <VStack spacing="1em">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Enter Your Name" />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input placeholder="Enter Your Email Address" />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={passwordShow ? "text" : "password"}
            placeholder="Enter password"
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
            placeholder="Enter Password Again"
            type={passwordConfirmShow ? "text" : "password"}
          />
          <InputRightElement width="4.5rem">
            <Button size="sm" onClick={handlePasswordConfirmShowClick}>
              {passwordConfirmShow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="avatar" isRequired>
        <FormLabel>Upload Your Avatar</FormLabel>
        <Input
          type="file"
          p={1.5}
          onChange={(e) => {
            postDetials(e.target.files[0]);
          }}
        />
      </FormControl>
      <Button width="100%" colorScheme="linkedin" isLoading={avatarLoading}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
