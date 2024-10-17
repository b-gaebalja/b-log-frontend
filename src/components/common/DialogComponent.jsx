import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import Button from "@mui/material/Button";

function DialogComponent(
    {open,title,content,
      handleClose,handleClickRight,leftButton,
      rightButton,children}
) {
  return (
      <Dialog
          open={open}
          onClose={handleClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button
              onClick={handleClose}>
            {leftButton}
          </Button>
          <Button
              onClick={handleClickRight}
          >{rightButton}</Button>
        </DialogActions>
      </Dialog>
  );
}

export default DialogComponent;