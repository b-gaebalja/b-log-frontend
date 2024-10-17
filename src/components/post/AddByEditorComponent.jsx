import React, {useEffect, useRef, useState} from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript.min.js';
import {patchComplete, postRegister} from "../../api/postApi.js";
import {postAdd} from "../../api/imageApi.js";
import useCustomLogin from "../../hooks/useCustomLogin.jsx";
import ResultModal from "../common/ResultModal.jsx";

export default function AddByEditorComponent() {
    const editorRef = useRef(null);
    const editorInstance = useRef(null);
    const idRef = useRef(null);
    const [content, setContent] = useState('최초 등록');
    const {loginState, doLogout, moveToPath, isLogin, moveToLoginReturn}
        = useCustomLogin()
    const [imagePreviews, setImagePreviews] = useState([]);
    const navigate = useNavigate()
    const [result, setResult] = useState(false)
    const [redirectPath, setRedirectPath] = useState('');

    if (!isLogin) {
        return moveToLoginReturn()
    }

    const registerPost = async () => {
        try {
            const formData = new FormData();
            formData.append('email', loginState.email);
            formData.append('content', content);

            const response = await postRegister(formData);
            idRef.current = response.headers.location.split('/').pop();
        } catch (error) {
            console.error(error);
            alert('게시글 초기화에 실패했습니다.');
        }
    };

    useEffect(() => {
        if (loginState.email) {
            registerPost();
        }
    }, [loginState.email]);

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
                initialValue: '',
                theme: 'dark',
            });

            editorInstance.current.addHook('addImageBlobHook', async (blob, callback) => {
                const formData = new FormData();
                formData.append('image', blob);
                formData.append('targetType', 'POST');
                formData.append('targetId', idRef.current);

                postAdd(formData).then(response => {
                    const imageUrl = response.data.url
                    setImagePreviews(prev => [...prev, imageUrl]);
                    callback(imageUrl, blob.name);
                })
                    .catch((error) => {
                        console.error(error);
                        alert('이미지 저장에 실패했습니다.')
                    })
            });

            editorInstance.current.on('change', () => {
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

        formData.append('id', idRef.current);
        formData.append('content', content);

        patchComplete(formData).then(() => {
            setResult(true)
            setRedirectPath('../' + idRef.current);
        })
            .catch((error) => {
                console.log(error);
                alert('게시글 등록에 실패했습니다.')
            })
    };

    const closeModal = () => {
        setResult(false)
        navigate(redirectPath)
    }

    useEffect(() => {
        if (content) {
            Prism.highlightAll();
        }
    }, [content]);

    return (
        <div>
            <div ref={editorRef}></div>
            <Button
                onClick={handleSubmit}
            >작성하기</Button>
            {result
                ? <ResultModal
                    title={'게시글 등록'}
                    content={'게시글이 등록되었습니다.'}
                    handleClose={closeModal}
                    open={result}
                />
                : <></>
            }
        </div>
    );
}
