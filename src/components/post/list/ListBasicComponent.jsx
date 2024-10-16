import React, {useEffect, useState} from 'react';
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ShareMenu from "../../menus/share/ShareMenu.jsx";
import ImageList from "@mui/material/ImageList";
import {getAllPosts} from "../../../api/postApi.js";
import Pagination from "@mui/material/Pagination";

function ListBasicComponent() {
    const [postData, setPostData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = async (page) => {
        try {
            const response = await getAllPosts(page - 1);
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
                            actionIcon={<ShareMenu id={item.id}/>}
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
    )
}

export default ListBasicComponent;