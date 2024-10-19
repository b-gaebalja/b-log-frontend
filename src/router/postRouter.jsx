import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";

const Loading = <Box sx={{display: 'flex'}}><CircularProgress/></Box>
const postAdd = lazy(() => import("../pages/post/AddPage.jsx"))
const PostListMy = lazy(() => import("../pages/post/list/ListMyPage.jsx"))
const PostScrap = lazy(() => import("../pages/post/ScrapPage.jsx"))
const PostScrap2 = lazy(() => import("../pages/post/ScrapPage2.jsx"))

const PostRead = lazy(() => import("../pages/post/ReadPage.jsx"))
const PostAddByEditor = lazy(() => import("../pages/post/AddByEditorPage.jsx"))
const PostModifyByEditor = lazy(() => import("../pages/post/ModifyByEditorPage.jsx"))
const PostView = lazy(() => import("../pages/post/ViewerPage.jsx"))

const PostRouter = () => {
    return [
        {
            path: 'add',
            element: <Suspense fallback={Loading}><PostAddByEditor/></Suspense>
        },
        {
            path: 'listMy',
            element: <Suspense fallback={Loading}><PostListMy/></Suspense>
        },
        {
            path: '',
            element: <Navigate replace to={'listMy'}/>
        },
        {
            path: 'scrap',
            element: <Suspense fallback={Loading}><PostScrap/></Suspense>
        },
        {
            path: 'scrap2',
            element: <Suspense fallback={Loading}><PostScrap2/></Suspense>
        },
        {
            path: 'read/:id',
            element: <Suspense fallback={Loading}><PostRead/></Suspense>
        },
        {
            path: ':id',
            element: <Suspense fallback={Loading}><PostView/></Suspense>
        },
        {
            path: 'modify/:id',
            element: <Suspense fallback={Loading}><PostModifyByEditor/></Suspense>
        }
    ]
}

export default PostRouter;
