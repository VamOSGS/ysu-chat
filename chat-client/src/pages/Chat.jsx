import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { io } from 'socket.io-client';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const ChatApp = () => {
  const [userName, setUserName] = useState('Guest');
  const [messages, setMessages] = useState([
    {
      username: 'Admin',
      message: 'Welcome to the chat!',
    },
  ]);
  const [socket, setSocket] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const sendMessage = (data) => {
    if (data.message) {
      const newMessage = {
        username: userName,
        message: data.message,
      };
      socket.emit('message', newMessage);
      reset();
    }
  };

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('message', (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [messages]);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setUserName(username);
    } else {
      navigate('/');
    }
  }, []);
  const logOut = () => {
    localStorage.removeItem('username');
    navigate('/');
  };
  return (
    <Center w='100vw' h='100vh'>
      <Button onClick={logOut}>Log Out</Button>
      <VStack w='400px' spacing={4} align='center'>
        <Heading>Chat App</Heading>
        <Text fontSize='lg'>
          You are logged in as: <b>{userName}</b>
        </Text>
        <VStack p={4} background='gray.300' w='full' borderRadius={8}>
          {messages.map((msg, index) => (
            <Box
              w='full'
              key={msg.message}
              p={4}
              background='white'
              borderRadius={4}
            >
              <Flex
                w='full'
                justify={msg.username === userName ? 'flex-end' : 'flex-start'}
                key={index}
              >
                <Text fontWeight='bold'>{msg.username}: </Text>
                <Text>{msg.message}</Text>
              </Flex>
              <Divider />
            </Box>
          ))}
        </VStack>
        <Flex w='full' as='form' onSubmit={handleSubmit(sendMessage)}>
          <Input
            type='text'
            placeholder='Message'
            w='full'
            {...register('message', { required: true })}
          />
          <Button type='submit'>Send</Button>
        </Flex>
      </VStack>
    </Center>
  );
};

export default ChatApp;
