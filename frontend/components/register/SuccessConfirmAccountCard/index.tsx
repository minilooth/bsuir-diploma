import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {Check} from '@mui/icons-material';
import {useRouter} from "next/router";

import {CenteredCard} from "components/common/CenteredCard";
import {AppRoutes} from "core/routes";

import styles from 'components/register/SuccessConfirmAccountCard/SuccessConfirmAccountCard.module.scss';

export const SuccessConfirmAccountCard: React.FC = () => {
  const router = useRouter();

  const onLogIn = async () => {
    await router.push(AppRoutes.LOGIN);
  }

  return (
    <CenteredCard>
      <Typography variant="h4" className="d-flex align-center">
        <Check fontSize="inherit" className="mr-10"/>Success registration
      </Typography>
      <Typography variant="h5" className="mt-20 mb-20">
        E-mail successfully confirmed. Now you can log in by your credentials.
      </Typography>
      <Box component="div" className="d-flex justify-center">
        <Button type="submit" variant="outlined" color="primary" className="w-200" onClick={onLogIn}>
          To Log In Page
        </Button>
      </Box>
    </CenteredCard>
  )
}
