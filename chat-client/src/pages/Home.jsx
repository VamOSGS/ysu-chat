import { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Container,
  Flex,
  Center,
  Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
export default function Home() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const handleEnterChat = (data) => {
    console.log(data);
    localStorage.setItem('username', data.username);
    navigate('/chat');
  };

  return (
    <Center w='100vw' h='100vh' alignItems='center'>
      <Box textAlign='center'>
        <Heading mb={4}>Welcome to Chat</Heading>
        <Flex as='form' onSubmit={handleSubmit(handleEnterChat)}>
          <Input
            placeholder='Enter your username'
            w='300px'
            mr={2}
            {...register('username', { required: true })}
          />
          <Button type='submit'>Enter Chat</Button>
        </Flex>
      </Box>
    </Center>
  );
}
