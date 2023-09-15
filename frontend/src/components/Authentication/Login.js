import React, { useState } from 'react';
import {
  VStack, FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)
  const toast = useToast();
  const history = useHistory();

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

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      console.log('I am here now');
      Toast('Please enter all fields', 'warning');
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        }
      };

      const { data } = await axios.post('/auth/login',
        { email, password },
        config);
      Toast('Successfully Login!', 'success');
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

      <FormControl isRequired>
        <FormLabel>Email address</FormLabel>
        <Input type='email' placeholder="Enter Your Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={show ? 'text' : 'password'} placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <InputRightElement width="5rem">
            <Button h="1.7rem" size="sm" className='show'
              onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        className='submit-button'
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}>Log in</Button>
      <Button
        colorScheme='red'
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@example.com")
          setPassword("123456")
        }}
      >Get Guest User Credentials</Button>
    </VStack>
  )
}

export default Login