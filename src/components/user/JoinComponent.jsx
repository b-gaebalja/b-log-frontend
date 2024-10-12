import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Avatar} from "@mui/material";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {useRef, useState} from "react";
import {postJoin} from "../../api/userApi.js";
import useCustomLogin from "../../hooks/useCustomLogin.jsx";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const initState = {
  email:'',
  fullName: '',
  username: '',
  password: '',
  file:[]
}

export default function JoinComponent() {

  const [member, setMember] = useState(initState)
  const profileRef = useRef()
  const {doLogin,moveToPath} = useCustomLogin()

  const handleMemberInfo = (e) => {
    member[e.target.name] = e.target.value
    setMember({...member})
  }

  const handleJoin = () => {
    console.log(member)
    const formData = new FormData()
    const profile = profileRef.current.files[0]
    console.log(profile)
    formData.append('email',member.email)
    formData.append('fullName',member.fullName)
    formData.append('username',member.username)
    formData.append('password',member.password)
    formData.append('file',profile)

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    postJoin(formData).then(data=>{
      console.log(data)
      doLogin({email:member.email,password:member.password})
      .then(data => {
        if(data.ERROR){
          alert('이메일과 패스워드를 확인해주세요')
        }else {
          moveToPath('/')
        }
      })
    })
  }

  return (
      <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
      >
        <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
        >
          <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
          >
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
              프로필 이미지
              <VisuallyHiddenInput
                  type="file"
                  ref={profileRef}
                  onChange={(event) => console.log(event.target.files)}
              />
            </Button>
            <Avatar
                alt="Remy Sharp"
                src=""
                sx={{ width: 56, height: 56 }}
            />
          </Stack>

          <TextField
              required
              id="email"
              label="이메일"
              name="email"
              value={member.email}
              onChange={handleMemberInfo}
          />
          <TextField
              required
              id="fullName"
              label="이름"
              name="fullName"
              value={member.fullName}
              onChange={handleMemberInfo}
          />
          <TextField
              required
              id="username"
              label="유저명"
              name="username"
              value={member.username}
              onChange={handleMemberInfo}
          />
          <TextField
              id="password"
              label="비밀번호"
              type="password"
              name="password"
              value={member.password}
              onChange={handleMemberInfo}
          />
        </Stack>
        <Button variant="outlined" disableElevation
        onClick={handleJoin}
        >
          회원가입
        </Button>
      </Box>
  );
}
