import React from 'react';
import {MoreVert} from "@mui/icons-material";
import {GridRenderCellParams} from "@mui/x-data-grid";
import {Stack, Typography} from "@mui/material";
import {MAMActionType, MAMModel} from "components/parts/settings/MAMSettings/index";
import {ProcessMAMActionsMenu} from "components/parts/settings/MAMSettings/ProcessMAMActionsMenu";

interface MAMActionsCellProps {
  params: GridRenderCellParams,
  onAction: (id: number | string, type: MAMActionType, model: MAMModel, initialValue?: string) => void;
  model: MAMModel;
}

export const MAMActionsCell: React.FC<MAMActionsCellProps> = ({params: {id, value}, onAction, model}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpened = Boolean(anchorEl);

  const onOpenMenu = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseProcessMenu = (type?: MAMActionType, model?: MAMModel) => {
    setAnchorEl(null);
    if (type && model) {
      onAction(id, type, model, value as string);
    }
  };

  return (
    <>
      <Stack direction="row" className="justify-between align-center" width={'100%'}>
        <Typography style={{width: '90%', overflow: 'auto'}}>{value}</Typography>
        <MoreVert className={"cu-p"} onClick={onOpenMenu} style={{width: '10%'}}/>
      </Stack>
      <ProcessMAMActionsMenu
        open={menuOpened}
        anchorEl={anchorEl}
        handleClose={onCloseProcessMenu}
        model={model}
      />
    </>
  );
}
