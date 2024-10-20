import { COMMENT } from "./config.js";
import axios from "axios";
import jwtAxios from "../util/jwtUtil.jsx";

export const getComment = async (postId) => {
    const header = { headers: { 'Content-Type': 'application/json' } }
    return await axios.get(`${COMMENT}/posts/${postId}`, header)
}

export const toComment = async (commentId) => {
    const header = { headers: { 'Content-Type': 'application/json' } }
    return await axios.get(`${COMMENT}/${commentId}`, header)
}

export const commentRegister = async (registerParam) => {
    const header = { headers: { 'Content-Type': 'application/json' } };
    return await jwtAxios.post(`${COMMENT}`, registerParam, header);
}

export const commentModify = async (commentId, requestParam) => {
    const header = { headers: { 'Content-Type': 'application/json' } }
    return await jwtAxios.patch(`${COMMENT}/${commentId}`, requestParam, header)
}

export const commentDelete = async (commentId) => {
    const header = { headers: { 'Content-Type': 'application/json' } }
    return await jwtAxios.patch(`${COMMENT}/${commentId}/delete`, header)
}
