import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
import useCustomLogin from "../../hooks/useCustomLogin.jsx";
import Button from "@mui/material/Button";
import {useMutation} from "@tanstack/react-query";
import {deleteUser, putPassword, putUsername} from "../../api/userApi.js";
import {
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {Fragment, useState} from "react";
import ResultModal from "../common/ResultModal.jsx";

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

  const {loginState,doLogout,moveToPath} = useCustomLogin()
  const userId = loginState.userId
  const username = loginState.username

  const userParams = {
    email: '',
    password: ''
  }

  const [user, setUser] = useState(userParams)

  const usernameEditMutation = useMutation(
      {mutationFn: () => putUsername(userId, username)})

  const passwordEditMutation = useMutation(
      {mutationFn: (password) => putPassword(userId, password)})

  const withDrawMutation = useMutation(
      {mutationFn: () => deleteUser(userId, user)})

  const handleEditUsername = () => {
    usernameEditMutation.mutate()
  }

  const handleEditPassword = () => {

    passwordEditMutation.mutate()
  }

  const handleClickWithdraw = () => {
    withDrawMutation.mutate()
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeUserParams = (e) => {
    user[e.target.name] = e.target.value
    setUser({...user})
  }

  const handleCloseModal = () => {
    doLogout()
    moveToPath('/')
  }


  return (
      <Box
          style={{display: 'flex', justifyContent: 'center', marginTop: '100'}}>
        <List sx={style}>
          <ListItem>
            <ListItemText primary={`계정 이메일: ${loginState.email}`}/>
          </ListItem>
          <Divider component="li"/>
          <ListItem>
            <ListItemText primary={`유저명: ${loginState.username}`}/>
            <Button onClick={handleEditUsername}>변경</Button>
          </ListItem>
          <Divider variant="inset" component="li"/>
          <ListItem>
            <ListItemText primary={`비밀번호 변경`}/>
            <Button onClick={handleEditPassword}>변경</Button>
          </ListItem>
          <Divider variant="middle" component="li"/>
          <ListItem>
            <ListItemText primary="회원 탈퇴"/>
            <Button
                variant="outlined"
                onClick={handleClickOpen}>
              탈퇴</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
              <DialogTitle>회원탈퇴</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  탈퇴하시겠습니까?
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="email"
                    name="email"
                    label="이메일"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeUserParams}
                />
                <TextField
                    required
                    margin="dense"
                    id="password"
                    name="password"
                    label="비밀번호"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeUserParams}
                />
              </DialogContent>
              <DialogActions>
                <Button
                    onClick={handleClose}>
                  취소
                </Button>
                <Button
                onClick={handleClickWithdraw}
                >탈퇴</Button>
              </DialogActions>
            </Dialog>
          </ListItem>
        </List>
        {withDrawMutation.isSuccess?
            <ResultModal
            title={"회원탈퇴"}
            content={"탈퇴가 되었습니다"}
            handleClose={handleCloseModal}
            />
            :
            <></>
        }
      </Box>
  );
}
