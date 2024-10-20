import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ScrapedListComponent2 = ({ sharerId }) => {
    const [sharedPosts, setSharedPosts] = useState([]);
    useEffect(() => {
        const fetchSharedPosts = async () => {
            try {
                const response = await axios.get(`/sharePosts/shares/${sharerId}`);
                // 응답이 배열인지 확인
                if(Array.isArray(response.data)) {
                    setSharedPosts(response.data);
                }else{
                    console.error('응답 데이터가 배열이 아닙니다: ', response.data);
                }
            } catch (error) {
                console.error('Error fetching shared posts:', error);
            }
        };
        fetchSharedPosts();
    }, [sharerId]);


    const handlePostClick = (url) => {
        window.location.href = url; // URL로 이동
    };


    return (
        <div>
            <h2>공유한 게시글 목록</h2>
            <ul>
                {sharedPosts.length > 0? (
                    sharedPosts.map(post => (
                        <li key={post.id} onClick={() => handlePostClick(post.url)}>
                            {post.title}
                        </li> // 제목 클릭 시 해당 URL로 이동
                    ))
                ) : (
                    <div>게시글이 없습니다.</div>
                )}
            </ul>
        </div>
    );
};
export default ScrapedListComponent2;