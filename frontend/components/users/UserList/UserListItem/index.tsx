import React from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Image from "next/image";
import clsx from "clsx";

import {RoleEnum, RoleItems, User} from "types/user";
import {UserAction, UserListItemActionMenu} from "components/users/UserList/UserListItem/UserListItemActionMenu";
import {ProcessUserDialog} from "components/users/ProcessUserDialog";
import {useSnackbar} from "notistack";
import {getAxiosErrorData} from "core/axios";
import {SnackbarErrorOptions, SnackbarSuccessOptions} from "core/snackbar/snackbar-options";
import {UserService} from "service/UserService";
import {useTypedDispatch} from "redux/hooks";
import {useQuery} from "core/hooks/useQuery";
import {getAll} from "redux/slices/usersSlice";

import styles from 'components/users/UserList/UserListItem/UserListItem.module.scss';
import {getAvatarUrl} from "utils/functions/getAvatarUrl";
import {getAvatarAlt} from "utils/functions/getAvatarAlt";
import {ChangePasswordDialog} from "components/users/ChangePasswordDialog";

enum UserDialog {
  PROCESS,
  CHANGE_PASSWORD
}

interface UserListItemProps {
  user: User;
}

export const UserListItem: React.FC<UserListItemProps> = ({user}) => {
  const {id, avatar, firstname, lastname, username, middlename, email, phoneNumber, roles, isAccountNonLocked} = user;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dialogsState, setDialogStates] = React.useState({process: false, changePassword: false});
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useTypedDispatch();
  const {values} = useQuery();
  const menuOpened = Boolean(anchorEl);

  const onOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const toggleDialog = (dialog: UserDialog) => {
    switch (dialog) {
      case UserDialog.PROCESS:
        setDialogStates((prev) => {
          return {...prev, process: !prev.process};
        })
        break;
      case UserDialog.CHANGE_PASSWORD:
        setDialogStates((prev) => {
          return {...prev, changePassword: !prev.changePassword}
        })
        break;
      default:
        break;
    }
  }

  const onDelete = async () => {
    try {
      await UserService.delete(id);
      enqueueSnackbar(`Пользователь успешно удален`, SnackbarSuccessOptions);
      await dispatch(getAll({query: values}));
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  const onLock = async () => {
    try {
      await UserService.lock(id);
      enqueueSnackbar(`Пользователь успешно ${isAccountNonLocked ? 'заблокирован' : 'разблокирован'}`,
        SnackbarSuccessOptions);
      await dispatch(getAll({query: values}));
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  const onActionClick = async (action?: UserAction) => {
    onCloseMenu();
    switch (action) {
      case UserAction.EDIT:
        toggleDialog(UserDialog.PROCESS);
        break;
      case UserAction.DELETE:
        await onDelete();
        break;
      case UserAction.LOCK:
        await onLock();
        break;
      case UserAction.CHANGE_PASSWORD:
        toggleDialog(UserDialog.CHANGE_PASSWORD);
        break;
      default:
        break;
    }
  }

  return (
    <Grid item xs={4}>
      <Card>
        <CardMedia>
          <Box className={clsx("d-flex justify-center", styles.avatarWrapper)}>
            <Image src={getAvatarUrl(avatar)} alt={getAvatarAlt(firstname, lastname, middlename)}
                   layout="fill" objectFit="cover"/>
          </Box>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {firstname} {lastname} {middlename}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Имя пользователя: {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            E-mail: {email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Номер телефона: {phoneNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Привилегия: {roles.map(r => RoleItems.find(i => i.key === RoleEnum[r.authority as keyof typeof RoleEnum])?.label).join(', ')}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Профиль</Button>
          <Button size="small" onClick={onOpenMenu}>Еще</Button>
        </CardActions>
      </Card>
      {menuOpened && (
        <UserListItemActionMenu
          open={menuOpened}
          anchorEl={anchorEl}
          handleClose={onActionClick}
          locked={!isAccountNonLocked}
        />
      )}
      {dialogsState.process && (
        <ProcessUserDialog
          open={dialogsState.process}
          onClose={() => toggleDialog(UserDialog.PROCESS)}
          user={user}
        />
      )}
      {user && dialogsState.changePassword && (
        <ChangePasswordDialog
          isOldPasswordNeeded={false}
          open={dialogsState.changePassword}
          onClose={() => toggleDialog(UserDialog.CHANGE_PASSWORD)}
          user={user}
        />
      )}
    </Grid>
  );
}
