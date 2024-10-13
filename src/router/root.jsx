import {lazy, Suspense} from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import postRouter from "./postRouter.jsx";
import notificationRouter from "./notificationRouter.jsx";
import memberRouter from "./userRouter.jsx";

const Loading = <Box sx={{ display: 'flex' }}><CircularProgress /></Box>

const Main = lazy(()=> import("../pages/MainPage.jsx"))
const ListBasic = lazy(()=> import("../pages/post/list/ListBasicPage.jsx"))
const PostIndex = lazy(()=> import("../pages/post/IndexPage.jsx"))
const NotificationIndex = lazy(()=> import("../pages/notification/IndexPage.jsx"))
const MemberIndex = lazy(()=> import("../pages/user/IndexPage.jsx"))

const root = createBrowserRouter([
  {
    path:'',
    element:<Suspense fallback={Loading}><Main/></Suspense>,
    children:[
      {
        path: 'list',
        element: <Suspense fallback={Loading}><ListBasic/></Suspense>
      },
      {
        path: '',
        element: <Navigate replace to={'list'}/>
      },
      {
        path: 'list/latest',
        element: ''
      }
    ]
  },
  {
    path:'post',
    element:<Suspense fallback={Loading}><PostIndex/></Suspense>,
    children: postRouter()
  },
  {
    path:'notification',
    element:<Suspense fallback={Loading}><NotificationIndex/></Suspense>,
    children: notificationRouter()
  },
  {
    path:'users',
    element:<Suspense fallback={Loading}><MemberIndex/></Suspense>,
    children: memberRouter()
  }
])

export default root