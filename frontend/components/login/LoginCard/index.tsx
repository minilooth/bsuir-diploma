import React from 'react';
import {Box, Button, CircularProgress, FormControlLabel, InputAdornment, Typography} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LockOpen,
  PersonOutline as UserIcon,
  LockOutlined as PasswordIcon
} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import Link from 'next/link'
import {yupResolver} from "@hookform/resolvers/yup";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";

import {Input} from "components/common/Input";
import {Form} from "components/common/Form";
import {CheckBox} from "components/common/CheckBox";
import {CenteredCard} from "components/common/CenteredCard";
import {SnackbarErrorOptions} from "core/snackbar/snackbar-options";
import {Axios, getAxiosErrorData} from "core/axios";
import {AuthRoutes} from "core/api";
import {AppRoutes} from "core/routes";
import {User} from "types/user";
import {setCurrentUser} from 'redux/slices/usersSlice';
import {useTypedDispatch} from "redux/hooks";
import {LoginSchema} from "schemas/login";

import styles from 'components/login/LoginCard/LoginCard.module.scss';

export interface LoginData {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export const LoginCard: React.FC = () => {
  const {enqueueSnackbar} = useSnackbar();
  const [showPassword, setShowPassword] = React.useState(false);
  const {register, handleSubmit, control, watch, formState: {errors, isSubmitting}} = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginSchema)
  })
  const router = useRouter();
  const dispatch = useTypedDispatch();

  const rememberMe = watch('rememberMe');

  console.log(rememberMe);

  const handleClickShowPassword = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowPassword((prev) => !prev);
  }

  const onSubmit = async (data: LoginData) => {
    try {
      const {data: user} = await Axios.post<User | null>(AuthRoutes.LOGIN, data);
      await dispatch(setCurrentUser(user));
      await router.push(AppRoutes.HOME);
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  return (
    <CenteredCard>
      <Typography variant="h4" className="d-flex align-center">
        <LockOpen fontSize="inherit" className="mr-10"/>Log In
      </Typography>
      <Form className="d-flex flex-column align-center mt-20 mb-20" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('username')}
          label='Username'
          placeholder='Enter username'
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
          label='Password'
          type={showPassword ? 'text' : 'password'}
          placeholder='Enter password'
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
            label="Remember Me"
          />
          <Link href={"/restore-password"}>
            <a className="pointer hover-underline font-12">Forgot password ?</a>
          </Link>
        </Box>
        <Button type="submit" variant="outlined" color="primary" className="w-200" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} color="inherit"/> : "Log In"}
        </Button>
      </Form>
      <Link href={"/register"}>
        <a className="d-flex justify-center pointer hover-underline font-14">Don&apos;t have an account?</a>
      </Link>
    </CenteredCard>
  )
}
