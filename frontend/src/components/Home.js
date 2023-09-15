import React from 'react';
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';



export const Home = () => {
  return (
    <Container maxW='xl' centerContent className='home'>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="#128C7E"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px">
        <Text className='title' align="center" fontSize="4xl" fontFamily="Work sans" color="black">Chit Chat</Text>
      </Box>
      <Box bg="#128C7E" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant='soft-rounded' isFitted colorScheme='green'>
          <TabList mb="1em">
            <Tab color="black">Login</Tab>
            <Tab color="black">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
             <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>

  )
}

