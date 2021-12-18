import React from 'react';
import {Button, Stack} from "@mui/material";
import {Telegram, UndoOutlined} from '@mui/icons-material';
import {useRouter} from "next/router";

import {AppRoutes} from "core/routes";
import {useTypedDispatch} from "redux/hooks";
import {RegisterCard} from "components/register/RegisterCard";
import { cancel } from 'redux/slices/register';

import styles from 'components/register/steps/SuccessStep/SuccessStep.module.scss';

export const SuccessStep: React.FC = () => {
  const dispatch = useTypedDispatch();
  const router = useRouter();

  const onLogIn = async () => {
    await router.push(AppRoutes.LOGIN);
    await dispatch(cancel());
  }

  return (
    <RegisterCard
      title={'Регистрация'}
      icon={<Telegram fontSize={"inherit"} className="mr-10"/>}
      tip={'Мы отправили вам пароль и ссылку на подтверждение e-mail. Вы сможете изменить пароль в профиле.'}
      showBottomLink={false}
    >
      <Stack direction={"row"} justifyContent={"center"} className={"wp-100"}>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          size={"small"}
          className="mw-200"
          onClick={onLogIn}
          startIcon={<UndoOutlined/>}
        >
          На страницу авторизации
        </Button>
      </Stack>
    </RegisterCard>
  )
}
