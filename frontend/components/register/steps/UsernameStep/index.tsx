import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {InputAdornment, Stack} from "@mui/material";
import {PersonOutline as UserIcon, SendOutlined, Telegram} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";

import {Form} from "components/common/Form";
import {Input} from "components/common/Input";
import {UsernameStepSchema} from "schemas/register";
import {useTypedDispatch, useTypedSelector} from "redux/hooks";
import {RegisterCard} from "components/register/RegisterCard";
import {selectUsername} from "redux/slices/register/selectors";
import {setUsername} from "redux/slices/register/actions";

import styles from 'components/register/steps/UsernameStep/UsernameStep.module.scss';

export const UsernameStep: React.FC = () => {
  const dispatch = useTypedDispatch();
  const username = useTypedSelector(selectUsername);
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
    mode: "onChange",
    resolver: yupResolver(UsernameStepSchema),
    defaultValues: {username}
  })

  const onSubmit = async (data: {username: string}) => {
    await dispatch(setUsername(data));
  }

  return (
    <RegisterCard
      title={'Регистрация'}
      icon={<Telegram fontSize={"inherit"} className="mr-10"/>}
      tip={'Введите имя пользователя. Оно будет использоваться для авторизации.'}
      showBottomLink={true}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} spacing={2} alignItems={"center"} className={"wp-100"}>
          <Input
            {...register('username')}
            label='Имя пользователя'
            placeholder='Введите имя пользователя'
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <UserIcon/>
                </InputAdornment>
              ),
            }}
            error={!!errors.username}
            helperText={errors?.username?.message}
          />
          <LoadingButton
            type={"submit"}
            variant={"outlined"}
            color={"primary"}
            size={"small"}
            className={"mw-200"}
            loadingPosition={"start"}
            loading={isSubmitting}
            startIcon={<SendOutlined/>}
          >Далее</LoadingButton>
        </Stack>
      </Form>
    </RegisterCard>
  )
}
