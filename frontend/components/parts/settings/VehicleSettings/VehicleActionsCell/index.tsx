import React from 'react';
import {MoreVert} from "@mui/icons-material";
import {GridRenderCellParams} from "@mui/x-data-grid";
import {VehicleActionType, VehicleModel} from "components/parts/settings/VehicleSettings/index";
import {ProcessVehicleActionsMenu} from "components/parts/settings/VehicleSettings/ProcessVehicleActionsMenu";
import {Stack, Typography} from "@mui/material";

interface VehicleActionsCellProps {
  params: GridRenderCellParams,
  onAction: (id: number | string, type: VehicleActionType, model: VehicleModel, initialValue?: string) => void;
  model: VehicleModel;
}

export const VehicleActionsCell: React.FC<VehicleActionsCellProps> = ({params: {id, value}, onAction, model}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpened = Boolean(anchorEl);

  const onOpenMenu = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseProcessMenu = (type?: VehicleActionType, model?: VehicleModel) => {
    setAnchorEl(null);
    if (type && model) {
      onAction(id, type, model, value as string);
    }
  };

  return (
    <>
      <Stack direction="row" className="justify-between align-center" width={'100%'}>
        <Typography>{value}</Typography>
        <MoreVert className={"cu-p"} onClick={onOpenMenu}/>
      </Stack>
      <ProcessVehicleActionsMenu
        open={menuOpened}
        anchorEl={anchorEl}
        handleClose={onCloseProcessMenu}
        model={model}
      />
    </>
  );
};
