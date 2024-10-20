import {COMMENT} from "./config.js";
import axios from "axios";
import jwtAxios from "../util/jwtUtil.jsx";

export const getComment = async (postId) => {
    const header = {headers: {'Content-Type': 'application/json'}}

    return await axios.get(`${COMMENT}/${postId}`, header)
}

export const commentRegister = async (registerParam) => {
    const header = {headers: {'Content-Type': 'application/json'}}

    return await jwtAxios.post(`${COMMENT}`, registerParam, header)
}

export const commentModify = async (requestParam)=> {
    const header = {headers: {'Content-Type': 'application/json'}}

    return await jwtAxios.patch(`${COMMENT}`,requestParam, header)
}

export const commentDelete = async (commentId) => {
    const header = {headers: {'Content-Type': 'application/json'}}

    return await jwtAxios.patch(`${COMMENT}`, commentId, header)
}
