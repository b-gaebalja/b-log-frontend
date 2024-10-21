import React, { useEffect, useState } from 'react';
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ShareMenu from "../menus/share/ShareMenu.jsx";
import ImageList from "@mui/material/ImageList";
import Pagination from "@mui/material/Pagination";
import { addBookmark, getBookmarks, getPost, removeBookmark } from "../../api/postApi.js";
import useCustomLogin from "../../hooks/useCustomLogin.jsx";
import Button from "@mui/material/Button";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

function ListBookmarkedComponent() {
    const [postData, setPostData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [bookmarks, setBookmarks] = useState([]);
    const { loginState, isLogin } = useCustomLogin();
    const [page, setPage] = useState(1); // 페이지 상태 추가
    const postsPerPage = 10;

    const fetchBookmarkedPosts = async () => {
        try {
            const response = await getBookmarks(loginState.id);
            if (response && response.data) {
                const bookmarkIds = Array.from(new Set(response.data));
                console.log("포스트 아이디: ", bookmarkIds);

                const posts = await Promise.all(
                    bookmarkIds.map(async id => {
                        const postResponse = await getPost(id);
                        console.log(`Post ID: ${id}, Response: `, postResponse.data);
                        return postResponse.data; // 전체 데이터 반환
                    })
                );

                const mappedPosts = posts.map((post, index) => {
                    // 포스트 ID가 없으면 북마크 ID를 사용
                    const validId = post && post.id ? post.id : bookmarkIds[index];
                    return {
                        id: validId,
                        img: post.representativeImageUrl || 'https://via.placeholder.com/248',
                        title: post.content || '제목 없음',
                        author: '@' + (post.username || '알 수 없음'),
                        isBookmarked: bookmarkIds.includes(validId),
                    };
                }).filter(post => post.id); // id가 유효한 포스트만 필터링

                setPostData(mappedPosts);
                setTotalPages(Math.ceil(mappedPosts.length / postsPerPage));
                setBookmarks(bookmarkIds); // 북마크 상태 업데이트
            } else {
                console.error("No data received:", response);
            }
        } catch (error) {
            console.error("Failed to fetch bookmarked posts:", error);
        }
    };


    useEffect(() => {
        if (isLogin) {
            fetchBookmarkedPosts();
        }
    }, [isLogin]);

    const handlePageChange = (event, value) => {
        setPage(value);
        fetchBookmarkedPosts(); // 새 페이지에 맞게 게시글 재조회
    };

    const handleBookmark = async (postId) => {
        const currentUserId = loginState.id; // 현재 로그인된 사용자 ID
        const currentUrl = window.location.href; // 현재 페이지 URL
        console.log("핸들북마크 호출 진입시 포스트 아이디: ", postId)
        try {
            if (bookmarks.includes(postId)) {
                console.log("북마크 존재");
                await removeBookmark(postId);
                setBookmarks(bookmarks.filter(id => id !== postId));
                console.log("북마크 표시 제거");
            } else {
                console.log("포스트 아이디: ", postId)
                await addBookmark(postId, currentUserId, currentUrl);
                console.log("북마크 추가");
                setBookmarks([...bookmarks, postId]);
                console.log("북마크 표시 완료");
            }
        } catch (error) {
            console.error("북마크 실패:", error);
        }
    };

    return (
        <div>
            <ImageList sx={{ width: 1300, height: 650 }}>
                <ImageListItem key="Subheader" cols={2}>
                    <ListSubheader component="div">내 스크랩 포스트</ListSubheader>
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

export default ListBookmarkedComponent;
