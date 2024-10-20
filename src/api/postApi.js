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

    return await jwtAxios.get(`${POST}`, config);
};

export const patchModify = async (modifyParam) => {
    const header = {headers: {'Content-Type': 'application/json'}}

    return await jwtAxios.patch(`${POST}/modify`, modifyParam, header)
}

// 북마크 추가
export const addBookmark = async (id) => {
    console.log("북마크 추가 시작");
    const header = { headers: { 'Content-Type': 'application/json' } };
    console.log("postId : ", id);
    return await jwtAxios.post(`${SHARE}/${id}/shares`, {}, header);
};

// 북마크 삭제
export const removeBookmark = async (postId) => {
    console.log("북마크 제거 시작");
    const header = { headers: { 'Content-Type': 'application/json' } };
    return await jwtAxios.delete(`${SHARE}/delete/${postId}`, header);
};

// 북마크 목록 가져오기
export const getBookmarks = async (sharerId) => {
    console.log("북마크 목록 가져오기 시작");
    console.log("sharerId: ", sharerId);
    const header = { headers: { 'Content-Type': 'application/json' } };
    return await jwtAxios.get(`${SHARE}/list/${sharerId}`, header);
};
