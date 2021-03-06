import React, {ChangeEvent} from 'react';
import {Box, Button, ButtonGroup, Chip, InputAdornment, Stack, Typography} from "@mui/material";
import {Search, Store, Settings, Add, FilterList} from "@mui/icons-material";
import {Input} from "components/common/Input";
import debounce from "debounce";
import {useQuery} from "core/hooks/useQuery";
import {useForm} from "react-hook-form";
import {SortDirection, SortDirections} from "types/common/sort-direction";
import {StoreSortItems, StoreType, StoreTypes} from "types/stores/store";
import {useTypedSelector} from "redux/hooks";
import {selectAddresses} from "redux/slices/storesSlice";
import {StoreFilter} from "components/stores/StoreList/StoreListHeader/StoreFilter";
import {ProcessStoreDialog} from "components/stores/ProcessStoreDialog";
import {AddressesDialog} from "components/stores/AddressesDialog";

enum DialogType {
  FILTER,
  PROCESS,
  SETTINGS
}

interface DialogState {
  filter: boolean,
  process: boolean,
  settings: boolean
}

export const StoreListHeader = () => {
  const [dialogState, setDialogState] = React.useState<DialogState>({
    filter: false,
    process: false,
    settings: false
  })
  const {values, deleteFromQuery, appendToQuery, push} = useQuery();

  const addresses = useTypedSelector(selectAddresses);

  const {register} = useForm({
    defaultValues: {
      search: values.search ?? ''
    }
  })

  const toggleDialog = (type: DialogType) => {
    switch (type) {
      case DialogType.FILTER:
        setDialogState((prev) => {
          return {
            ...prev,
            filter: !prev.filter
          }
        });
        break;
      case DialogType.PROCESS:
        setDialogState((prev) => {
          return {
            ...prev,
            process: !prev.process
          }
        });
        break;
      case DialogType.SETTINGS:
        setDialogState((prev) => {
          return {
            ...prev,
            settings: !prev.settings
          }
        })
        break;
    }
  }

  const deleteFilterItem = async (key: string | string[]) => {
    deleteFromQuery(key);
    await push()
  }

  const onSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    appendToQuery({
      search: event.target.value
    });
    await push();
  }

  const sort = StoreSortItems.find(i => i.query === values.sort)?.label;
  const sortDirection = SortDirections.find(i => i.query === values.sortDirection)?.label?.toLowerCase();
  const address = addresses.find(a => a.id === Number(values.addressId));
  const type = StoreTypes.find(t => t.query === values.type)?.label;

  return (
    <>
      <Stack direction="row" className="justify-between align-center">
        <Typography variant="h4" className="d-flex align-center">
          <Store fontSize="inherit" className="mr-10"/>
          ???????????? ?? ????????????????
        </Typography>
        <Box>
          <Input
            {...register('search')}
            placeholder='??????????'
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search/>
                </InputAdornment>
              ),
            }}
            onChange={debounce(onSearch, 1000)}
          />
        </Box>
      </Stack>
      <Stack direction="row" spacing={2} className="pt-20 pb-20 align-center">
        <Stack direction="row" spacing={1} className="align-center">
          <ButtonGroup color={"primary"} variant={"outlined"} size={"small"}>
            <Button
              startIcon={<Add/>}
              onClick={() => toggleDialog(DialogType.PROCESS)}
            >
              ????????????????
            </Button>
            <Button
              startIcon={<FilterList/>}
              onClick={() => toggleDialog(DialogType.FILTER)}
            >
              ????????????
            </Button>
            <Button
              startIcon={<Settings/>}
              onClick={() => toggleDialog(DialogType.SETTINGS)}
            >
              ??????????????????
            </Button>
          </ButtonGroup>
        </Stack>
        <Stack direction="row" spacing={1} className="super-scroll align-center">
          {sort && sortDirection && (
            <Chip
              label={`????????????????????: ${sort} ${sortDirection}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem(['sort', 'sortDirection'])}/>
          )}
          {type && (
            <Chip
              label={`??????: ${type}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem('type')}/>
          )}
          {address && (
            <Chip
              label={`??????????: ${address.full}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem('addressId')}/>
          )}
        </Stack>
      </Stack>
      {dialogState.filter && <StoreFilter open={dialogState.filter} onClose={() => toggleDialog(DialogType.FILTER)}/>}
      {dialogState.process && (
        <ProcessStoreDialog
          open={dialogState.process}
          onClose={() => toggleDialog(DialogType.PROCESS)}
        />
      )}
      {dialogState.settings &&
        <AddressesDialog
          open={dialogState.settings}
          onClose={() => toggleDialog(DialogType.SETTINGS)}
        />
      }
    </>
  );
};
