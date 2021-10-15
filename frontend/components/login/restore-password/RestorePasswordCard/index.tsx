import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, CircularProgress, InputAdornment, Typography} from "@mui/material";
import {MailOutline as EmailIcon, Telegram} from "@mui/icons-material";
import Link from 'next/link'
import {useSnackbar} from "notistack";

import {CenteredCard} from "components/common/CenteredCard";
import {Form} from "components/common/Form";
import {Input} from "components/common/Input";
import {Axios, getAxiosErrorData} from "core/axios";
import {AuthRoutes} from "core/api";
import {SnackbarErrorOptions} from 'core/snackbar/snackbar-options';
import {RestorePasswordSchema} from "schemas/login";
import {useTypedDispatch} from "redux/hooks";
import {restorePassword} from "redux/slices/loginSlice";

import styles from 'components/login/restore-password/RestorePasswordCard/RestorePasswordCard.module.scss';

export interface RestorePasswordData {
  email: string;
}

export const RestorePasswordCard: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm({
    mode: "onChange",
    resolver: yupResolver(RestorePasswordSchema),
  })
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useTypedDispatch();

  const onSubmit = async (data: RestorePasswordData) => {
    setLoading(true);
    const {email} = data;

    try {
      const {data: isRestorePasswordAllowed} = await Axios.get<boolean>(AuthRoutes.RESTORE_PASSWORD_ALLOWED, {params: {email}});

      if (isRestorePasswordAllowed) {
        await dispatch(restorePassword(email));
      } else {
        enqueueSnackbar('E-mail of this user is not confirmed', SnackbarErrorOptions);
      }
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
    setLoading(false);
  }

  return (
    <CenteredCard>
      <Typography variant="h4" className="d-flex align-center mb-20">
        <Telegram fontSize="inherit" className="mr-10"/>Restore password
      </Typography>
      <Typography variant="h5">
        We will send new password to you. You can change him in profile.
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
      <Link href={"/login"}>
        <a className="d-flex justify-center pointer hover-underline font-14">Don&apos;t need to restore password? Log
          In</a>
      </Link>
    </CenteredCard>
  )
}
