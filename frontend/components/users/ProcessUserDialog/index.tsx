import React, {ChangeEvent} from 'react';
import {
  Box,
  Button, CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, InputAdornment, MenuItem, Stack,
  Typography
} from "@mui/material";
import {AccountBox, CloseOutlined} from "@mui/icons-material";
import clsx from "clsx";
import NextImage from "next/image";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";

import {ProcessUser, RoleEnum, RoleItems, User} from "types/user";
import {Input} from "components/common/Input";
import {Dropdown} from "components/common/Dropdown";
import {ImageService} from "service/ImageService";
import {getAxiosErrorData} from "core/axios";
import {SnackbarErrorOptions, SnackbarSuccessOptions} from "core/snackbar/snackbar-options";
import {Form} from "components/common/Form";
import {Image} from "types/image";
import {UserService} from "service/UserService";
import {useTypedDispatch, useTypedSelector} from "redux/hooks";
import {getAll, selectAuthority, setCurrentUser} from "redux/slices/usersSlice";
import {useQuery} from "core/hooks/useQuery";
import {MaskedInput} from 'components/common/MaskedInput';
import {yupResolver} from "@hookform/resolvers/yup";
import {ProcessUserSchema} from "schemas/users";
import {getAvatarUrl} from "utils/functions/getAvatarUrl";

import styles from "components/users/ProcessUserDialog/ProcessUserDialog.module.scss";

enum ProcessDialogLoader {
  UPLOAD,
  SAVE
}

interface ProcessUserDialogProps {
  open: boolean;
  onClose: () => void;
  user?: User;
  self?: boolean;
}

interface ProcessUserFormData {
  avatar: Image,
  username: string,
  email: string,
  phoneNumber: string;
  firstname: string;
  middlename: string;
  lastname: string;
  role: string;
}

export const ProcessUserDialog: React.FC<ProcessUserDialogProps> = ({open, onClose, user, self}) => {
  const [loaders, setLoaders] = React.useState({upload: false, save: false})
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useTypedDispatch();
  const {values} = useQuery();
  const {register, handleSubmit, control, watch, formState: {errors}, setValue, reset} = useForm({
    mode: "onChange",
    defaultValues: {
      avatar: user?.avatar ?? null,
      username: user?.username ?? '',
      email: user?.email ?? '',
      phoneNumber: user?.phoneNumber ?? '',
      firstname: user?.firstname ?? '',
      middlename: user?.middlename ?? '',
      lastname: user?.lastname ?? '',
      role: user?.roles[0].authority ?? ''
    },
    resolver: yupResolver(ProcessUserSchema)
  })

  const currentRole = useTypedSelector(selectAuthority);
  const avatar = watch("avatar");

  const toggleLoader = (loader: ProcessDialogLoader) => {
    switch (loader) {
      case ProcessDialogLoader.UPLOAD:
        setLoaders((prev) => {
          return {...prev, upload: !prev.upload};
        })
        break;
      case ProcessDialogLoader.SAVE:
        setLoaders((prev) => {
          return {...prev, save: !prev.save};
        })
        break;
      default:
        break;
    }
  }

  const onAvatarChanged = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length) {
      toggleLoader(ProcessDialogLoader.UPLOAD);

      const formData = new FormData();
      const file = files[0];
      formData.append("file", file, file.name);

      try {
        const image = await ImageService.upload(formData);
        setValue("avatar", image);
      } catch (err) {
        enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
      }

      toggleLoader(ProcessDialogLoader.UPLOAD);
    }
  }

  const onSubmit = async (form: ProcessUserFormData) => {
    const {role, ...other} = form;
    const authority = RoleEnum[role as keyof typeof RoleEnum];
    const data: ProcessUser = {...other, role: {authority}}
    toggleLoader(ProcessDialogLoader.SAVE);
    try {
      if (user) {
        if (self) {
          const user = await UserService.updateProfile(other as User);
          await dispatch(setCurrentUser(user));
          if (currentRole && [RoleEnum.ADMIN].includes(currentRole.authority)) {
            await dispatch(getAll({query: values}));
          }
          enqueueSnackbar('?????????????? ?????????????? ????????????????', SnackbarSuccessOptions);
        }
        else {
          const {id} = user;
          await UserService.update(id, data);
          enqueueSnackbar('???????????????????????? ?????????????? ????????????????', SnackbarSuccessOptions);
          await dispatch(getAll({query: values}));
        }
      } else {
        await UserService.save(data);
        enqueueSnackbar('???????????????????????? ?????????????? ????????????????', SnackbarSuccessOptions);
        await dispatch(getAll({query: values}));
      }
      onClose();
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
    toggleLoader(ProcessDialogLoader.SAVE);
  }

  const onReset = () => {
    reset({
      username: user?.username ?? '',
      email: user?.email ?? '',
      firstname: user?.firstname ?? '',
      middlename: user?.middlename ?? '',
      lastname: user?.lastname ?? '',
      role: '',
      avatar: null,
      phoneNumber: ''
    });
  }

  const onDeleteAvatar = () => {
    setValue("avatar", null);
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      disableEscapeKeyDown={loaders.save || loaders.upload}
      onClose={onClose}
    >
      <DialogTitle className="d-flex justify-between align-center">
        <Typography variant="h4" className="d-flex align-center">
          <AccountBox fontSize="inherit" className="mr-10"/>
          {user ? `???????????????????????????? ${self ? '??????????????' : '????????????????????????'}` : '???????????????????? ????????????????????????'}
        </Typography>
        {!loaders.save && !loaders.upload && <CloseOutlined className="cu-p" onClick={onClose}/>}
      </DialogTitle>
      <DialogContent>
        <Stack direction={"row"} className={"align-center"} spacing={2}>
          <Box className={clsx("d-flex flex-column justify-center", styles.avatarContainer)}>
            <Box className={clsx("d-flex justify-center", styles.avatarWrapper)}>
              <NextImage src={getAvatarUrl(avatar)} alt={'Avatar'} layout="fill" objectFit="cover"/>
            </Box>
            <Box className="d-flex justify-center mt-10">
              <input accept="image/*" type={"file"} id="file-input" hidden onChange={onAvatarChanged}/>
              <label htmlFor="file-input">
                <Button component="span" disabled={loaders.save || loaders.upload}>
                  {loaders.upload ? <CircularProgress size={24} color="inherit"/> : "??????????????"}
                </Button>
              </label>
              {avatar && (
                <Button component="span" color={"error"} disabled={loaders.save || loaders.upload}
                        onClick={onDeleteAvatar}>
                  ??????????????
                </Button>
              )}
            </Box>
          </Box>
          <Box className={clsx(styles.formContainer)}>
            <Form className="d-flex flex-column align-center mt-20 mb-20" onSubmit={handleSubmit(onSubmit)}
                  id="process-form">
              {!self && (
                <Input
                  {...register('username')}
                  label={'?????? ????????????????????????'}
                  placeholder={'?????????????? ?????? ????????????????????????'}
                  className={"mb-10"}
                  inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
                  error={!!errors.username}
                  helperText={errors?.username?.message}
                />
              )}
              {!self && (
                <Input
                  {...register('email')}
                  label={'E-mail'}
                  placeholder={'?????????????? E-mail'}
                  className={"mb-10"}
                  inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                />
              )}
              <Stack direction={self ? "column" : "row"} spacing={1} className={"mb-10 wp-100"}>
                <Input
                  {...register('firstname')}
                  label={'??????'}
                  placeholder={'?????????????? ??????'}
                  inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
                  error={!!errors.firstname}
                  helperText={errors?.firstname?.message}
                />
                <Input
                  {...register('lastname')}
                  label={'??????????????'}
                  placeholder={'?????????????? ??????????????'}
                  inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
                  error={!!errors.lastname}
                  helperText={errors?.lastname?.message}
                />
                <Input
                  {...register('middlename')}
                  label={'????????????????'}
                  placeholder={'?????????????? ????????????????'}
                  inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
                  error={!!errors.middlename}
                  helperText={errors?.middlename?.message}
                />
              </Stack>
              <MaskedInput
                control={control}
                name={"phoneNumber"}
                mask={"+375(99)999-99-99"}
                label={'?????????? ????????????????'}
                placeholder={'?????????????? ?????????? ????????????????'}
                className={"mb-10"}
                inputProps={{
                  startAdornment: <InputAdornment position={"start"}/>
                }}
                error={!!errors.phoneNumber}
                helperText={errors?.phoneNumber?.message}
              />
              {!self && (
                <Dropdown
                  name={'role'}
                  control={control}
                  label={"????????????????????"}
                  defaultValue={''}
                  className={"mb-10"}
                  displayEmpty={true}
                  startAdornment={<InputAdornment position={"start"}/>}
                  error={!!errors.role}
                  helperText={errors?.role?.message}
                >
                  <MenuItem value={''}>????????????????...</MenuItem>
                  {RoleItems.map((item, index) =>
                    <MenuItem value={item.key} key={index}>{item.label}</MenuItem>
                  )}
                </Dropdown>
              )}
            </Form>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button disabled={loaders.save || loaders.upload} form={"process-form"} type={"reset"} color={"error"} onClick={onReset}>
          ????????????????
        </Button>
        <Button disabled={loaders.save || loaders.upload} form={"process-form"} type={"submit"}>
          {loaders.save ? <CircularProgress size={24} color="inherit"/> : "??????????????????"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
