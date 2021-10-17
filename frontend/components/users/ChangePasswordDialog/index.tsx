import React from 'react';
import {User} from "types/user";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import {AccountBox, CloseOutlined, VpnKeyOutlined} from "@mui/icons-material";

interface ChangePasswordDialogProps {
  isOldPasswordNeeded: boolean;
  open: boolean;
  onClose: () => void;
  user?: User;
}

export const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({isOldPasswordNeeded, open, onClose, user}) => {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
    >
      <DialogTitle className="d-flex justify-between align-center">
        <Typography variant="h4" className="d-flex align-center">
          <VpnKeyOutlined fontSize="inherit" className="mr-10"/>Изменение пароля
        </Typography>
        <CloseOutlined className="cu-p" onClick={onClose}/>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Очистить
        </Button>
        <Button onClick={onClose} autoFocus>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
