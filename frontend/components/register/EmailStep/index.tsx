import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, CircularProgress, InputAdornment, Typography} from "@mui/material";
import {MailOutline as EmailIcon, Telegram} from "@mui/icons-material";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";

import {CenteredCard} from "components/common/CenteredCard";
import {Form} from "components/common/Form";
import {Input} from "components/common/Input";
import {EmailStepSchema} from "schemas/register";
import {register as registerUser, setEmail, setStep} from "redux/slices/registerSlice";
import {Axios, getAxiosErrorData} from "core/axios";
import {AuthRoutes} from "core/api";
import {SnackbarErrorOptions} from "core/snackbar/snackbar-options";
import {useTypedDispatch} from "redux/hooks";
import {RegisterStep} from "types/register";
import {AppRoutes} from "core/routes";

import styles from 'components/register/EmailStep/EmailStep.module.scss';

export interface EmailStepData {
  email: string;
}

export const EmailStep: React.FC = () => {
  const dispatch = useTypedDispatch();
  const [loading, setLoading] = React.useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm({
    mode: "onChange",
    resolver: yupResolver(EmailStepSchema),
  })
  const {enqueueSnackbar} = useSnackbar();
  const router = useRouter();

  const onSubmit = async (data: EmailStepData) => {
    setLoading(true);
    const {email} = data;

    try {
      const {data: isBusy} = await Axios.get<boolean>(AuthRoutes.IS_EMAIL_BUSY, {params: {email}});
      if (isBusy) {
        enqueueSnackbar('User with provided e-mail is already exists', SnackbarErrorOptions);
      }
      else {
        await dispatch(setEmail(email));
        await dispatch(registerUser());
      }
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
    setLoading(false);
  }

  const onAlreadyHaveAnAccountClick = async () => {
    await router.push(AppRoutes.LOGIN);
    await dispatch(setStep(RegisterStep.USERNAME));
  }

  return (
    <CenteredCard>
      <Typography variant="h4" className="d-flex align-center">
        <Telegram fontSize="inherit" className="mr-10"/>Register
      </Typography>
      <Typography variant="h5" className="mt-20">
        We will send password to you. You can change him in profile.
      </Typography>
      <Form className="d-flex flex-column align-center mt-20 mb-20" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email')}
          label='E-mail'
          placeholder='Enter e-mail'
          className="mb-20"
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon/>
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
