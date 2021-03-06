import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Typography
} from "@mui/material";
import {CloseOutlined, FilterAlt} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import {Form} from "components/common/Form";
import {SortItems, UserSort} from "types/user";
import {Dropdown} from "components/common/Dropdown";
import {SortDirection, SortDirections} from "types/common/sort-direction";
import {useQuery} from "core/hooks/useQuery";
import {Input} from "components/common/Input";
import {yupResolver} from "@hookform/resolvers/yup";
import {UserFilterSchema} from "schemas/users";
import {DATE_FORMAT, DateUtils} from "utils/DateUtils";
import {MaskedInput} from "components/common/MaskedInput";

interface UserFilterProps {
  open: boolean;
  onClose: () => void;
}

interface UserFilterData {
  sort: UserSort;
  sortDirection: SortDirection;
  fullname: string;
  email: string;
  phoneNumber: string;
  registerDateFrom: Date,
  registerDateTo: Date
}

export const UserFilter: React.FC<UserFilterProps> = ({open, onClose}) => {
  const {values, appendToQuery, push} = useQuery();
  const {register, handleSubmit, control, watch, formState: {errors}, reset} = useForm({
    mode: "onChange",
    defaultValues: {
      sort: values.sort ?? '',
      sortDirection: values.sortDirection ?? '',
      fullname: values.fullname,
      email: values.email,
      phoneNumber: values.phoneNumber,
      registerDateFrom: values.registerDateFrom ? new Date(Number(values.registerDateFrom)) : null,
      registerDateTo: values.registerDateTo ? new Date(Number(values.registerDateTo)) : null
    },
    resolver: yupResolver(UserFilterSchema)
  })

  const sort = watch('sort');

  const onSubmit = async (data: UserFilterData) => {
    const {sort: sortField, sortDirection, fullname, email, phoneNumber, registerDateFrom, registerDateTo} = data;
    appendToQuery({
      sort: sortField,
      sortDirection: sortDirection,
      fullname,
      email,
      phoneNumber,
      registerDateFrom: registerDateFrom ? new Date(registerDateFrom).getTime() : null,
      registerDateTo: registerDateTo ? new Date(registerDateTo).getTime() : null
    })
    await push();
    onClose();
  }

  const onReset = () => {
    reset({
      sort: '',
      sortDirection: '',
      fullname: '',
      email: '',
      phoneNumber: '',
      registerDateFrom: null,
      registerDateTo: null
    });
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
          <FilterAlt fontSize="inherit" className="mr-10"/>???????????? ??????????????????????????
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
              {SortItems.map((item, index) =>
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
          <Input
            {...register('fullname')}
            label={'?????? ?? ??????????????'}
            placeholder={'?????????????? ?????? ?? ??????????????'}
            className={"mb-10"}
            inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
            error={!!errors.fullname}
            helperText={errors?.fullname?.message}
          />
          <Input
            {...register('email')}
            label={'E-mail'}
            placeholder={'?????????????? E-mail'}
            className={"mb-10"}
            inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <MaskedInput
            control={control}
            name={"phoneNumber"}
            mask={"+375(99)999-99-99"}
            label={'?????????? ????????????????'}
            placeholder={'?????????????? ?????????? ????????????????'}
            className={"mb-10"}
            inputProps={{
              startAdornment: <InputAdornment position={"start"}/>
            }}
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
          />
          <Box className={"d-flex justify-center wp-100"}>
            <Input
              {...register('registerDateFrom')}
              label={"???????? ?????????????????????? ????"}
              className={"mr-10"}
              type={"date"}
              inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
              error={!!errors.registerDateFrom}
              helperText={errors?.registerDateFrom?.message}
            />
            <Input
              {...register('registerDateTo')}
              label={"???????? ?????????????????????? ????"}
              className={"ml-10"}
              type={"date"}
              inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
              error={!!errors.registerDateTo}
              helperText={errors?.registerDateTo?.message}
            />
          </Box>
        </Form>
      </DialogContent>
      <DialogActions>
        <Button form={"filter-form"} onClick={onReset} color={"error"}>????????????????</Button>
        <Button form={"filter-form"} type={"submit"}>??????????????????</Button>
      </DialogActions>
    </Dialog>
  );
};
