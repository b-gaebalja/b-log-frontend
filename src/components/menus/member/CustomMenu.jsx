import * as React from 'react';
import PropTypes from 'prop-types';
import {Divider, ListItemIcon, Menu, MenuItem, MenuList} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {useNavigate} from "react-router-dom";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

function CustomSettingsMenu(props) {
  const { open, anchorEl, handleMenuClose, handleEnter, handleLeave } = props;

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
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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

  const handleTriggerEnter = React.useCallback((event) => {
    setSubMenuAnchorEl(event.currentTarget);
  }, []);

  const handleTriggerLeave = React.useCallback(() => {
    // Wait for 300ms to see if the mouse has moved to the sub menu
    setTimeout(() => {
      if (mouseOnSubMenu.current) {
        return;
      }
      setSubMenuAnchorEl(null);
    }, 300);
  }, []);

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

  return (
      <MenuList dense disablePadding>
        <MenuItem
            onClick={() => navigate('/board/listMy')}
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
            onClick={() => navigate('/board/add')}
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
            onClick={()=>navigate('/board/scrap')}
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
            onMouseEnter={handleTriggerEnter}
            onMouseLeave={handleTriggerLeave}
            component="button"
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
            }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          Settings
        </MenuItem>


        <Divider />
        <CustomSettingsMenu
            open={subMenuOpen}
            anchorEl={subMenuAnchorEl}
            handleEnter={handleSubMenuEnter}
            handleLeave={handleSubMenuLeave}
            handleMenuClose={handleSubMenuClose}
        />
      </MenuList>
  );
}
