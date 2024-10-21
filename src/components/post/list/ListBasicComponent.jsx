import React, { useEffect, useState } from 'react';
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ShareMenu from "../../menus/share/ShareMenu.jsx";
import ImageList from "@mui/material/ImageList";
import { getAllPosts, addBookmark, getBookmarks, removeBookmark } from "../../../api/postApi.js";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import BookmarkIcon from '@mui/icons-material/Bookmark'; // 북마크 아이콘
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import useCustomLogin from "../../../hooks/useCustomLogin.jsx"; // 북마크 해제 아이콘

function ListBasicComponent() {
    const [postData, setPostData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [bookmarks, setBookmarks] = useState([]); // 북마크 유무 체크
    const { loginState, moveToLoginReturn, isLogin } = useCustomLogin();

    const fetchPosts = async (page) => {
        try {
            console.log("포스트 가져오기 시작")
            const response = await getAllPosts(page - 1);
            const { getPostResponses, pageInformation } = response.data;

            const mappedData = getPostResponses.map(post => ({
                id: post.id,
                img: post.representativeImageUrl || 'https://via.placeholder.com/248',
                title: post.content,
                author: '@' + post.username,
                isBookmarked: bookmarks.includes(post.id)
            }));

            setPostData(mappedData);
            setTotalPages(pageInformation.totalPages);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    };

    const fetchBookmarks = async () => {
        try {
            console.log("로그인 아이디: ", loginState.id);
            const response = await getBookmarks(loginState.id);

            //console.log(response.data.getPostResponses);
            // console.log("반환데이터: ", response.data);
            // const bookmarkIds = response.data.map(post => post.id);

            const bookmarkIds = Array.from(new Set(response.data));

            console.log("북마크 아이디: ", bookmarkIds);
            setBookmarks(bookmarkIds);
        } catch (error) {
            console.error("Failed to fetch bookmarks:", error);
        }
    };

    useEffect(() => {
        fetchBookmarks();
        fetchPosts(page);

    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleBookmark = async (postId) => {
        const currentUserId = loginState.id; // 현재 로그인된 사용자 ID
        const currentUrl = window.location.href; // 현재 페이지 URL
        try {
            if (bookmarks.includes(postId)) {
                console.log("북마크 존재");
                // 북마크 해제
                await removeBookmark(postId);
                setBookmarks(bookmarks.filter(id => id !== postId));
                console.log("북마크 표시 제거");
            } else {
                // 북마크 추가
                await addBookmark(postId, currentUserId, currentUrl);
                console.log("북마크 추가");
                if (!bookmarks.includes(postId)) { // 중복 체크
                    console.log("북마크 중복 없음");
                    setBookmarks([...bookmarks, postId]);
                    console.log("북마크 표시 완료");
                }
            }
        } catch (error) {
            console.error("북마크 실패:", error);
        }
    };

    return (
        <div>
            <ImageList sx={{ width: 1300, height: 650 }}>
                <ImageListItem key="Subheader" cols={2}>
                    <ListSubheader component="div">트렌딩 포스트</ListSubheader>
                </ImageListItem>
                {postData.map((item) => (
                    <ImageListItem key={item.id}>
                        <img
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={item.author}
                            actionIcon={
                                <>
                                    <ShareMenu id={item.id} />
                                    <Button onClick={() => handleBookmark(item.id)}>
                                        {item.isBookmarked ? (
                                            <BookmarkIcon style={{ color: 'gold' }} />
                                        ) : (
                                            <BookmarkBorderIcon />
                                        )}
                                    </Button>
                                </>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>

            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
            />
        </div>
    );
}

export default ListBasicComponent;