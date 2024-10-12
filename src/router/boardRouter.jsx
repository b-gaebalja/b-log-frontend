import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";

const Loading = <Box sx={{display: 'flex'}}><CircularProgress/></Box>
const BoardAdd = lazy(() => import("../pages/board/AddPage.jsx"))
const BoardListMy = lazy(() => import("../pages/board/list/ListMyPage.jsx"))
const BoardScrap = lazy(() => import("../pages/board/ScrapPage.jsx"))
const BoardRead = lazy(() => import("../pages/board/ReadPage.jsx"))
const BoardAddByEditor = lazy(() => import("../pages/board/AddByEditorPage.jsx"))
const BoardModifyByEditor = lazy(() => import("../pages/board/ModifyByEditorPage.jsx"))
const BoardView = lazy(() => import("../pages/board/ViewerPage.jsx"))

const BoardRouter = () => {
    return [
        {
            path: 'add',
            element: <Suspense fallback={Loading}><BoardAddByEditor/></Suspense>
        },
        {
            path: 'listMy',
            element: <Suspense fallback={Loading}><BoardListMy/></Suspense>
        },
        {
            path: '',
            element: <Navigate replace to={'listMy'}/>
        },
        {
            path: 'scrap',
            element: <Suspense fallback={Loading}><BoardScrap/></Suspense>
        }
        ,
        {
            path: 'read/:id',
            element: <Suspense fallback={Loading}><BoardRead/></Suspense>
        },
        {
            path: ':id',
            element: <Suspense fallback={Loading}><BoardView/></Suspense>
        }
        ,
        {
            path: 'modify/:id',
            element: <Suspense fallback={Loading}><BoardModifyByEditor/></Suspense>
        }
    ]
}

export default BoardRouter;
