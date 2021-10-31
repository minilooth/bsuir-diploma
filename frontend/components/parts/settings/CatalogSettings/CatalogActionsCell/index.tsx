import React from 'react';
import {MoreVert} from "@mui/icons-material";
import {GridRenderCellParams} from "@mui/x-data-grid";
import {Stack, Typography} from "@mui/material";
import {CatalogActionType, CatalogModel} from "components/parts/settings/CatalogSettings/index";
import {ProcessCatalogActionsMenu} from "components/parts/settings/CatalogSettings/ProcessCatalogActionsMenu";

interface CatalogActionsCellProps {
  params: GridRenderCellParams,
  onAction: (id: number | string, type: CatalogActionType, model: CatalogModel, initialValue?: string) => void;
  model: CatalogModel;
}

export const CatalogActionsCell: React.FC<CatalogActionsCellProps> = ({params: {id, value}, onAction, model}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpened = Boolean(anchorEl);

  const onOpenMenu = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseProcessMenu = (type?: CatalogActionType, model?: CatalogModel) => {
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
      <ProcessCatalogActionsMenu
        open={menuOpened}
        anchorEl={anchorEl}
        handleClose={onCloseProcessMenu}
        model={model}
      />
    </>
  );
}
