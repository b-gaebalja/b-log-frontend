import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { commentDelete, commentModify, commentRegister, getComment } from "../../api/commentApi.js";
import useCustomLogin from '../../hooks/useCustomLogin.jsx';

const CommentComponent = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentContent, setEditingCommentContent] = useState('');
    const [replyToCommentId, setReplyToCommentId] = useState(null); // 대댓글 입력창 표시 여부
    const { loginState, moveToLoginReturn, isLogin } = useCustomLogin();

    useEffect(() => {
        loadComments();
    }, [postId]);

    const loadComments = async () => {
        try {
            const response = await getComment(postId);
            if (response?.data) {
                setComments(response.data);
            }
        } catch (error) {
            console.error("Failed to load comments", error);
            setComments([]);
        }
    };

    const handleCommentSubmit = async (parentId = null) => {
        if (!isLogin) {
            return moveToLoginReturn();
        }

        const commentContent = parentId ? editingCommentContent : newComment;

        if (commentContent.trim()) {
            try {
                await commentRegister({
                    content: commentContent,
                    email: loginState.email,
                    postId: postId,
                    parentId: parentId // parentId를 포함시킴
                });
                if (parentId) {
                    setReplyToCommentId(null); // 대댓글 입력 후 초기화
                    setEditingCommentContent(''); // 대댓글 입력 초기화
                } else {
                    setNewComment(''); // 일반 댓글 입력 초기화
                }
                loadComments();
            } catch (error) {
                console.error("Failed to submit comment", error);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleCommentSubmit();
        }
    };

    const handleEditComment = (comment) => {
        setEditingCommentId(comment.id);
        setEditingCommentContent(comment.content);
    };

    const handleUpdateComment = async () => {
        try {
            await commentModify({ id: editingCommentId, content: editingCommentContent, email: loginState.email , postId:postId});
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

    const toggleReplyInput = (commentId) => {
        setReplyToCommentId(replyToCommentId === commentId ? null : commentId);
    };

    return (
        <Box>
            {/* 댓글 목록 */}
            <List>
                {comments.length === 0 ? (
                    <ListItem>
                        <ListItemText primary="아직 작성된 댓글이 없습니다." />
                    </ListItem>
                ) : (
                    Array.isArray(comments) && comments.map((comment) => (
                        <ListItem key={comment.id} alignItems="flex-start" sx={{ borderBottom: '1px solid #ddd' }}>
                            {editingCommentId === comment.id ? (
                                <Box>
                                    <TextField
                                        value={editingCommentContent}
                                        onChange={(e) => setEditingCommentContent(e.target.value)}
                                        fullWidth
                                    />
                                    <Button onClick={handleUpdateComment} variant="contained" sx={{ mt: 1 }}>수정</Button>
                                </Box>
                            ) : (
                                <ListItemText
                                    primary={
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography variant="body2" color="textSecondary">
                                                {comment.user.email}
                                            </Typography>
                                            <Typography variant="body2">
                                                {comment.content}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    }
                                />
                            )}
                            {isLogin && (
                                <Box>
                                    <IconButton onClick={() => handleEditComment(comment)} size="small">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteComment(comment.id)} size="small">
                                        <DeleteIcon />
                                    </IconButton>
                                    <Button
                                        variant="text"
                                        onClick={() => toggleReplyInput(comment.id)}
                                        sx={{ textTransform: 'none', fontSize: '0.875rem' }}
                                    >
                                        답글 달기
                                    </Button>
                                    {/* 대댓글 입력창 */}
                                    {replyToCommentId === comment.id && (
                                        <Box display="flex" alignItems="center" mt={1}>
                                            <TextField
                                                label="대댓글을 입력하세요"
                                                fullWidth
                                                multiline
                                                rows={1}
                                                variant="outlined"
                                                value={editingCommentContent}
                                                onChange={(e) => setEditingCommentContent(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(comment.id)} // parentId를 전달
                                            />
                                            <Button
                                                onClick={() => handleCommentSubmit(comment.id)} // parentId를 전달
                                                variant="contained"
                                                color="primary"
                                                sx={{ ml: 2, height: 'fit-content' }}
                                            >
                                                등록
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </ListItem>
                    ))
                )}
            </List>

            {/* 댓글 입력창 */}
            <Box display="flex" alignItems="center" mb={2}>
                <TextField
                    label="댓글을 입력하세요"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    fullWidth
                    multiline
                    rows={1}
                    variant="outlined"
                    onKeyPress={handleKeyPress}
                    onFocus={() => !isLogin && moveToLoginReturn("/users/login")}
                />
                <Button
                    onClick={() => handleCommentSubmit()} // 일반 댓글 제출
                    variant="contained"
                    color="primary"
                    sx={{ ml: 2, height: 'fit-content' }}
                >
                    등록
                </Button>
            </Box>
        </Box>
    );
};


export default CommentComponent;
