import React, {useEffect, useRef, useState} from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import EditIcon from "@mui/icons-material/Edit";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import useCustomMove from "../../hooks/useCustomMove.jsx";
import {useParams} from "react-router-dom";
import {addBookmark, deletePost, getBookmarks, getPost, removeBookmark} from "../../api/postApi.js";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import ShareComponent from "./ShareComponent.jsx";
import useCustomLogin from "../../hooks/useCustomLogin.jsx";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const ViewerComponent = () => {
    const actions = [
        {icon: <FileCopyIcon/>, name: '스크랩하기'},
        {icon: <BookmarkIcon/>, name: '공유하기'},
        {icon: <AutoFixHighIcon/>, name: '수정하기'},
        {icon: <DeleteIcon/>, name: '삭제하기'},
    ];

    const { loginState, moveToLoginReturn, isLogin } = useCustomLogin();
    const viewerRef = useRef(null);
    const viewerInstance = useRef(null);
    const {moveToPath} = useCustomMove();
    const [content, setContent] = useState();
    const [openShareDialog, setOpenShareDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const {id} = useParams();

    const [bookmarks, setBookmarks] = useState([]);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const fetchBookmarks = async () => {
        if (!isLogin) return;
        try {
            const response = await getBookmarks(loginState.id);
            const bookmarkIds = Array.from(new Set(response.data));
            setBookmarks(bookmarkIds);
            // 현재 포스트가 북마크되어 있는지 확인
            setIsBookmarked(bookmarkIds.includes(Number(id)));
        } catch (error) {
            console.error("Failed to fetch bookmarks:", error);
        }
    };

    useEffect(() => {
        fetchBookmarks(); // 컴포넌트 마운트 시 북마크 로드
    }, [isLogin]); // isLogin이 변경될 때마다 북마크와 게시글 재조회


    useEffect(() => {
        if (viewerRef.current) {
            viewerInstance.current = Editor.factory({
                el: viewerRef.current,
                viewer: true,
                height: '500px',
                initialValue: content || '# hello',
            });
        }

        return () => {
            if (viewerInstance.current) {
                viewerInstance.current.destroy();
            }
        };
    }, [content]);

    useEffect(() => {
        if (viewerInstance.current) {
            Prism.highlightAll();
        }
    }, [content]);

    useEffect(() => {
        getPost(id).then(response => {
            setContent(response.data.content);
        }).catch((error) => {
            console.error(error);
        });
    }, [id]);

    const handleDelete = async () => {
        try {
            await deletePost(id);
            moveToPath(`/post/listMy`);
        } catch (error) {
            console.error('삭제 실패:', error);
        }
    };

    const handleBookmark = async () => {

        const currentUserId = loginState.id; // 현재 로그인된 사용자 ID
        const currentUrl = window.location.href; // 현재 페이지 URL

        try {
            if (isBookmarked) {
                await removeBookmark(id);
                setBookmarks(bookmarks.filter(bookmarkId => bookmarkId !== Number(id)));
                setIsBookmarked(false);
            } else {
                await addBookmark(id, currentUserId, currentUrl);
                setBookmarks([...bookmarks, Number(id)]);
                setIsBookmarked(true);
            }
        } catch (error) {
            console.error("북마크 실패:", error);
        }
    };

    return (
        <Box sx={{position: 'relative', height: '100vh'}}>
            <div ref={viewerRef} style={{flex: 1}}></div>
            <Box sx={{position: 'absolute', bottom: '50%', right: 16, transform: 'translateY(50%)'}}>
                <SpeedDial
                    ariaLabel="SpeedDial openIcon example"
                    icon={<SpeedDialIcon openIcon={<EditIcon/>}/>}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => {
                                console.log(`클릭함 ${action.name}`);
                                if (action.name === '삭제하기') {
                                    setOpenDeleteDialog(true);
                                } else if (action.name === '수정하기') {
                                    moveToPath(`/post/modify/${id}`);
                                } else if (action.name === '공유하기') {
                                    setOpenShareDialog(true);
                                } else if (action.name === '스크랩하기') {
                                    handleBookmark(id);
                                }
                            }}
                        />
                    ))}
                </SpeedDial>

            </Box>

            {/* 삭제하기 모달 */}
            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
            >
                <DialogTitle>삭제 확인</DialogTitle>
                <DialogContent>
                    정말 삭제하시겠습니까?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>취소</Button>
                    <Button onClick={handleDelete} color="error">삭제</Button>
                </DialogActions>
            </Dialog>

            {/* 공유하기 모달 */}
            <Dialog
                open={openShareDialog}
                onClose={() => setOpenShareDialog(false)}
                sx={{'& .MuiDialog-paper': {width: '350px', maxWidth: '350px'}}} // 너비 설정
            >
                <DialogTitle>공유하기</DialogTitle>
                <DialogContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {/*<SnsShareComponent2 />*/}
                    {/*<CopyUrlComponent/>*/}
                    <ShareComponent/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenShareDialog(false)}>닫기</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ViewerComponent;