import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import {useNavigate} from "react-router-dom";

function notificationsLabel(count) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

export default function NotificationMenu() {
  const navigate = useNavigate()
  return (
      <IconButton aria-label={notificationsLabel(100)}>
        <Badge badgeContent={100} color="secondary">
          <MailIcon onClick={()=>navigate("/notification/list")} />
        </Badge>
      </IconButton>
  );
}
