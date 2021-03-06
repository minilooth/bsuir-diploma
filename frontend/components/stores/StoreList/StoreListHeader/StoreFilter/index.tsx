import React from 'react';
import {
  Box,
  Button, Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Typography
} from "@mui/material";
import {CloseOutlined, FilterAlt} from "@mui/icons-material";
import {Form} from "components/common/Form";
import {Dropdown} from "components/common/Dropdown";
import {SortDirection, SortDirections} from "types/common/sort-direction";
import {StoreSort, StoreSortItems, StoreType, StoreTypes} from "types/stores/store";
import {useQuery} from "core/hooks/useQuery";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {UserFilterSchema} from "schemas/users";
import {useTypedSelector} from "redux/hooks";
import {selectAddresses} from "redux/slices/storesSlice";
import {StoreFilterSchema} from "schemas/store";

interface StoreFilterProps {
  open: boolean;
  onClose: () => void;
}

interface StoreFilterData {
  sort: StoreSort;
  sortDirection: SortDirection;
  type: StoreType;
  addressId: number;
}

export const StoreFilter: React.FC<StoreFilterProps> = ({open, onClose}) => {
  const addresses = useTypedSelector(selectAddresses);
  const {values, appendToQuery, push} = useQuery();
  const {handleSubmit, control, watch, formState: {errors}} = useForm({
    mode: "onChange",
    defaultValues: {
      sort: values.sort ?? '',
      sortDirection: values.sortDirection ?? '',
      type: values.type ?? '',
      addressId: values.addressId ?? ''
    },
    resolver: yupResolver(StoreFilterSchema)
  })

  const sort = watch('sort');

  const onSubmit = async (data: StoreFilterData) => {
    const {sort: sortField, sortDirection, type, addressId} = data;
    appendToQuery({
      sort: sortField,
      sortDirection: sortDirection,
      type: type,
      addressId: addressId?.toString()
    })
    await push();
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle className={"d-flex flex-row justify-between align-center"}>
        <Typography variant="h4" className="d-flex align-center">
          <FilterAlt fontSize="inherit" className="mr-10"/>???????????? ?????????????????? ?? ??????????????
        </Typography>
        <CloseOutlined className="cu-p" onClick={onClose}/>
      </DialogTitle>
      <DialogContent>
        <Form className="d-flex flex-column align-center mt-20 mb-20" onSubmit={handleSubmit(onSubmit)}
              id="filter-form">
          <Box className="d-flex wp-100 mb-10">
            <Dropdown
              name={'sort'}
              control={control}
              label={"????????????????????"}
              className={sort ? "mr-10" : ""}
              displayEmpty={true}
              startAdornment={<InputAdornment position={"start"}/>}
              error={!!errors.sort}
              helperText={errors?.sort?.message}
            >
              <MenuItem value={''}>????????????????...</MenuItem>
              {StoreSortItems.map((item, index) =>
                <MenuItem value={item.query} key={index}>{item.label}</MenuItem>
              )}
            </Dropdown>
            {sort && (
              <Dropdown
                name={'sortDirection'}
                control={control}
                label={"?????? ????????????????????"}
                className={"ml-10"}
                displayEmpty={true}
                startAdornment={<InputAdornment position={"start"}/>}
                error={!!errors.sortDirection}
                helperText={errors?.sortDirection?.message}
              >
                <MenuItem value={''}>????????????????...</MenuItem>
                {SortDirections.map((item, index) =>
                  <MenuItem value={item.query} key={index}>{item.label}</MenuItem>
                )}
              </Dropdown>
            )}
          </Box>
          <Dropdown
            name={'type'}
            control={control}
            label={"??????"}
            className={"mb-10"}
            displayEmpty={true}
            startAdornment={<InputAdornment position={"start"}/>}
            error={!!errors.type}
            helperText={errors?.type?.message}
          >
            <MenuItem value={''}>????????????????...</MenuItem>
            {StoreTypes.map((item, index) =>
              <MenuItem value={item.query} key={index}>{item.label}</MenuItem>
            )}
          </Dropdown>
          <Dropdown
            name={'addressId'}
            control={control}
            label={"??????????"}
            displayEmpty={true}
            startAdornment={<InputAdornment position={"start"}/>}
            error={!!errors.type}
            helperText={errors?.type?.message}
          >
            <MenuItem value={''}>????????????????...</MenuItem>
            {addresses.map(({id, full}, index) =>
              <MenuItem value={id} key={index}>{full}</MenuItem>
            )}
          </Dropdown>
        </Form>
      </DialogContent>
      <DialogActions>
        <Button form={"filter-form"} type={"reset"} color={"error"}>????????????????</Button>
        <Button form={"filter-form"} type={"submit"}>??????????????????</Button>
      </DialogActions>
    </Dialog>
  );
};
