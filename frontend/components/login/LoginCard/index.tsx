import React from 'react';
import {Box, FormControlLabel, InputAdornment, Typography} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LockOpen,
  PersonOutline as UserIcon,
  LockOutlined as PasswordIcon, VerifiedUser
} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import Link from 'next/link'
import {yupResolver} from "@hookform/resolvers/yup";
import {useRouter} from "next/router";
import {LoadingButton} from "@mui/lab";

import {Input} from "components/common/Input";
import {Form} from "components/common/Form";
import {CheckBox} from "components/common/CheckBox";
import {CenteredCard} from "components/common/CenteredCard";
import {getAxiosErrorData} from "core/axios";
import {AppRoutes} from "core/routes";
import {setCurrentUser} from 'redux/slices/usersSlice';
import {useTypedDispatch} from "redux/hooks";
import {LoginSchema} from "schemas/login";
import {enqueueError} from "redux/slices/snackbar/actions";
import {AuthService} from "service/user/AuthService";

import styles from 'components/login/LoginCard/LoginCard.module.scss';

export interface LoginParams {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export const LoginCard: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginSchema)
  })
  const router = useRouter();
  const dispatch = useTypedDispatch();

  const handleClickShowPassword = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowPassword((prev) => !prev);
  }

  const onSubmit = async (data: LoginParams) => {
    try {
      const user = await AuthService.login(data);
      await dispatch(setCurrentUser(user));
      await router.push(AppRoutes.HOME);
    } catch (err) {
      await dispatch(enqueueError(getAxiosErrorData(err)));
    }
  }

  return (
    <CenteredCard>
      <Typography variant="h4" className="d-flex align-center">
        <LockOpen fontSize="inherit" className="mr-10"/>Авторизация
      </Typography>
      <Form className="d-flex flex-column align-center mt-20 mb-20" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('username')}
          label='Имя пользователя'
          placeholder='Введите имя пользователя'
          className="mb-20"
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <UserIcon/>
              </InputAdornment>
            ),
          }}
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <Input
          {...register('password')}
          label='Пароль'
          type={showPassword ? 'text' : 'password'}
          placeholder='Введите пароль'
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon/>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Box className="pointer" onMouseDown={handleClickShowPassword}>
                  {showPassword ? <Visibility/> : <VisibilityOff/>}
                </Box>
              </InputAdornment>
            )
          }}
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <Box component="div" className="d-flex flex-row align-center justify-between wp-100">
          <FormControlLabel
            control={
              <CheckBox
                {...register('rememberMe')}
              />
            }
            label="Запомнить меня"
          />
          <Link href={"/restore-password"}>
            <a className="pointer hover-underline font-12">Забыли пароль ?</a>
          </Link>
        </Box>
        <LoadingButton
          type={"submit"}
          variant={"outlined"}
          color={"primary"}
          size={"small"}
          className={"mw-200"}
          startIcon={<VerifiedUser/>}
          loadingPosition={"start"}
          loading={isSubmitting}
        >Войти</LoadingButton>
      </Form>
      <Link href={"/register"}>
        <a className="d-flex justify-center pointer hover-underline font-14">Еще нет аккаунта?</a>
      </Link>
    </CenteredCard>
  )
}
