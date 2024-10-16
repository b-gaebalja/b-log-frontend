import React, {useEffect, useState} from 'react';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Pagination from "@mui/material/Pagination";
import ShareMyMenu from "../../menus/share/ShareMyMenu.jsx";
import useCustomLogin from "../../../hooks/useCustomLogin.jsx";
import {getMyPosts} from "../../../api/postApi.js";

function ListMyComponent() {
    const {loginState, moveToLoginReturn, isLogin} = useCustomLogin();
    const [postData, setPostData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    if (!isLogin) {
        return moveToLoginReturn();
    }

    const fetchPosts = async (page) => {
        try {
            const response = await getMyPosts(loginState.email, page - 1);
            const {getPostResponses, pageInformation} = response.data;

            const mappedData = getPostResponses.map(post => ({
                id: post.id,
                img: post.representativeImageUrl || 'https://via.placeholder.com/248',
                title: post.content,
                author: '@' + post.username
            }));

            setPostData(mappedData);
            setTotalPages(pageInformation.totalPages);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div>
            <ImageList sx={{width: 1300, height: 650}}>
                <ImageListItem key="Subheader" cols={2}>
                    <ListSubheader component="div">나의 게시글 목록</ListSubheader>
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
                            actionIcon={<ShareMyMenu id={item.id}/>}
                        />
                    </ImageListItem>
                ))}
            </ImageList>

            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{marginTop: 2, display: 'flex', justifyContent: 'center'}}
            />
        </div>
    );
}

export default ListMyComponent;
