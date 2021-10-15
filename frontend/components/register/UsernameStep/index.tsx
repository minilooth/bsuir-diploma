import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, CircularProgress, InputAdornment, Typography} from "@mui/material";
import {PersonOutline as UserIcon, Telegram} from "@mui/icons-material";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";

import {CenteredCard} from "components/common/CenteredCard";
import {Form} from "components/common/Form";
import {Input} from "components/common/Input";
import {UsernameStepSchema} from "schemas/register";
import {setUsername, setStep} from "redux/slices/registerSlice";
import {Axios, getAxiosErrorData} from "core/axios";
import {AuthRoutes} from "core/api";
import {SnackbarErrorOptions} from "core/snackbar/snackbar-options";
import {useTypedDispatch} from "redux/hooks";
import {RegisterStep} from "types/register";
import {AppRoutes} from "core/routes";

import styles from 'components/register/UsernameStep/UsernameStep.module.scss';

export interface UsernameStepData {
  username: string;
}

export const UsernameStep: React.FC = () => {
  const dispatch = useTypedDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm({
    mode: "onChange",
    resolver: yupResolver(UsernameStepSchema),
  })
  const router = useRouter();

  const onSubmit = async (data: UsernameStepData) => {
    setLoading(true);
    const {username} = data;

    try {
      const {data: isBusy} = await Axios.get<boolean>(AuthRoutes.IS_USERNAME_BUSY, {params: {username}});
      if (isBusy) {
        enqueueSnackbar('User with provided username is already exists', SnackbarErrorOptions);
      }
      else {
        await dispatch(setUsername(username));
        await dispatch(setStep(RegisterStep.EMAIL));
      }
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
    setLoading(false);
  }

  const onAlreadyHaveAnAccountClick = async () => {
    await router.push(AppRoutes.LOGIN);
  }

  return (
    <CenteredCard>
      <Typography variant="h4" className="d-flex align-center">
        <Telegram fontSize="inherit" className="mr-10"/>Register
      </Typography>
      <Typography variant="h5" className="mt-20">
        Enter your username. It will be user for authorization.
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
        <Button type="submit" variant="outlined" color="primary" className="w-200" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit"/> : "Next"}
        </Button>
      </Form>
      <Typography variant="h5" className="d-flex justify-center pointer hover-underline"
                  onClick={onAlreadyHaveAnAccountClick}>
        Already have an account? Log in
      </Typography>
    </CenteredCard>
  )
}
