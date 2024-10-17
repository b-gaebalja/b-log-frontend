import React, {useEffect, useRef, useState} from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import 'prismjs/themes/prism.css'; // Prism CSS 임포트
import Prism from 'prismjs'; // Prism JS 임포트
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
import {useParams} from "react-router-dom";
import {getPost} from "../../api/postApi.js";

const ViewerComponent = () => {
    const actions = [
        {icon: <FileCopyIcon/>, name: '복사하기'},
        {icon: <SaveIcon/>, name: '저장하기'},
        {icon: <AutoFixHighIcon/>, name: '수정하기'},
        {icon: <ShareIcon/>, name: '공유하기'},
    ];

    const viewerRef = useRef(null);
    const viewerInstance = useRef(null);
    const {moveToPath} = useCustomMove();
    const [content, setContent] = useState()


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
            // Prism 하이라이팅 적용
            Prism.highlightAll();
        }
    }, [content]);

    const {id} = useParams();

    useEffect(() => {
        getPost(id).then(response => {
            setContent(response.data.content);
        })
            .catch((error) => {
                console.error(error);
            })
    }, [id]);

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
                                console.log(`클릭함 ${action.name}`)
                                if (action.name === '수정하기') {
                                    moveToPath(`/post/modify/${id}`);
                                }
                            }}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </Box>
    );
};

export default ViewerComponent;
