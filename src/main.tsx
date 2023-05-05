import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './pages/Login/Login.tsx';
import Profile from './pages/Profile/Profile.tsx';
import Feed from './pages/Feed/Feed.tsx';
import Friends from './pages/Friends/Friends.tsx';
import Dialogs from './pages/Dialogs/Dialogs.tsx';
import Core from './core/Core.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        element: <Core />,
        children: [
          {
            path: '/:id',
            element: <Profile />,
          },
          {
            path: '/feed',
            element: <Feed />,
          },
          {
            path: '/friends',
            element: <Friends />,
          },
          {
            path: '/dialogs',
            element: <Dialogs />,
          },
        ],
      },
    ],
  },
]);

const rootElement = document.getElementById('root') as HTMLElement;

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
