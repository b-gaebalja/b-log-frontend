import {useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
import useCustomLogin from "../../hooks/useCustomLogin.jsx";
import Button from "@mui/material/Button";
import {useMutation} from "@tanstack/react-query";
import {deleteUser, patchPassword, patchUsername} from "../../api/userApi.js";
import ResultModal from "../common/ResultModal.jsx";
import DialogInputComponent from "../common/DialogComponent.jsx";
import TextFieldComponent from "../common/TextFieldComponent.jsx";

const style = {
  py: 0,

  width: '100%',
  maxWidth: 360,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

export default function AccountComponent() {

  const {loginState, doLogout, moveToPath,isLogin,moveToLoginReturn, moveToLogin} = useCustomLogin()
  const userId = loginState.userId
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)
  const [openWithdraw, setOpenWithdraw] = useState(false)
  const [openUsername, setOpenUsername] = useState(false)
  const [openPassword, setOpenPassword] = useState(false)


  if (!isLogin){
    return  moveToLoginReturn()
  }

  const userParams = {
    email: '',
    password: '',
    username: ''
  }

  const [user, setUser] = useState(userParams)

  const usernameEditMutation = useMutation(
      {mutationFn: () => patchUsername(userId, user.username)})

  const passwordEditMutation = useMutation(
      {mutationFn: () => patchPassword(userId, user.password)})

  const withDrawMutation = useMutation(
      {
        mutationFn: () =>
            deleteUser(userId, user).then(()=>setSuccess(true)).catch(() => {
              setUser({...userParams})
              setFail(true)
            })
      })

  const handleEditUsername = () => {
    usernameEditMutation.mutate()
  }


  const handleEditPassword = () => {
    passwordEditMutation.mutate()
  }

  const handleClickWithdraw = () => {
    withDrawMutation.mutate()
  }

  const handleClickOpen = (e) => {
     const name = e.target.name
    if (name === 'withdraw'){
      setUser({...userParams})
    setOpenWithdraw(true);
    }else if(name === 'username'){
      setOpenUsername(true);
    }else if(name === 'password'){
      setOpenPassword(true);
    }
  };

  const handleClose = () => {
    setOpenWithdraw(false)
    setOpenUsername(false)
    setOpenPassword(false)
  };

  const handleChangeUserParams = (e) => {
    user[e.target.name] = e.target.value
    setUser({...user})
  }

  const handleCloseModal = () => {
    doLogout()
    moveToPath('/')
  }

  const handleCloseFailModal = () => {
    setFail(false)
  }

  const handleCloseEdit = () => {
    doLogout()
    moveToLogin()
  }

  return (
      <Box
          style={{display: 'flex', justifyContent: 'center', marginTop: '100'}}>
        <List sx={style}>
          <ListItem>
            <ListItemText primary={`이메일: ${loginState.email}`}/>
          </ListItem>
          <Divider component="li"/>
          <ListItem>
            <ListItemText primary={`유저명: ${loginState.username}`}/>
            <Button
                name={'username'}
                onClick={handleClickOpen}>변경</Button>
          </ListItem>
          <Divider variant="inset" component="li"/>
          <ListItem>
            <ListItemText primary={`비밀번호 변경`}/>
            <Button
                name={'password'}
                onClick={handleClickOpen}
            >변경</Button>
          </ListItem>
          <Divider variant="middle" component="li"/>
          <ListItem>
            <ListItemText primary="회원 탈퇴"/>
            <Button
                name={'withdraw'}
                variant="outlined"
                onClick={handleClickOpen}>
              탈퇴</Button>
            <DialogInputComponent
            open={openWithdraw}
            title={'회원탈퇴'}
            content={'탈퇴하시겠습니까?'}
            handleClose={handleClose}
            handleClickRight={handleClickWithdraw}
            leftButton={'취소'}
            rightButton={'탈퇴'}
            >
              <TextFieldComponent
              id={'email'}
              type={'email'}
              label={'이메일'}
              value={user.email}
              handleChange={handleChangeUserParams}
              />
              <TextFieldComponent
              id={'password'}
              type={'password'}
              label={'비밀번호'}
              value={user.password}
              handleChange={handleChangeUserParams}
              />
            </DialogInputComponent>
            <DialogInputComponent
                open={openPassword}
                title={'비밀번호'}
                content={'비밀번호 변경하시겠습니까?'}
                handleClose={handleClose}
                handleClickRight={handleEditPassword}
                leftButton={'취소'}
                rightButton={'변경'}
            >
              <TextFieldComponent
                  id={'password'}
                  type={'password'}
                  label={'비밀번호'}
                  value={user.password}
                  handleChange={handleChangeUserParams}
              />
            </DialogInputComponent>
            <DialogInputComponent
                open={openUsername}
                title={'유저명'}
                content={'유저명 변경하시겠습니까?'}
                handleClose={handleClose}
                handleClickRight={handleEditUsername}
                leftButton={'취소'}
                rightButton={'변경'}
            >
              <TextFieldComponent
                  id={'username'}
                  type={'text'}
                  label={'유저명'}
                  value={user.username}
                  handleChange={handleChangeUserParams}
              />
            </DialogInputComponent>
          </ListItem>
        </List>
        {withDrawMutation.isSuccess?
            <ResultModal
                open={success}
                title={"회원탈퇴"}
                content={"탈퇴가 되었습니다"}
                handleClose={handleCloseModal}
            />
            :
            <></>
        }
        {fail ?
            <ResultModal
                open={fail}
                title={"회원탈퇴"}
                content={"회원탈퇴가 되지않았습니다. 다시 시도해주세요."}
                handleClose={handleCloseFailModal}
            />
            :
            <></>
        }
        {usernameEditMutation.isSuccess?
            <ResultModal
            open={true}
            title={"유저명 변경"}
            content={"유저명이 변경되었습니다. 다시 로그인 해주세요."}
            handleClose={handleCloseEdit}
            />
            :
            <></>
        }
        {passwordEditMutation.isSuccess?
            <ResultModal
                open={true}
                title={"비밀번호 변경"}
                content={"비밀번호가 변경되었습니다. 다시 로그인 해주세요."}
                handleClose={handleCloseEdit}
            />
            :
            <></>
        }
      </Box>
  );
}
