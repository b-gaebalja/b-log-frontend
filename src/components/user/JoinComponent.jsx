import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Avatar} from "@mui/material";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {useRef, useState} from "react";
import {postJoin, postRejoin} from "../../api/userApi.js";
import useCustomLogin from "../../hooks/useCustomLogin.jsx";
import {useLocation} from "react-router-dom";
import DialogButtonComponent from "../common/DialogButtonComponent.jsx";
import {postAdd} from "../../api/imageApi.js";

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
  email: '',
  fullName: '',
  username: '',
  password: '',
  file: []
}

export default function JoinComponent() {

  const [member, setMember] = useState(initState)
  const profileRef = useRef()
  const {doLogin, moveToPath} = useCustomLogin()
  const kakaoEmail = useLocation().state.email
  const kakaoName = useLocation().state.name
  const [dialog, setDialog] = useState(false)

  const handleMemberInfo = (e) => {
    member[e.target.name] = e.target.value
    setMember({...member})
  }

  const handleJoin = () => {
    const formData = new FormData()

    formData.append('email', kakaoEmail)
    formData.append('fullName', kakaoName)
    formData.append('username', member.username)
    formData.append('password', member.password)


    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    postJoin(formData).then(data => {
          if (data.FAIL) {
            setDialog(true)
          }
          if (data.SUCCESS) {
            console.log(data.SUCCESS)
            const profile = profileRef.current.files[0]
            const formProfile = new FormData()
            formProfile.append('image',profile)
            formProfile.append('targetType', 'POST');
            formProfile.append('targetId',data.SUCCESS)
            postAdd(formProfile).then(response =>{
              alert('이미지 저장에 성공했습니다.')
            }).catch((err)=>{
              console.error(err)
              alert('이미지 저장에 실패했습니다.')
            })

            doLogin({email: kakaoEmail, password: member.password})
            .then(data => {
              if (data.ERROR) {
                console.log(data.ERROR)
                alert('이메일과 패스워드를 확인해주세요')
              } else {
                moveToPath('/')
              }
            })
          }
        }
    )
  }

  const handleClickRejoin = () => {
    setDialog(false)
    const formData = new FormData()
    const profile = profileRef.current.files[0]
    formData.append('email', kakaoEmail)
    formData.append('fullName', kakaoName)
    formData.append('username', member.username)
    formData.append('password', member.password)
    formData.append('file', profile)

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    postRejoin(formData).then(() => {
            doLogin({email: kakaoEmail, password: member.password})
            .then(data => {
              if (data.ERROR) {
                console.log(data.ERROR)
                alert('이메일과 패스워드를 확인해주세요')
              } else {
                moveToPath('/')
              }
            })
        }
    )
  }

  const handleClickClose = () => {
    setDialog(false)
  }

  return (
      <Box
          component="form"
          sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}
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
                startIcon={<CloudUploadIcon/>}
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
                sx={{width: 56, height: 56}}
            />
          </Stack>
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
        <DialogButtonComponent
        open={dialog}
        title={'재가입'}
        content={'해당 카카오 계정으로 가입기록이 있습니다 '
            + '재가입하시겠습니까?'}
        leftBtn={'취소'}
        rightBtn={'재가입'}
        handleClickLeft={handleClickClose}
        handleClickRight={handleClickRejoin}
        />
      </Box>
  );
}
