import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './pages';

export default function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}
