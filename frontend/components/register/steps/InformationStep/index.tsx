import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Check, KeyboardReturn, ShortText, Telegram} from "@mui/icons-material";
import {Button, InputAdornment, Stack} from "@mui/material";
import {LoadingButton} from "@mui/lab";

import {useTypedDispatch, useTypedSelector} from "redux/hooks";
import {InformationStepSchema} from "schemas/register";
import {RegisterCard} from "components/register/RegisterCard";
import {Form} from "components/common/Form";
import {Input} from "components/common/Input";
import {selectFirstname, selectLastname, selectMiddlename} from "redux/slices/register/selectors";
import { register as registerNewUser } from 'redux/slices/register/actions';
import {back, setInformation } from 'redux/slices/register';

export const InformationStep = () => {
  const dispatch = useTypedDispatch();

  const firstname = useTypedSelector(selectFirstname);
  const lastname = useTypedSelector(selectLastname);
  const middlename = useTypedSelector(selectMiddlename);

  const {register, handleSubmit, formState: {errors, isSubmitting}, getValues} = useForm({
    mode: "onChange",
    resolver: yupResolver(InformationStepSchema),
    defaultValues: {firstname, lastname, middlename}
  })

  const onSubmit = async (data: {firstname: string, lastname: string, middlename: string}) => {
    await dispatch(registerNewUser(data));
  }

  const onBack = async () => {
    const data = getValues();
    await dispatch(setInformation(data));
    await dispatch(back());
  }

  return (
    <RegisterCard
      title={'Регистрация'}
      icon={<Telegram fontSize={"inherit"} className="mr-10"/>}
      tip={'Введите информацию о вас.'}
      showBottomLink={true}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} spacing={2} alignItems={"center"} className={"wp-100"}>
          <Input
            {...register('firstname')}
            label='Имя'
            placeholder='Введите имя'
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ShortText/>
                </InputAdornment>
              ),
            }}
            error={!!errors.firstname}
            helperText={errors?.firstname?.message}
          />
          <Input
            {...register('lastname')}
            label='Фамилия'
            placeholder='Введите фамилию'
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ShortText/>
                </InputAdornment>
              ),
            }}
            error={!!errors.lastname}
            helperText={errors?.lastname?.message}
          />
          <Input
            {...register('middlename')}
            label='Отчество'
            placeholder='Введите отчество'
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ShortText/>
                </InputAdornment>
              ),
            }}
            error={!!errors.middlename}
            helperText={errors?.middlename?.message}
          />
          <Stack direction={"row"} spacing={1} alignItems={"center"} justifyContent={"center"} className={"wp-100"}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              size={"small"}
              className="mw-100"
              onClick={onBack}
              startIcon={<KeyboardReturn/>}
              disabled={isSubmitting}
            >Назад</Button>
            <LoadingButton
              type={"submit"}
              variant={"outlined"}
              color={"primary"}
              size={"small"}
              className={"mw-100"}
              loadingPosition={"start"}
              loading={isSubmitting}
              startIcon={<Check/>}
            >Зарегистрироваться</LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </RegisterCard>
  )
};
