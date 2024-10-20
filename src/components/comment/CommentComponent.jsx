import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useCustomLogin from '../../hooks/useCustomLogin.jsx';
import { commentDelete, commentModify, commentRegister, getComment } from "../../api/commentApi.jsx";

const CommentComponent = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentContent, setEditingCommentContent] = useState('');
    const { loginState } = useCustomLogin();

    useEffect(() => {
        loadComments();
    }, [postId]);

    const loadComments = async () => {
        try {
            const response = await getComment(postId);
            setComments(response.data || []);
        } catch (error) {
            console.error("Failed to load comments", error);
            setComments([]);
        }
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim()) {
            try {
                await commentRegister({ content: newComment, email: loginState.email });
                setNewComment('');
                loadComments();
            } catch (error) {
                console.error("Failed to submit comment", error);
            }
        }
    };

    const handleEditComment = (comment) => {
        setEditingCommentId(comment.id);
        setEditingCommentContent(comment.content);
    };

    const handleUpdateComment = async () => {
        try {
            await commentModify({ id: editingCommentId, content: editingCommentContent, email: loginState.email });
            setEditingCommentId(null);
            setEditingCommentContent('');
            loadComments();
        } catch (error) {
            console.error("Failed to update comment", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await commentDelete(commentId);
            loadComments();
        } catch (error) {
            console.error("Failed to delete comment", error);
        }
    };

    return (
        <div>
            {loginState.isLoggedIn && (
                <>
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
                </>
            )}

            <List>
                {comments.length === 0 ? (
                    <ListItem>
                        <ListItemText primary="아직 작성된 댓글이 없습니다." />
                    </ListItem>
                ) : (
                    Array.isArray(comments) && comments.map((comment) => (
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
                            {loginState.isLoggedIn && (
                                <>
                                    <IconButton onClick={() => handleEditComment(comment)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteComment(comment.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                        </ListItem>
                    ))
                )}
            </List>
        </div>
    );
};

export default CommentComponent;
