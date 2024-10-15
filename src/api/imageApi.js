import {IMAGE} from "./config.js";
import axios from "axios";

export const postAdd = async (addParam) => {
    const header = {headers: {'Content-Type': 'multipart/form-data'}}

    return await axios.post(`${IMAGE}`, addParam, header)
}
