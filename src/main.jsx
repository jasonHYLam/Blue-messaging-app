import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import { ErrorPage } from '../Components/ErrorPage/ErrorPage';
import { LoginPage } from '../Components/LoginPage/LoginPage';
import { SignupPage } from '../Components/SignupPage/SignupPage';
import { HomePage } from '../Components/HomePage/HomePage';
import { AddFriendWrapper } from '../Components/AddFriendWrapper/AddFriendWrapper';
import { CreateChatWrapper } from '../Components/CreateChatWrapper/CreateChatWrapper';
import { ChatWrapper } from '../Components/ChatWrapper/ChatWrapper';
import { UserProfileWrapper } from '../Components/UserProfileWrapper/UserProfileWrapper';
// import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage/>,
    // element: 
    //PageLayout
    children: [
      {
        path: 'error',
        element: <ErrorPage/>,
      },
      {
        path: 'login',
        // login-signup
        element: < LoginPage />
      },
      {
        path: 'signup',
        // login-signup
        element: < SignupPage />
      },
      {
        path: 'home',
        // login-signup
        element: < HomePage />,
        children: [
          {
            index: true,
            element: < Navigate replace={true} to={`add_friend`} />
          },
          {
            path: 'chats/:chatId',
            element: < ChatWrapper />,
          },
          {
            path: 'user_profile/:userId',
            element: < UserProfileWrapper />,
          },
          {
            path: 'add_friend',
            element: < AddFriendWrapper />
          },
          {
            path: 'create_chat',
            element: < CreateChatWrapper />
          },


        ]
      },
    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
