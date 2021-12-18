import React from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import {useSnackbar} from "notistack";
import {useDispatch} from "react-redux";
import {PersonOutline as UserIcon, PowerSettingsNew as LogoutIcon} from "@mui/icons-material";
import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";

import {SnackbarErrorOptions} from "core/snackbar/snackbar-options";
import {Axios, getAxiosErrorData} from "core/axios";
import {AuthRoutes} from "core/api";
import {setCurrentUser} from 'redux/slices/usersSlice';
import {AppRoutes} from "core/routes";

import styles from 'components/nav/Navbar/UserData/UserPopupMenu/UserPopupMenu.module.scss';

interface UserPopupMenuProps {
  onProfile: () => void;
}

export const UserPopupMenu: React.FC<UserPopupMenuProps> = ({onProfile}) => {
  const {enqueueSnackbar} = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await Axios.get(AuthRoutes.LOGOUT);
      await router.push(AppRoutes.LOGIN);
      dispatch(setCurrentUser(null));
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  return (
    <List>
      <ListItem button onClick={onProfile}>
        <ListItemIcon>
          <UserIcon/>
        </ListItemIcon>
        <ListItemText disableTypography primary="Профиль" className="font-14"/>
      </ListItem>
      <ListItem button onClick={logout}>
        <ListItemIcon>
          <LogoutIcon/>
        </ListItemIcon>
        <ListItemText disableTypography primary="Выйти" className="font-14"/>
      </ListItem>
    </List>
  )
}
