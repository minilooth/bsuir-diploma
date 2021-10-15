import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {Telegram} from '@mui/icons-material';
import {useRouter} from "next/router";

import {CenteredCard} from "components/common/CenteredCard";
import {setStep} from "redux/slices/registerSlice";
import {RegisterStep} from "types/register";
import {AppRoutes} from "core/routes";
import {useTypedDispatch} from "redux/hooks";

import styles from 'components/register/ConfirmationMailStep/ConfirmationMailStep.module.scss';

export const ConfirmationMailStep: React.FC = () => {
  const dispatch = useTypedDispatch();
  const router = useRouter();

  const onLogIn = async () => {
    await router.push(AppRoutes.LOGIN);
    await dispatch(setStep(RegisterStep.USERNAME));
  }

  return (
    <CenteredCard>
      <Typography variant="h4" className="d-flex align-center">
        <Telegram fontSize="inherit" className="mr-10"/>Register
      </Typography>
      <Typography variant="h5" className="mt-20 mb-20">
        We sent password and confirmation link to you. You can change password in profile.
      </Typography>
      <Box component="div" className="d-flex justify-center">
        <Button type="submit" variant="outlined" color="primary" className="w-200" onClick={onLogIn}>
          To Log In Page
        </Button>
      </Box>
    </CenteredCard>
  )
}
