import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";

const Loading = <Box sx={{display: 'flex'}}><CircularProgress/></Box>
const UserLogin = lazy(() => import("../pages/user/LoginPage.jsx"))
const MemberJoin = lazy(() => import("../pages/user/JoinPage.jsx"))
const KakaoRedirect = lazy(() => import("../pages/user/KakaoRedirectPage.jsx"))
const UserAccount = lazy(()=> import("../pages/user/AccountPage.jsx"))

const UserRouter = () => {
  return [
    {
      path: 'login',
      element: <Suspense fallback={Loading}><UserLogin/></Suspense>
    },
    {
      path: '',
      element: <Navigate replace to={'login'}/>
    },
    {
      path: 'join',
      element: <Suspense fallback={Loading}><MemberJoin/></Suspense>
    },
    {
      path: 'kakao',
      element: <Suspense fallback={Loading}><KakaoRedirect/></Suspense>
    },
    {
      path: 'account',
      element: <Suspense fallback={Loading}><UserAccount/></Suspense>
    }
  ]
}
export default UserRouter