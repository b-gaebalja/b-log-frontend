import {POST, SHARE} from "./config.js";
import jwtAxios from "../util/jwtUtil.jsx";
import axios from "axios";

export const postRegister = async (registerParam) => {
    const header = {headers: {'Content-Type': 'application/json'}}

    return await jwtAxios.post(`${POST}`, registerParam, header)
}

export const patchComplete = async (completeParam) => {
    const header = {headers: {'Content-Type': 'application/json'}}

    return await jwtAxios.patch(`${POST}`, completeParam, header)
}

export const getPost = async (id) => {
    const header = {headers: {'Content-Type': 'application/json'}}

    return await jwtAxios.get(`${POST}/${id}`, header)
}

export const getMyPosts = async (email, page) => {
    const config = {
        headers: {'Content-Type': 'application/json'},
        params: {email: email, pageNumber: page}
    };

    return await jwtAxios.get(`${POST}/users`, config);
};

export const getUserPosts = async (email, page) => {
    const config = {
        headers: {'Content-Type': 'application/json'},
        params: {email: email, pageNumber: page}
    };

    return await jwtAxios.get(`${POST}/users`, config);
};

export const getAllPosts = async (page) => {
    const config = {
        headers: {'Content-Type': 'application/json'},
        params: {pageNumber: page}
    };

    return await axios.get(`${POST}`, config);
};

export const patchModify = async (modifyParam) => {
    const header = {headers: {'Content-Type': 'application/json'}}

    return await jwtAxios.patch(`${POST}/modify`, modifyParam, header)
}

export const deletePost = async (id) => {
    const header = {headers: {'Content-Type': 'application/json'}}

    return await jwtAxios.delete(`${POST}/${id}`, header)
}

// 북마크 추가
export const addBookmark = async (id, sharerId, url) => {
    console.log("북마크 추가 시작");
    const header = {headers: {'Content-Type': 'application/json'}};
    console.log("postId : ", id);
    // 요청 본문에 sharerId와 url을 포함
    const data = {
        sharerId, // 현재 로그인된 사용자 ID
        url // 현재 페이지 URL
    };
    return await jwtAxios.post(`${SHARE}/${id}/shares`, data, header);
};

// 북마크 삭제
export const removeBookmark = async (postId) => {
    console.log("북마크 제거 시작");
    const header = {headers: {'Content-Type': 'application/json'}};
    return await jwtAxios.delete(`${SHARE}/delete/${postId}`, header);
};

// 북마크 목록 가져오기
export const getBookmarks = async (sharerId) => {
    console.log("북마크 목록 가져오기 시작");
    console.log("sharerId: ", sharerId);
    const header = {headers: {'Content-Type': 'application/json'}};
    return await jwtAxios.get(`${SHARE}/list/${sharerId}`, header);
};
