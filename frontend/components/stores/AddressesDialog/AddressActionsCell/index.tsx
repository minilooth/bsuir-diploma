import React from 'react';
import {MoreVert} from "@mui/icons-material";
import {GridRenderCellParams} from "@mui/x-data-grid";
import {Stack, Typography} from "@mui/material";
import {AddressActionType} from "components/stores/AddressesDialog/index";
import {AddressActionsMenu} from "components/stores/AddressesDialog/AddressActionsMenu";
import {Address, ProcessAddress} from "types/stores/address";
import {ProcessAddressDialog} from "components/stores/AddressesDialog/ProcessAddressDialog";
import {AddressService} from "service/stores/AddressService";
import {useSnackbar} from "notistack";
import {getAxiosErrorData} from "core/axios";
import {SnackbarErrorOptions, SnackbarSuccessOptions} from "core/snackbar/snackbar-options";
import {useTypedDispatch} from "redux/hooks";
import {getAddresses} from "redux/slices/storesSlice";

interface AddressActionsCellProps {
  params: GridRenderCellParams,
}

export const AddressActionsCell: React.FC<AddressActionsCellProps> = ({params: {value, row}}) => {
  const [processDialogOpened, setProcessDialogOpened] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpened = Boolean(anchorEl);

  const dispatch = useTypedDispatch();

  const {enqueueSnackbar} = useSnackbar();

  const openMenu = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  }

  const toggleProcessDialog = () => {
    setProcessDialogOpened((prev) => !prev);
  }

  const onAction = async (type: AddressActionType) => {
    closeMenu();
    switch (type) {
      case AddressActionType.DELETE:
        await onDelete();
        break;
      case AddressActionType.UPDATE:
        toggleProcessDialog();
        break;
    }
  }

  const onDelete = async () => {
    const {id} = row;
    try {
      await AddressService.delete(id);
      await dispatch(getAddresses());
      enqueueSnackbar('Адрес успешно удален', SnackbarSuccessOptions);
    }
    catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  const onUpdate = async (processAddress: ProcessAddress) => {
    const {id} = row;
    try {
      await AddressService.update(id, processAddress);
      await dispatch(getAddresses());
      toggleProcessDialog();
      enqueueSnackbar('Адрес успешно сохранен', SnackbarSuccessOptions);
    }
    catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  return (
    <>
      <Stack direction="row" className="justify-between align-center" width={'100%'}>
        <Typography style={{width: '90%', overflow: 'auto'}}>{value}</Typography>
        <MoreVert className={"cu-p"} onClick={openMenu} style={{width: '10%'}}/>
      </Stack>
      <AddressActionsMenu
        open={menuOpened}
        anchorEl={anchorEl}
        onAction={onAction}
        onClose={closeMenu}
      />
      {processDialogOpened && <ProcessAddressDialog
        open={processDialogOpened}
        onClose={toggleProcessDialog}
        onSubmit={onUpdate}
        address={row as Address}
      />}
    </>
  );
}
