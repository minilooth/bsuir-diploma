import React from 'react';
import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {VehicleActionType, VehicleModel} from "components/parts/settings/VehicleSettings/index";
import {Delete, Edit} from "@mui/icons-material";

interface ProcessVehicleActionsMenuProps {
  open: boolean;
  anchorEl: null | HTMLElement;
  handleClose: (type?: VehicleActionType, model?: VehicleModel) => void;
  model: VehicleModel;
}

export const ProcessVehicleActionsMenu: React.FC<ProcessVehicleActionsMenuProps> = ({open, anchorEl, handleClose, model}) => {
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
        <MenuItem onClick={() => handleClose(VehicleActionType.UPDATE, model)}>
          <ListItemIcon>
            <Edit fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Редактировать</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClose(VehicleActionType.DELETE, model)}>
          <ListItemIcon>
            <Delete fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Удалить</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};
