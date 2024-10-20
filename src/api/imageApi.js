import {IMAGE} from "./config.js";
import jwtAxios from "../util/jwtUtil.jsx";

export const postAdd = async (addParam) => {
    const header = {headers: {'Content-Type': 'multipart/form-data'}}

    return await jwtAxios.post(`${IMAGE}`, addParam, header)
}
