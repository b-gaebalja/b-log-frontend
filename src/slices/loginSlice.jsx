import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {postLogin} from "../api/userApi.js";
import {getCookie, removeCookie, setCookie} from "../util/cookieUtil.jsx";

const initState = {
  email: ''
}

const loadMemberCookie = () => {
  return getCookie('member')
}

export const loginPostAsync = createAsyncThunk('loginPostAsync',(param)=>postLogin(param))

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: loadMemberCookie() || initState,
  reducers: {
    login: (state, action) => {
      console.log(`로그인 슬라이스 ${action.payload}`)
      return {email: action.payload.email}
    },
    logout: () => {
      removeCookie('member')
      return {...initState}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginPostAsync.fulfilled,(state,action)=>{
      console.log("fulfilled")
      const payload = action.payload
      console.log(payload)
      if(!payload.ERROR){
        setCookie("member",JSON.stringify(payload))
      }
      return {
        email:payload.email,
        fullName:payload.fullName,
        roles:payload.roles,
        userId:payload.userId,
        username:payload.username
      }
    })
    .addCase(loginPostAsync.pending,(state,action)=>{
      console.log('pending')
    })
    .addCase(loginPostAsync.rejected,(state,action)=>{
      console.log('rejected')
    })
  }
})

export const {login, logout} = loginSlice.actions

export default loginSlice.reducer