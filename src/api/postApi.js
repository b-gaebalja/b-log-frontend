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
