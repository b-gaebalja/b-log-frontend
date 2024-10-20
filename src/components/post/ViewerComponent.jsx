import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
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
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import useCustomMove from "../../hooks/useCustomMove.jsx";
import { useParams } from "react-router-dom";
import { getPost } from "../../api/postApi.js";
import SnsShareComponent2 from "../../components/post/SnsShareComponent2";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CopyUrlComponent from "./CopyUrlComponent.jsx";
import ShareComponent from "./ShareComponent.jsx";

const ViewerComponent = () => {
    const actions = [
        { icon: <FileCopyIcon />, name: '스크랩하기' },
        { icon: <ShareIcon />, name: '공유하기' },
        { icon: <AutoFixHighIcon />, name: '수정하기' },
        { icon: <SaveIcon />, name: '저장하기' },
    ];

    const viewerRef = useRef(null);
    const viewerInstance = useRef(null);
    const { moveToPath } = useCustomMove();
    const [content, setContent] = useState();
    const [openShareDialog, setOpenShareDialog] = useState(false);
    const { id } = useParams();
    console.log("id: ", id);

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

    const handleShare = async () => {
        try {
            const response = await axios.post(`/sharePosts/${id}/shares`);
            if (response.status === 201) {
                alert('스크랩 성공');
            }
        } catch (error) {
            console.error('스크랩 실패:', error.response);
            alert('스크랩 실패');
        }
    };

    return (
        <Box sx={{ position: 'relative', height: '100vh' }}>
            <div ref={viewerRef} style={{ flex: 1 }}></div>
            <Box sx={{ position: 'absolute', bottom: '50%', right: 16, transform: 'translateY(50%)' }}>
                <SpeedDial
                    ariaLabel="SpeedDial openIcon example"
                    icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => {
                                console.log(`클릭함 ${action.name}`);
                                if (action.name === '수정하기') {
                                    moveToPath(`/post/modify/${id}`);
                                } else if (action.name === '공유하기') {
                                    setOpenShareDialog(true);
                                } else if (action.name === '스크랩하기') {
                                    handleShare();
                                }
                            }}
                        />
                    ))}
                </SpeedDial>
            </Box>

            {/* 공유하기 모달 */}
            <Dialog
                open={openShareDialog}
                onClose={() => setOpenShareDialog(false)}
                sx={{ '& .MuiDialog-paper': { width: '350px', maxWidth: '350px' } }} // 너비 설정
            >
                <DialogTitle>공유하기</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/*<SnsShareComponent2 />*/}
                    {/*<CopyUrlComponent/>*/}
                    <ShareComponent/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenShareDialog(false)}>닫기</Button>
                </DialogActions>
            </Dialog>
            <CommentComponent postId={id}/>
        </Box>
    );
};

export default ViewerComponent;
