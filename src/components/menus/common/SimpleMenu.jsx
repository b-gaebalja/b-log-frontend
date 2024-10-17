import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import NotificationMenu from "../notification/NotificationMenu.jsx";
import LeftSideMenu from "./LeftSideMenu.jsx";
import SearchIcon from '@mui/icons-material/Search';
import {InputAdornment} from "@mui/material";
import AccountMenu from "../user/AccountMenu.jsx";
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import useCustomLogin from "../../../hooks/useCustomLogin.jsx";
import {useState} from "react";
import ResultModal from "../../common/ResultModal.jsx";

const SimpleMenu = () => {

  const loginState = useSelector(state => state.loginSlice)

  const navigate = useNavigate()

  const {doLogout,moveToPath} = useCustomLogin()
  const [result, setResult] = useState(false)

  const handleLogout = () => {
    doLogout()
    setResult(true)
    moveToPath('/')
  }

  const closeModal = () => {
    setResult(false)
    moveToPath('/')
  }

  const handleChange = (event) => {
    if (event.target.checked){
      navigate('/users/login')
    }
  };

  return (
      <>
       {/*   <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={top100Films.map((option) => option.title)}
          renderInput={(params) => (
              <TextField
                  {...params}
                  label="Search input"
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      type: 'search',
                    },
                  }}
              />
          )}
      />*/}
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          {/*<TextField id="outlined-basic" label="검색" variant="outlined"/>*/}
          <TextField
              id="outlined-basic"
              variant="outlined"
              InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon/>
                    </InputAdornment>
                ),
              }}
          />
        </div>
        <Box sx={{flexGrow: 1}}>
          <FormGroup>
            {
              loginState.email?
              <FormControlLabel
                control={
                  <Switch
                      checked={true}
                      onChange={handleChange}
                      onClick={handleLogout}
                      aria-label="login switch"
                  />
                }
                label={'Logout' }
            />
            :
                  <FormControlLabel
                      control={
                        <Switch
                            checked={false}
                            onChange={handleChange}
                            aria-label="login switch"
                        />
                      }
                      label={'Login'}
                  />
            }
          </FormGroup>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{mr: 2}}
              >
              </IconButton>
              <LeftSideMenu>
                {/*<MenuIcon style={{color: 'white'}}/>*/}
                <HomeIcon style={{color: 'white'}}/>
              </LeftSideMenu>
              <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Study log
              </Typography>
              {
                loginState.email &&
                  (
                  <>
                    <NotificationMenu/>
                    <AccountMenu/>
                  </>
              )}
            </Toolbar>
          </AppBar>
          {result?
            <ResultModal
            title={'로그아웃'}
            content={'로그아웃 되었습니다'}
            handleClose={closeModal}
            />
              :
              <></>
          }
        </Box>
      </>
  );
}

export default SimpleMenu;