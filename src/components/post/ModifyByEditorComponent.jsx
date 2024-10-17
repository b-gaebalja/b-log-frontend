import React, {useEffect, useRef, useState} from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript.min.js';
import useCustomLogin from "../../hooks/useCustomLogin.jsx";
import {getPost, patchModify} from "../../api/postApi.js";
import {postAdd} from "../../api/imageApi.js";
import ResultModal from "../common/ResultModal.jsx";

export default function ModifyByEditorComponent() {
    const editorRef = useRef(null);
    const editorInstance = useRef(null);
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const contentForModify = useSelector(state => state.postSlice);
    const {loginState, doLogout, moveToPath, isLogin, moveToLoginReturn} = useCustomLogin();
    const [imagePreviews, setImagePreviews] = useState([]);
    const [result, setResult] = useState(false);
    const [redirectPath, setRedirectPath] = useState('');
    const {id} = useParams();

    if (!isLogin) {
        return moveToLoginReturn();
    }

    useEffect(() => {
        getPost(id).then(response => {
            const postData = response.data;
            setContent(postData.content);
            if (editorInstance.current) {
                editorInstance.current.setMarkdown(postData.content); // 에디터 상태 설정
            }
        }).catch(error => {
            console.error('기존 게시글 불러오기에 실패했습니다.', error);
        });
    }, [id]);

    useEffect(() => {
        if (editorRef.current) {
            editorInstance.current = new Editor({
                el: editorRef.current,
                toolbarItems: [
                    ['heading', 'bold', 'italic', 'strike'],
                    ['hr', 'quote'],
                    ['ul', 'ol', 'task', 'indent', 'outdent'],
                    ['table', 'image', 'link'],
                    ['code', 'codeblock'],
                    ['scrollSync'],
                ],
                previewStyle: 'vertical',
                height: '500px',
                initialValue: content, // 에디터 초기값 설정
                theme: 'dark',
            });

            editorInstance.current.addHook('addImageBlobHook', async (blob, callback) => {
                const formData = new FormData();
                formData.append('image', blob);
                formData.append('targetType', 'POST');
                formData.append('targetId', id);

                postAdd(formData).then(response => {
                    const imageUrl = response.data.url;
                    setImagePreviews(prev => [...prev, imageUrl]);
                    callback(imageUrl, blob.name);
                }).catch((error) => {
                    console.error(error);
                    alert('이미지 수정에 실패했습니다.');
                });
            });

            editorInstance.current.on('change', () => {
                // 상태를 에디터 인스턴스에서 직접 가져와 업데이트
                setContent(editorInstance.current.getMarkdown());
            });
        }

        return () => {
            if (editorInstance.current) {
                editorInstance.current.destroy();
            }
        };
    }, []);

    const handleSubmit = () => {
        const formData = new FormData();

        formData.append('id', id);
        formData.append('content', content);

        patchModify(formData).then(() => {
            setResult(true);
            setRedirectPath('../' + id);
        }).catch((error) => {
            console.log(error);
            alert('게시글 수정에 실패했습니다.');
        });
    };

    const closeModal = () => {
        setResult(false);
        navigate(redirectPath);
    };

    useEffect(() => {
        if (contentForModify) {
            Prism.highlightAll();
        }
    }, [contentForModify, content]);

    return (
        <div>
            <div ref={editorRef}></div>
            <Button onClick={handleSubmit}>수정하기</Button>
            {result ? (
                <ResultModal
                    title={'게시글 수정'}
                    content={'게시글이 수정되었습니다.'}
                    handleClose={closeModal}
                    open={result}
                />
            ) : null}
        </div>
    );
}
