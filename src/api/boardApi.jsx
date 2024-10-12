import {BOARD} from "./config.js";
import axios from "axios";

export const postAdd = async (addParam) => {
    const header = {headers: {'Content-Type': 'application/json'}}

    return await axios.post(`${BOARD}`, addParam, header)
}
