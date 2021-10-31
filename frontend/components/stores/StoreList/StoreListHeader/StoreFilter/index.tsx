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
import {SortDirection} from "types/common/sort-direction";
import {StoreSort, StoreSortItems, StoreType, StoreTypes} from "types/stores/store";
import {useQuery} from "core/hooks/useQuery";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {UserFilterSchema} from "schemas/users";
import {useTypedSelector} from "redux/hooks";
import {selectAddresses} from "redux/slices/storesSlice";

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
  })

  const sort = watch('sort');

  const onSubmit = async (data: StoreFilterData) => {
    const {sort: sortField, sortDirection, type, addressId} = data;
    appendToQuery({
      sort: sortField?.toString(),
      sortDirection: sortDirection?.toString(),
      type: type?.toString(),
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
          <FilterAlt fontSize="inherit" className="mr-10"/>Фильтр магазинов и складов
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
              label={"Сортировка"}
              className={sort ? "mr-10" : ""}
              displayEmpty={true}
              startAdornment={<InputAdornment position={"start"}/>}
              error={!!errors.sort}
              helperText={errors?.sort?.message}
            >
              <MenuItem value={''}>Выберите...</MenuItem>
              {StoreSortItems.map((item, index) =>
                <MenuItem value={item.query} key={index}>{item.label}</MenuItem>
              )}
            </Dropdown>
            {sort && (
              <Dropdown
                name={'sortDirection'}
                control={control}
                label={"Тип сортировки"}
                className={"ml-10"}
                displayEmpty={true}
                startAdornment={<InputAdornment position={"start"}/>}
                error={!!errors.sortDirection}
                helperText={errors?.sortDirection?.message}
              >
                <MenuItem value={''}>Выберите...</MenuItem>
                {Object.entries(SortDirection).map(([key, value], index) =>
                  <MenuItem value={key} key={index}>{value}</MenuItem>
                )}
              </Dropdown>
            )}
          </Box>
          <Dropdown
            name={'type'}
            control={control}
            label={"Тип"}
            className={"mb-10"}
            displayEmpty={true}
            startAdornment={<InputAdornment position={"start"}/>}
            error={!!errors.type}
            helperText={errors?.type?.message}
          >
            <MenuItem value={''}>Выберите...</MenuItem>
            {StoreTypes.map(({key, label}, index) =>
              <MenuItem value={key} key={index}>{label}</MenuItem>
            )}
          </Dropdown>
          <Dropdown
            name={'addressId'}
            control={control}
            label={"Адрес"}
            displayEmpty={true}
            startAdornment={<InputAdornment position={"start"}/>}
            error={!!errors.type}
            helperText={errors?.type?.message}
          >
            <MenuItem value={''}>Выберите...</MenuItem>
            {addresses.map(({id, full}, index) =>
              <MenuItem value={id} key={index}>{full}</MenuItem>
            )}
          </Dropdown>
        </Form>
      </DialogContent>
      <DialogActions>
        <Button form={"filter-form"} type={"reset"} color={"error"}>Очистить</Button>
        <Button form={"filter-form"} type={"submit"}>Применить</Button>
      </DialogActions>
    </Dialog>
  );
};
