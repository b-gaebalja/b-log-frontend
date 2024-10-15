import * as React from 'react';
import PropTypes from 'prop-types';
import {Divider, ListItemIcon, Menu, MenuItem, MenuList} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {useNavigate} from "react-router-dom";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import useCustomMove from "../../../hooks/useCustomMove.jsx";

function CustomSettingsMenu(props) {
  const { open, anchorEl,  handleEnter, handleLeave } = props;

  return (
      <Menu
          anchorEl={anchorEl}
          open={open}
          slotProps={{
            root: {
              sx: {
                pointerEvents: 'none',
              },
            },
          }}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
      >
        <MenuList
            dense
            disablePadding
            sx={{ pointerEvents: 'auto' }}
            onMouseEnter={() => {
              handleEnter();
            }}
            onMouseLeave={handleLeave}
        >

        </MenuList>
      </Menu>
  );
}

CustomSettingsMenu.propTypes = {
  anchorEl: PropTypes.object,
  handleEnter: PropTypes.func.isRequired,
  handleLeave: PropTypes.func.isRequired,
  handleMenuClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function CustomMenu() {
  const navigate = useNavigate()

  const mouseOnSubMenu = React.useRef(false);

  const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState(null);
  const subMenuOpen = Boolean(subMenuAnchorEl);
  const {moveToPath} = useCustomMove()


  const handleSubMenuEnter = React.useCallback(() => {
    mouseOnSubMenu.current = true;
  }, []);

  const handleSubMenuLeave = (event) => {
    mouseOnSubMenu.current = false;
    if (subMenuAnchorEl?.contains(event.relatedTarget)) {
      return;
    }
    setSubMenuAnchorEl(null);
  };

  const handleSubMenuClose = React.useCallback(() => {
    setSubMenuAnchorEl(null);
  }, []);

  const handleClickSetting = () => {
    console.log('클릭 세팅')
    moveToPath('/users/account')
  }

  return (
      <MenuList dense disablePadding>
        <MenuItem
            onClick={() => navigate('/post/listMy')}
            component="button"
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
            }}
        >
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          내 스터디로그
        </MenuItem>
        <MenuItem
            onClick={() => navigate('/post/add')}
            component="button"
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
            }}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          새 글 작성
        </MenuItem>
        <MenuItem
            onClick={()=>navigate('/post/scrap')}
            component="button"
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
            }}
        >
          <ListItemIcon>
            <BookmarkIcon/>
          </ListItemIcon>
          나의 스크랩
        </MenuItem>
        <MenuItem
            component="button"
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
            }}
            onClick={handleClickSetting}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          설정
        </MenuItem>


        <Divider />
      </MenuList>
  );
}
