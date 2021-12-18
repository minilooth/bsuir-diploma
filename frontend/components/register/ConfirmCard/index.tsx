import React from 'react';
import {Button, Stack} from "@mui/material";
import {Check, UndoOutlined} from '@mui/icons-material';
import {useRouter} from "next/router";

import {RegisterCard} from "components/register/RegisterCard";
import {AppRoutes} from "core/routes";

import styles from 'components/register/ConfirmCard/ConfirmCard.module.scss';

export const ConfirmCard: React.FC = () => {
  const router = useRouter();

  const onLogIn = async () => {
    await router.push(AppRoutes.LOGIN);
  }

  return (
    <RegisterCard
      title={'Успешная регистрация'}
      icon={<Check fontSize={"inherit"} className={"mr-10"}/>}
      tip={'E-mail успешно подтвержден. Теперь вы можете авторизоваться, используя имя пользователя и пароль'}
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
