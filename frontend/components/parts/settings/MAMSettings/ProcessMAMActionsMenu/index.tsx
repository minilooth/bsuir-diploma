import React from "react";
import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {MAMActionType, MAMModel} from "components/parts/settings/MAMSettings/index";

interface ProcessMAMActionsMenuProps {
  open: boolean;
  anchorEl: null | HTMLElement;
  handleClose: (type?: MAMActionType, model?: MAMModel) => void;
  model: MAMModel;
}

export const ProcessMAMActionsMenu: React.FC<ProcessMAMActionsMenuProps> = ({open, anchorEl, handleClose, model}) => {
  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        closeAfterTransition
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
        <MenuItem onClick={() => handleClose(MAMActionType.UPDATE, model)}>
          <ListItemIcon>
            <Edit fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Редактировать</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClose(MAMActionType.DELETE, model)}>
          <ListItemIcon>
            <Delete fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Удалить</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};
