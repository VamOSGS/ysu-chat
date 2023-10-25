import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import Chat from './Chat';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/chat',
    Component: Chat,
  },
]);

export default router;
