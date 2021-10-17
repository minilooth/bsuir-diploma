import React from 'react';
import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {Delete, Edit, Lock, LockOpenOutlined, LockOutlined, VpnKeyOutlined} from "@mui/icons-material";

export enum UserAction {
  EDIT,
  DELETE,
  LOCK,
  CHANGE_PASSWORD
}

interface UserListItemActionMenuProps {
  open: boolean;
  anchorEl: null | HTMLElement;
  handleClose: (action?: UserAction) => void;
  locked: boolean;
}

export const UserListItemActionMenu: React.FC<UserListItemActionMenuProps> = ({open, anchorEl, handleClose, locked}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={() => handleClose()}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MenuItem onClick={() => handleClose(UserAction.EDIT)}>
        <ListItemIcon>
          <Edit fontSize="small"/>
        </ListItemIcon>
        <ListItemText>Редактировать</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleClose(UserAction.DELETE)}>
        <ListItemIcon>
          <Delete fontSize="small"/>
        </ListItemIcon>
        <ListItemText>Удалить</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleClose(UserAction.LOCK)}>
        <ListItemIcon>
          {locked ? <LockOpenOutlined fontSize={"small"}/> : <LockOutlined fontSize="small"/>}
        </ListItemIcon>
        <ListItemText>{locked ? 'Разблокировать' : 'Заблокировать'}</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleClose(UserAction.CHANGE_PASSWORD)}>
        <ListItemIcon>
          <VpnKeyOutlined fontSize="small"/>
        </ListItemIcon>
        <ListItemText>Изменить пароль</ListItemText>
      </MenuItem>
    </Menu>
  );
};
