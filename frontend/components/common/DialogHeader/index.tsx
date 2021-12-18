import React from 'react';
import {CloseOutlined, SvgIconComponent} from "@mui/icons-material";
import {DialogTitle, IconButton, Typography} from "@mui/material";

interface DialogHeaderProps {
  title: string;
  Icon: SvgIconComponent;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  closeDisabled?: boolean;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({title, Icon, onClose, closeDisabled}) => {
  return (
    <DialogTitle className="d-flex justify-between align-center">
      <Typography variant="h4" className="d-flex align-center">
        <Icon fontSize="inherit" className="mr-10"/>
        {title}
      </Typography>
      <IconButton size={"small"} onClick={onClose} disabled={closeDisabled}>
        <CloseOutlined fontSize={"inherit"}/>
      </IconButton>
    </DialogTitle>
  );
};
