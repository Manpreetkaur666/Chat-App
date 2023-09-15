import React, { useState } from 'react';
import {
  VStack, FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Signup = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [photo, setPhoto] = useState();
  const [loading, setLoading] = useState(false)
  const toast = useToast();
  const history = useHistory();

  const [show, setShow] = useState(false);

  function Toast(title, status, description) {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
      position: 'bottom',
    });
  }

  const postDetails = (photo) => {
    setLoading(true);
    if (photo === undefined) {
      Toast('Please select an Image', 'warning');
      return;
    }

    if (photo.type === 'image/jpeg' || photo.type === 'image/png') {
      const data = new FormData();
      data.append("file", photo);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "manpreetcoder");
      fetch("https://api.cloudinary.com/v1_1/manpreetcoder/image/upload", {
        method: 'post',
        body: data,
        origin: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => res.json())
        .then(data => {
          setPhoto(data.url.toString());
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      Toast('Please select an Image', 'warning');
      setLoading(false);
      return;
    }
  }

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      Toast('Please enter all fields', 'warning');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Toast('Passwords does not match', 'warning');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        }
      }

      const { data } = await axios.post('/auth/register',
        { name, email, password, photo },
        config);
      Toast("Registeration Successfull", "success");
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      history.push('/chats');

    } catch (error) {
      Toast('Error Occured!', 'error', error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <VStack
      spacing={5}
      className='register'
    >
      <FormControl isRequired >
        <FormLabel>Name</FormLabel>
        <Input placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Email address</FormLabel>
        <Input type='email' placeholder="Enter Your Email address"
          onChange={(e) => setEmail(e.target.value)} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={show ? 'text' : 'password'} placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)} />
          <InputRightElement width="5rem">
            <Button h="1.7rem" size="sm" className='show'
              onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input type={show ? 'text' : 'password'} placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)} />
          <InputRightElement width="5rem">
            <Button h="1.7rem" size="sm" className='show'
              onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired id="photo">
        <FormLabel>Photo</FormLabel>
        <Input type='file' placeholder="Upload your photo" p={1.5}
          accept='image/*'
          onChange={(e) => postDetails(e.target.files[0])} />
      </FormControl>

      <Button
        className='submit-button'
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}>Sign Up</Button>
    </VStack>
  )
}

export default Signup