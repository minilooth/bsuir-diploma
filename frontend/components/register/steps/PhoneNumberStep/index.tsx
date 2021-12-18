import React from 'react';
import {useTypedDispatch, useTypedSelector} from "redux/hooks";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, InputAdornment, Stack} from "@mui/material";
import {KeyboardReturn, Phone, SendOutlined, Telegram} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";

import {PhoneNumberStepSchema} from "schemas/register";
import {Form} from "components/common/Form";
import {RegisterCard} from "components/register/RegisterCard";
import {MaskedInput} from "components/common/MaskedInput";
import {selectPhoneNumber} from "redux/slices/register/selectors";
import {setPhoneNumber} from "redux/slices/register/actions";
import { back } from 'redux/slices/register';

export const PhoneNumberStep = () => {
  const dispatch = useTypedDispatch();
  const phoneNumber = useTypedSelector(selectPhoneNumber);
  const {control, handleSubmit, formState: {errors, isSubmitting}} = useForm({
    mode: "onChange",
    resolver: yupResolver(PhoneNumberStepSchema),
    defaultValues: {phoneNumber}
  })

  const onSubmit = async (data: {phoneNumber: string}) => {
    await dispatch(setPhoneNumber(data));
  }

  const onBack = async () => {
    await dispatch(back());
  }

  return (
    <RegisterCard
      title={'Регистрация'}
      icon={<Telegram fontSize={"inherit"} className="mr-10"/>}
      tip={'Введите номер телефона. Он будет использоваться для связи с вами.'}
      showBottomLink={true}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} spacing={2} alignItems={"center"} className={"wp-100"}>
          <MaskedInput
            control={control}
            name={"phoneNumber"}
            mask={"+375(99)999-99-99"}
            label={'Номер телефона'}
            placeholder={'Введите номер телефона'}
            inputProps={{
              startAdornment: (
                <InputAdornment position={"start"}>
                  <Phone/>
                </InputAdornment>
              )
            }}
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
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
              startIcon={<SendOutlined/>}
            >Далее</LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </RegisterCard>
  )
};
