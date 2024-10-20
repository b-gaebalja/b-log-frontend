import * as React from 'react';
import {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useNavigate} from "react-router-dom";
import {deletePost} from "../../../api/postApi.js";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const options = [
    '보기',
    '수정하기',
    '삭제하기'
];

const ITEM_HEIGHT = 48;

export default function ShareMenu({id}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (option) => {
        console.log(`클릭함 ${option}`);
        setAnchorEl(null);

        if (option === '보기') {
            navigate(`../${id}`);
        } else if (option === '수정하기') {
            navigate(`../modify/${id}`);
        } else if (option === '삭제하기') {
            setOpenDeleteDialog(true);
        }
    };

    const handleDelete = async () => {
        try {
            await deletePost(id);
            setOpenDeleteDialog(false);
            navigate(`../listMy`, {replace: true});
            window.location.reload();
        } catch (error) {
            console.error('삭제 실패:', error);
        }
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                style={{color: 'white'}}
                onClick={handleClick}
            >
                {/*<ShareIcon/>*/}
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} selected={option === 'Pyxis'}
                              onClick={() => handleClose(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>

            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
            >
                <DialogTitle>삭제 확인</DialogTitle>
                <DialogContent>
                    정말 삭제하시겠습니까?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>취소</Button>
                    <Button onClick={handleDelete} color="error">삭제</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
