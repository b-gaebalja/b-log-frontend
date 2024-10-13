import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function LeftSideMenu({children}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <div>
        <Button
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
          {children}
        </Button>
        <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
          <Link to={'/'}><MenuItem>홈</MenuItem></Link>
          <Link to={'/post'}><MenuItem>다른 사람 게시글 보기</MenuItem></Link>
          <Link to={'/scrap'}><MenuItem>나의 스크랩</MenuItem></Link>
        </Menu>
      </div>
  );
}