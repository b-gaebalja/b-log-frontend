import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import useCustomLogin from "../../hooks/useCustomLogin.jsx";
import ResultModal from "../common/ResultModal.jsx";

const initState = {
  email: '',
  password: ''
}

export default function LoginComponent() {

  const [loginParam, setLoginParam] = useState({...initState})
  const [result, setResult] = useState(null)
  const [fail, setFail] = useState(null)

  const {doLogin, moveToPath} = useCustomLogin()

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value
    setLoginParam({...loginParam})
  }

  const handleLogin = () => {
    doLogin(loginParam)
    .then(data => {
      if (data.ERROR) {
        setFail(data.ERROR)
      } else {
        setResult(data.username)
      }
    })
  }

  const handleClose = () => {
    if(result){
    setResult(null)
    moveToPath('/')
    }
    if (fail){
      setFail(null)
    }
  }

  return (
      <>
        {result ? <ResultModal
            title={`안녕하세요 ${result}, 님`}
            content={"로그인 하셨습니다."}
            handleClose={handleClose}
            />
            :
            <></>}
        {fail?<ResultModal
        title={`안녕하세요 로그인에 실패하셨습니다`}
        content={'아이디와 비밀번호를 다시 확인해주세요'}
        handleClose={handleClose}
        />:<></>}
        <Box
            component="form"
            sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}
            noValidate
            autoComplete="off"
        >
          <div>

            <TextField
                required
                id="outlined-required"
                name="email"
                label="이메일"
                onChange={handleChange}
            />
          </div>
          <div>
            <TextField
                id="outlined-password-input"
                label="비밀번호"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={handleChange}
            />
          </div>
          <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined"
                      onClick={handleLogin}
              >로그인</Button>
              <Button variant="outlined"
                      onClick={() => moveToPath('/users/join')}
              >
                회원가입
              </Button>
            </Stack>
          </Box>
        </Box>
      </>
  )
      ;
}
