import React from 'react';
import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {CatalogActionType, CatalogModel} from "components/parts/settings/CatalogSettings/index";

interface ProcessCatalogActionsMenuProps {
  open: boolean;
  anchorEl: null | HTMLElement;
  handleClose: (type?: CatalogActionType, model?: CatalogModel) => void;
  model: CatalogModel;
}

export const ProcessCatalogActionsMenu: React.FC<ProcessCatalogActionsMenuProps> = ({open, anchorEl, handleClose, model}) => {
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
        <MenuItem onClick={() => handleClose(CatalogActionType.UPDATE, model)}>
          <ListItemIcon>
            <Edit fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Редактировать</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClose(CatalogActionType.DELETE, model)}>
          <ListItemIcon>
            <Delete fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Удалить</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};
