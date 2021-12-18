import React from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, Divider, Stack, Typography} from "@mui/material";
import {DialogHeader} from "components/common/DialogHeader";
import {AccountBox} from "@mui/icons-material";
import clsx from "clsx";
import NextImage from "next/image";
import {getAvatarUrl} from "utils/functions/getAvatarUrl";

import styles from 'components/users/ProfileDialog/ProfileDialog.module.scss'
import {RoleItems, User} from "types/user";
import {DATE_FORMAT, DateUtils} from "utils/DateUtils";
import {ChangePasswordDialog} from "components/users/ChangePasswordDialog";
import {ProcessUserDialog} from "components/users/ProcessUserDialog";

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
  user: User;
  self?: boolean
}

export const ProfileDialog: React.FC<ProfileDialogProps> = ({open, onClose, user, self}) => {
  const [changePasswordOpened, setChangePasswordOpened] = React.useState(false);
  const [processOpened, setProcessOpened] = React.useState(false);

  const toggleChangePasswordDialog = () => {
    setChangePasswordOpened((prev) => !prev);
  }

  const toggleProcessDialog = () => {
    setProcessOpened((prev) => !prev);
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
    >
      <DialogHeader title={'Профиль'} Icon={AccountBox} onClose={onClose}/>
      <DialogContent>
        <Stack direction={"row"} className={"wp-100"} spacing={2}>
          <Box className={clsx("d-flex flex-column justify-center align-center", styles.avatarContainer)}>
            <Box className={clsx("d-flex justify-center", styles.avatarWrapper)}>
              <NextImage src={getAvatarUrl(user.avatar)} alt={'Avatar'} layout="fill" objectFit="cover"/>
            </Box>
            {self && (
              <Stack direction={"column"} alignItems={"center"} spacing={1} marginTop={1}>
                <Button variant={"outlined"} color={"primary"} size={"small"} onClick={toggleChangePasswordDialog}>Изменить пароль</Button>
                <Button variant={"outlined"} color={"primary"} size={"small"} onClick={toggleProcessDialog}>Редактировать</Button>
              </Stack>
            )}
          </Box>
          <Divider orientation={"vertical"}/>
          <Stack direction={"column"} justifyContent={"space-between"} className={styles.formContainer}>
            <Stack direction={"row"} justifyContent={"space-between"} className={"wp-100"}>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.key)}><b>ID:</b></Typography>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.value)}>{user.id}</Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} className={"wp-100"}>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.key)}><b>Имя пользователя:</b></Typography>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.value)}>{user.username}</Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} className={"wp-100"}>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.key)}><b>E-mail:</b></Typography>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.value)}>{user.email}</Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} className={"wp-100"}>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.key)}><b>Номер телефона:</b></Typography>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.value)}>{user.phoneNumber}</Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} className={"wp-100"}>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.key)}><b>Имя:</b></Typography>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.value)}>{user.firstname}</Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} className={"wp-100"}>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.key)}><b>Фамилия:</b></Typography>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.value)}>{user.lastname}</Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} className={"wp-100"}>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.key)}><b>Отчество:</b></Typography>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.value)}>{user.middlename}</Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} className={"wp-100"}>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.key)}><b>Привилегия:</b></Typography>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.value)}>{RoleItems.find(i => i.key === user.roles[0].authority)?.label}</Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} className={"wp-100"}>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.key)}><b>E-mail подтвержден:</b></Typography>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.value)}>{user.isEmailConfirmed ? 'Да' : 'Нет'}</Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} className={"wp-100"}>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.key)}><b>Заблокирован:</b></Typography>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.value)}>{!user.isAccountNonLocked ? 'Да' : 'Нет'}</Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} className={"wp-100"}>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.key)}><b>Дата регистрации:</b></Typography>
              <Typography variant={"body1"} className={clsx(styles.infoItem, styles.value)}>{DateUtils.format(user.createdAt, DATE_FORMAT.DATE_TIME)}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions/>
      {changePasswordOpened && (
        <ChangePasswordDialog
          isOldPasswordNeeded={true}
          open={changePasswordOpened}
          onClose={toggleChangePasswordDialog}
        />
      )}
      {processOpened && (
        <ProcessUserDialog
          open={processOpened}
          onClose={toggleProcessDialog}
          user={user}
          self={true}
        />
      )}
    </Dialog>
  );
};
