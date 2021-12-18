import React from 'react';
import {SparePartAction} from "components/parts/list/SparePartListItem/index";
import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {Delete, Edit, ProductionQuantityLimits} from "@mui/icons-material";

interface SparePartListItemActionsProps {
  open: boolean,
  anchorEl: null | HTMLElement;
  onClose: (action?: SparePartAction) => void;
}

export const SparePartListItemActions: React.FC<SparePartListItemActionsProps> = ({open, anchorEl, onClose}) => {
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
      <MenuItem onClick={() => onClose(SparePartAction.EDIT)}>
        <ListItemIcon>
          <Edit fontSize="small"/>
        </ListItemIcon>
        <ListItemText>Редактировать</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => onClose(SparePartAction.UPDATE_AVAILABILITY)}>
        <ListItemIcon>
          <ProductionQuantityLimits fontSize="small"/>
        </ListItemIcon>
        <ListItemText>Изменить наличие</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => onClose(SparePartAction.DELETE)}>
        <ListItemIcon>
          <Delete fontSize="small"/>
        </ListItemIcon>
        <ListItemText>Удалить</ListItemText>
      </MenuItem>
    </Menu>
  );
};
