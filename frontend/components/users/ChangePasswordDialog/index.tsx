import React from 'react';
import {ChangePassword, User} from "types/user";
import {
  Box,
  Button, CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Typography
} from "@mui/material";
import {
  AccountBox,
  CloseOutlined,
  LockOutlined as PasswordIcon,
  Visibility,
  VisibilityOff,
  VpnKeyOutlined
} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ChangePasswordSchema, ProcessUserSchema} from "schemas/users";
import {Form} from "components/common/Form";
import {Input} from "components/common/Input";
import {getAxiosErrorData} from "core/axios";
import {SnackbarErrorOptions, SnackbarSuccessOptions} from "core/snackbar/snackbar-options";
import {useSnackbar} from "notistack";
import {UserService} from "service/UserService";
import {useTypedDispatch} from "redux/hooks";
import {useQuery} from "core/hooks/useQuery";
import {getAll} from "redux/slices/usersSlice";

interface ChangePasswordDialogProps {
  isOldPasswordNeeded: boolean;
  open: boolean;
  onClose: () => void;
  user?: User;
}

enum ShowPasswordAction {
  OLD_PASSWORD,
  NEW_PASSWORD,
  CONFIRM_PASSWORD
}

export const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({isOldPasswordNeeded, open, onClose, user}) => {
  const [showPasswords, setShowPasswords] = React.useState({oldPassword: false, newPassword: false, confirmPassword: false});
  const [loading, setLoading] = React.useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useTypedDispatch();
  const {values} = useQuery();
  const {register, handleSubmit, formState: {errors}} = useForm({
    mode: "onChange",
    resolver: yupResolver(ChangePasswordSchema)
  })

  const toggleShowPassword = (action: ShowPasswordAction) => {
    switch (action) {
      case ShowPasswordAction.OLD_PASSWORD:
        setShowPasswords((prev) => {
          return {...prev, oldPassword: !prev.oldPassword}
        })
        break;
      case ShowPasswordAction.NEW_PASSWORD:
        setShowPasswords((prev) => {
          return {...prev, newPassword: !prev.newPassword};
        })
        break;
      case ShowPasswordAction.CONFIRM_PASSWORD:
        setShowPasswords((prev) => {
          return {...prev, confirmPassword: !prev.confirmPassword};
        })
        break;
      default:
        break;
    }
  }

  const toggleLoader = () => {
    setLoading((prev) => !prev);
  }

  const onSubmit = async (form: ChangePassword) => {
    toggleLoader();
    try {
      if (user) {
        const {id} = user;
        await UserService.changePassword(form, id);
      } else {
        // TODO: Profile change password;
      }
      enqueueSnackbar('Пароль успешно изменен', SnackbarSuccessOptions);
      await dispatch(getAll(values));
      onClose();
    }
    catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
    toggleLoader();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
    >
      <DialogTitle className="d-flex justify-between align-center">
        <Typography variant="h4" className="d-flex align-center">
          <VpnKeyOutlined fontSize="inherit" className="mr-10"/>Изменение пароля
        </Typography>
        {!loading && <CloseOutlined className="cu-p" onClick={onClose}/>}
      </DialogTitle>
      <DialogContent>
        <Form className="d-flex flex-column align-center mt-20 mb-20" onSubmit={handleSubmit(onSubmit)}
              id="change-password-form">
          {isOldPasswordNeeded && (
            <Input
              {...register('oldPassword')}
              label='Старый пароль'
              type={showPasswords.oldPassword ? 'text' : 'password'}
              placeholder='Введите старый пароль'
              className={"mb-10"}
              inputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon/>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Box className="pointer" onMouseDown={() => toggleShowPassword(ShowPasswordAction.OLD_PASSWORD)}>
                      {showPasswords.oldPassword ? <Visibility/> : <VisibilityOff/>}
                    </Box>
                  </InputAdornment>
                )
              }}
              error={!!errors.oldPassword}
              helperText={errors?.oldPassword?.message}
            />
          )}
          <Input
            {...register('newPassword')}
            label='Новый пароль'
            type={showPasswords.newPassword ? 'text' : 'password'}
            placeholder='Введите новый пароль'
            className={"mb-10"}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Box className="pointer" onMouseDown={() => toggleShowPassword(ShowPasswordAction.NEW_PASSWORD)}>
                    {showPasswords.newPassword ? <Visibility/> : <VisibilityOff/>}
                  </Box>
                </InputAdornment>
              )
            }}
            error={!!errors.newPassword}
            helperText={errors?.newPassword?.message}
          />
          <Input
            {...register('confirmPassword')}
            label='Повторение пароля'
            type={showPasswords.confirmPassword ? 'text' : 'password'}
            placeholder='Повторите новый пароль'
            className={"mb-10"}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Box className="pointer" onMouseDown={() => toggleShowPassword(ShowPasswordAction.CONFIRM_PASSWORD)}>
                    {showPasswords.confirmPassword ? <Visibility/> : <VisibilityOff/>}
                  </Box>
                </InputAdornment>
              )
            }}
            error={!!errors.confirmPassword}
            helperText={errors?.confirmPassword?.message}
          />
        </Form>
      </DialogContent>
      <DialogActions>
        <Button form={"change-password-form"} type={"reset"} disabled={loading} color={"error"}>
          Очистить
        </Button>
        <Button autoFocus form={"change-password-form"} type={"submit"} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit"/> : "Сохранить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
