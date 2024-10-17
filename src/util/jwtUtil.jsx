import axios from "axios";
import {getCookie, setCookie} from "./cookieUtil.jsx";
import {USER} from "../api/config.js";

const jwtAxios = axios.create()

const refreshJwt = async (accessToken, refreshToken) => {
  const header = {headers: {'Authorization': `Bearer ${accessToken}`}}
  const res = await axios.post(`${USER}/refresh`, {refreshToken}, header)

  return res.data
}

const beforeReq = (config) => {
  const memberInfo = getCookie('user');
  if (!memberInfo) {
    console.log('USER NOT FOUND')
    return Promise.reject(
        {
          response: {
            data: {ERROR: "REQUIRED_LOGIN"}
          }
        }
    )
  }
  const {access_token} = memberInfo
  config.headers.Authorization = `Bearer ${access_token}`
  return config
}

const requestFail = (err) => {
  return Promise.reject(err)
}

const beforeRes = async (res) => {
  const data = res.data
  if (data && data.ERROR === 'ERROR_ACCESS_TOKEN') {
    const memberCookieValue = getCookie('user')
    const result = await refreshJwt(memberCookieValue.access_token,
        memberCookieValue.refresh_token)
    memberCookieValue.access_token = result.access_token
    memberCookieValue.refresh_token = result.refresh_token

    setCookie('user',JSON.stringify(memberCookieValue),1)

    const originalRequest = res.config
    originalRequest.headers.Authorization = `Bearer ${result.access_token}`
    return axios(originalRequest);
  }

  return res
}

const responseFail = (err) => {
  return Promise.reject(err)
}

jwtAxios.interceptors.request.use(beforeReq, requestFail)
jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios