import React from 'react';
import {Stack, SvgIconProps, Typography} from "@mui/material";

import {CenteredCard} from "components/common/CenteredCard";
import {AppRoutes} from "core/routes";
import {useTypedDispatch} from "redux/hooks";
import {useRouter} from "next/router";
import { cancel } from 'redux/slices/register';

interface RegisterCardProps {
  title: string;
  icon: React.ReactElement<SvgIconProps>;
  tip?: string;
  showBottomLink: boolean;
}

export const RegisterCard: React.FC<RegisterCardProps> = ({title, icon, tip, showBottomLink, children}) => {
  const dispatch = useTypedDispatch();
  const router = useRouter();

  const onAlreadyHaveAnAccountClick = async () => {
    await router.push(AppRoutes.LOGIN);
    await dispatch(cancel());
  }

  return (
    <CenteredCard>
      <Typography variant="h4" className="d-flex align-center">
        <Stack direction={"row"} alignItems={"center"}>
          {icon}
          {title}
        </Stack>
      </Typography>
      {tip && (
        <Typography variant="h5" className="mt-20 mb-20">{tip}</Typography>
      )}
      {children}
      {showBottomLink && (
        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} className={"mt-20"}>
          <Typography variant="h5" className="cu-p hover-underline" onClick={onAlreadyHaveAnAccountClick}>
            Уже имеете аккаунт? Авторизуйтесь
          </Typography>
        </Stack>
      )}
    </CenteredCard>
  );
}
;
