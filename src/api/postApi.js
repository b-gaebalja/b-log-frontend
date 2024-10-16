import {POST} from "./config.js";
import axios from "axios";

export const postRegister = async (registerParam) => {
    const header = {headers: {'Content-Type': 'application/json'}}

    return await axios.post(`${POST}`, registerParam, header)
}

export const patchComplete = async (completeParam) => {
    const header = {headers: {'Content-Type': 'application/json'}}

    return await axios.patch(`${POST}`, completeParam, header)
}

export const getPost = async (id) => {
    const header = {headers: {'Content-Type': 'application/json'}}

    return await axios.get(`${POST}/${id}`, header)
}

export const getMyPosts = async (email, page) => {
    const config = {
        headers: {'Content-Type': 'application/json'},
        params: {email: email, pageNumber: page}
    };

    return await axios.get(`${POST}/users`, config);
};

export const getAllPosts = async (page) => {
    const config = {
        headers: {'Content-Type': 'application/json'},
        params: {pageNumber: page}
    };

    return await axios.get(`${POST}`, config);
};
