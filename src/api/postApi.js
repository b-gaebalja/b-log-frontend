import {POST} from "./config.js";
import axios from "axios";

export const postAdd = async (addParam) => {
    const header = {headers: {'Content-Type': 'application/json'}}

    return await axios.post(`${POST}`, addParam, header)
}
