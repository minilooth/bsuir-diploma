import React from 'react';
import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {AddressActionType} from "components/stores/AddressesDialog/index";

interface AddressMenuProps {
  open: boolean;
  anchorEl: null | HTMLElement;
  onAction: (type: AddressActionType) => void;
  onClose: () => void;
}

export const AddressActionsMenu: React.FC<AddressMenuProps> = ({open, anchorEl, onAction, onClose}) => {
  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        closeAfterTransition
        onClose={onClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => onAction(AddressActionType.UPDATE)}>
          <ListItemIcon>
            <Edit fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Редактировать</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onAction(AddressActionType.DELETE)}>
          <ListItemIcon>
            <Delete fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Удалить</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};
