import React, { useState, useEffect } from 'react';
import { getComment, commentRegister, commentModify, commentDelete } from './api/commentApi.jsx';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useCustomLogin from '../../hooks/useCustomLogin.jsx'; // 로그인 상태를 가져오는 훅

const CommentComponent = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentContent, setEditingCommentContent] = useState('');
    const { loginState } = useCustomLogin(); // 로그인 상태와 이메일 가져오기

    useEffect(() => {
        loadComments();
    }, [postId]);

    const loadComments = async () => {
        const response = await getComment(postId);
        setComments(response.data);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim()) {
            await commentRegister({ content: newComment, email: loginState.email }); // 로그인한 사용자의 이메일 사용
            setNewComment('');
            loadComments();
        }
    };

    const handleEditComment = (comment) => {
        setEditingCommentId(comment.id);
        setEditingCommentContent(comment.content);
    };

    const handleUpdateComment = async () => {
        await commentModify({ id: editingCommentId, content: editingCommentContent, email: loginState.email }); // 수정 시에도 이메일 사용
        setEditingCommentId(null);
        setEditingCommentContent('');
        loadComments();
    };

    const handleDeleteComment = async (commentId) => {
        await commentDelete(commentId);
        loadComments();
    };

    return (
        <div>
            <TextField
                label="댓글 작성"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
            />
            <Button onClick={handleCommentSubmit} variant="contained" color="primary">
                댓글 작성
            </Button>

            <List>
                {comments.map((comment) => (
                    <ListItem key={comment.id}>
                        {editingCommentId === comment.id ? (
                            <div>
                                <TextField
                                    value={editingCommentContent}
                                    onChange={(e) => setEditingCommentContent(e.target.value)}
                                    fullWidth
                                />
                                <Button onClick={handleUpdateComment}>수정</Button>
                            </div>
                        ) : (
                            <ListItemText primary={comment.content} />
                        )}
                        <IconButton onClick={() => handleEditComment(comment)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteComment(comment.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default CommentComponent;
