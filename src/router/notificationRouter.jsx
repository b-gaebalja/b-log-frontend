import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";

const Loading = <Box sx={{ display: 'flex' }}><CircularProgress /></Box>
const NotificationList = lazy(()=>import("../pages/notification/ListPage.jsx"))

const NotificationRouter = () => {
  return [
    {
      path: 'list',
      element: <Suspense fallback={Loading}><NotificationList/></Suspense>
    }
  ]
}

export default NotificationRouter;