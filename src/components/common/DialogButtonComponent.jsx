import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DialogButtonComponent({open,title,content,leftBtn,rightBtn,handleClickLeft,handleClickRight}) {
  return (
      <Dialog
          open={open}
          onClose={handleClickLeft}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickLeft}>{leftBtn}</Button>
          <Button onClick={handleClickRight} autoFocus>
            {rightBtn}
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default DialogButtonComponent;