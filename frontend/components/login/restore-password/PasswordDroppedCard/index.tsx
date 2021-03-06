import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {Check} from '@mui/icons-material';
import {useRouter} from "next/router";

import {CenteredCard} from "components/common/CenteredCard";
import {AppRoutes} from "core/routes";
import {useTypedDispatch} from "redux/hooks";
import {RestorePasswordStep} from "types/login";
import {setRestorePasswordStep} from "redux/slices/loginSlice";

import styles from 'components/login/restore-password/PasswordDroppedCard/PasswordDroppedCard.module.scss';

export const PasswordDroppedCard: React.FC = () => {
  const router = useRouter();
  const dispatch = useTypedDispatch();

  const onLogIn = async () => {
    await router.push(AppRoutes.LOGIN);
    await dispatch(setRestorePasswordStep(RestorePasswordStep.RESTORE_PASSWORD));
  }

  return (
    <CenteredCard>
      <Typography variant="h4" className="d-flex align-center">
        <Check fontSize="inherit" className="mr-10"/>Пароль сброшен
      </Typography>
      <Typography variant="h5" className="mt-20 mb-20">
        Новый пароль отправлен вам на электронную почту. Теперь вы можете авторизоваться, используя новый пароль
      </Typography>
      <Box component="div" className="d-flex justify-center">
        <Button type="submit" variant="outlined" color="primary" className="mw-200" onClick={onLogIn}>
          На страницу авторизации
        </Button>
      </Box>
    </CenteredCard>
  )
}
