import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography
} from "@mui/material";
import {CloseOutlined, House} from "@mui/icons-material";
import {Table} from "components/common/Table";
import {NoRowsOverlay} from "components/common/NoRowsOverlay";
import {addressColumns} from "components/stores/AddressesDialog/addresses-grid-columns";
import {useTypedDispatch, useTypedSelector} from "redux/hooks";
import {getAddresses, selectAddresses} from "redux/slices/storesSlice";
import {ProcessAddress} from "types/stores/address";
import {ProcessAddressDialog} from "components/stores/AddressesDialog/ProcessAddressDialog";
import {useSnackbar} from "notistack";
import {AddressService} from "service/stores/AddressService";
import {getAxiosErrorData} from "core/axios";
import {SnackbarErrorOptions, SnackbarSuccessOptions} from "core/snackbar/snackbar-options";

interface AddressesDialogProps {
  open: boolean;
  onClose: () => void;
}

export enum AddressActionType {
  ADD,
  UPDATE,
  DELETE
}

export const AddressesDialog: React.FC<AddressesDialogProps> = ({open, onClose}) => {
  const [processDialogOpened, setProcessDialogOpened] = React.useState(false);
  const addresses = useTypedSelector(selectAddresses);
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useTypedDispatch();

  const toggleProcessDialog = () => {
    setProcessDialogOpened((prev) => !prev);
  }

  const onAdd = async (processAddress: ProcessAddress) => {
    try {
      await AddressService.add(processAddress);
      await dispatch(getAddresses());
      toggleProcessDialog();
      enqueueSnackbar('Адрес успешно сохранен', SnackbarSuccessOptions);
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogTitle className="d-flex justify-between align-center">
        <Typography variant="h4" className="d-flex align-center">
          <House fontSize="inherit" className="mr-10"/>Адреса
        </Typography>
        <CloseOutlined className="cu-p" onClick={onClose}/>
      </DialogTitle>
      <DialogContent className={"pb-20"}>
        <Stack height={415} spacing={1}>
          <Stack direction={"row"}>
            <Button onClick={toggleProcessDialog}>Добавить</Button>
          </Stack>
          <Table
            columns={addressColumns}
            rows={addresses}
            components={{
              NoRowsOverlay: () => NoRowsOverlay({text: 'Не найдено ни одного адреса'})
            }}
          />
        </Stack>
      </DialogContent>
      {processDialogOpened && <ProcessAddressDialog
        open={processDialogOpened}
        onClose={toggleProcessDialog}
        onSubmit={onAdd}
      />}
    </Dialog>
  );
};
