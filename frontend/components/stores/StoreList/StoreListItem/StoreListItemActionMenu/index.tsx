import React from 'react';
import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {StoreAction} from "components/stores/StoreList/StoreListItem/index";

interface StoreListItemActionMenuProps {
  open: boolean,
  anchorEl: null | HTMLElement;
  onClose: (action?: StoreAction) => void;
}

export const StoreListItemActionMenu: React.FC<StoreListItemActionMenuProps> = ({open, anchorEl, onClose}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={() => onClose()}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MenuItem onClick={() => onClose(StoreAction.EDIT)}>
        <ListItemIcon>
          <Edit fontSize="small"/>
        </ListItemIcon>
        <ListItemText>Редактировать</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => onClose(StoreAction.DELETE)}>
        <ListItemIcon>
          <Delete fontSize="small"/>
        </ListItemIcon>
        <ListItemText>Удалить</ListItemText>
      </MenuItem>
    </Menu>
  );
};
