import React, {ChangeEvent} from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle, IconButton,
  InputAdornment, MenuItem,
  Stack,
  Typography
} from "@mui/material";
import {
  Add, AddOutlined,
  Backup,
  BackupOutlined,
  CloseOutlined,
  DeleteOutlined,
  Save, SaveOutlined,
  Store as StoreIcon,
  Undo, UndoOutlined
} from "@mui/icons-material";
import clsx from "clsx";
import NextImage from "next/image";

import {Form} from "components/common/Form";
import {Input} from "components/common/Input";
import {Dropdown} from "components/common/Dropdown";
import {ProcessStore, Store, StoreType, StoreTypes} from "types/stores/store";
import {Image} from "types/image";
import {useSnackbar} from "notistack";
import {useTypedDispatch, useTypedSelector} from "redux/hooks";
import {useQuery} from "core/hooks/useQuery";
import {useForm} from "react-hook-form";
import {ImageService} from "service/ImageService";
import {getAxiosErrorData} from "core/axios";
import {SnackbarErrorOptions, SnackbarSuccessOptions} from "core/snackbar/snackbar-options";
import {selectAddresses} from "redux/slices/storesSlice";
import {StoreService} from "service/stores/StoreService";
import {getStores} from "redux/slices/storesSlice";
import { getStoreImageUrl } from 'utils/functions/getStoreImageUrl';

import styles from "components/stores/ProcessStoreDialog/ProcessStoreDialog.module.scss";
import {yupResolver} from "@hookform/resolvers/yup";
import {StoreSchema} from "schemas/store";
import {LoadingButton} from "@mui/lab";

interface ProcessStoreDialogProps {
  open: boolean;
  onClose: () => void;
  store?: Store;
}

interface ProcessStoreFormData {
  image: Image,
  type: string;
  address: number;
  name: string;
}

export const ProcessStoreDialog: React.FC<ProcessStoreDialogProps> = ({open, onClose, store}) => {
  const [isImageUploading, setIsImageUploading] = React.useState(false)
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useTypedDispatch();
  const addresses = useTypedSelector(selectAddresses);
  const {values} = useQuery();
  const {register, handleSubmit, control, watch, formState: {errors, isSubmitting}, setValue, reset} = useForm({
    mode: "onChange",
    defaultValues: {
      image: store?.image ?? null,
      type: store?.type ?? '',
      address: store?.address.id ?? '',
      name: store?.name ?? ''
    },
    resolver: yupResolver(StoreSchema)
  })

  const image = watch("image");

  const toggleUploadLoader = () => {
    setIsImageUploading((prev) => !prev);
  }

  const onAvatarChanged = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length) {
      toggleUploadLoader();

      const formData = new FormData();
      const file = files[0];
      formData.append("file", file, file.name);

      try {
        const image = await ImageService.upload(formData);
        setValue("image", image);
      } catch (err) {
        enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
      }

      toggleUploadLoader();
    }
  }

  const onSubmit = async (form: ProcessStoreFormData) => {
    const {type, address, ...other} = form;
    const founded = addresses.find(a => a.id === Number(address));

    if (!founded) {
        enqueueSnackbar('Не удалось найти адрес', SnackbarErrorOptions);
        return;
    }

    const data: ProcessStore = {
      ...other,
      type: StoreType[type as keyof typeof StoreType],
      address: founded
    }

    try {
      if (store) {
        const {id} = store;
        await StoreService.update(id, data);
        enqueueSnackbar('Магазин / склад успешно обновлен', SnackbarSuccessOptions);
      } else {
        await StoreService.add(data);
        enqueueSnackbar('Магазин / склад успешно сохранен', SnackbarSuccessOptions);
      }
      await dispatch(getStores({query: values}));
      onClose();
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  const onReset = () => {
    reset({
      image: null,
      type: '',
      address: '',
      name: ''
    })
  }

  const onDeleteAvatar = () => {
    setValue("image", null);
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      disableEscapeKeyDown={isImageUploading || isSubmitting}
      onClose={onClose}
    >
      <DialogTitle className="d-flex justify-between align-center">
        <Typography variant="h4" className="d-flex align-center">
          <StoreIcon fontSize="inherit" className="mr-10"/>
          {store ? 'Редактирование магазина / склада' : 'Добавление магазина / склада'}
        </Typography>
        <IconButton
          onClick={onClose}
          disabled={isImageUploading || isSubmitting}
          size={"small"}
        >
          <CloseOutlined htmlColor="#000000"/>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack direction={"row"} spacing={2}>
          <Box className={clsx("d-flex flex-column justify-center wp-100")}>
            <Box className={clsx("d-flex justify-center", styles.imageWrapper)}>
              <NextImage src={getStoreImageUrl(image)} alt={'Магазин'} layout="fill" objectFit="cover"/>
            </Box>
            <Stack direction={"row"} spacing={1} className="justify-center mt-10">
              <input accept="image/*" type={"file"} id="file-input" hidden onChange={onAvatarChanged}/>
              <label htmlFor="file-input">
                <LoadingButton
                  component="span"
                  variant="outlined"
                  startIcon={<BackupOutlined/>}
                  size={"small"}
                  loading={isImageUploading}
                  loadingPosition={"start"}
                  disabled={isSubmitting}
                >Загрузить</LoadingButton>
              </label>
              {image && (
                <Button
                  component="span"
                  color={"error"}
                  disabled={isImageUploading || isSubmitting}
                  onClick={onDeleteAvatar}
                  variant={"outlined"}
                  startIcon={<DeleteOutlined/>}
                  size={"small"}
                >
                  Удалить
                </Button>
              )}
            </Stack>
          </Box>
          <Box className={"wp-100"}>
            <Form className="d-flex flex-column align-center" onSubmit={handleSubmit(onSubmit)}
                  id="process-form">
              <Input
                {...register('name')}
                label={'Название'}
                placeholder={'Введите название'}
                className={"mb-10"}
                inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
                error={!!errors.name}
                helperText={errors?.name?.message}
              />
              <Dropdown
                name={'type'}
                control={control}
                label={"Тип"}
                defaultValue={''}
                className={"mb-10"}
                displayEmpty={true}
                startAdornment={<InputAdornment position={"start"}/>}
                error={!!errors.type}
                helperText={errors?.type?.message}
              >
                <MenuItem value={''}>Выберите...</MenuItem>
                {StoreTypes.map(({key, label}, index) =>
                  <MenuItem value={key} key={index}>{label}</MenuItem>
                )}
              </Dropdown>
              <Stack direction="row" spacing={1} className="align-center wp-100">
                <Dropdown
                  name={'address'}
                  control={control}
                  label={"Адрес"}
                  defaultValue={''}
                  className={"mb-10"}
                  displayEmpty={true}
                  startAdornment={<InputAdornment position={"start"}/>}
                  error={!!errors.address}
                  helperText={errors?.address?.message}
                >
                  <MenuItem value={''}>Выберите...</MenuItem>
                  {addresses.map(({id, full}, index) =>
                    <MenuItem value={id} key={index}>{full}</MenuItem>
                  )}
                </Dropdown>
                <IconButton
                  component={"span"}
                  size={"small"}
                >
                  <AddOutlined/>
                </IconButton>
              </Stack>
            </Form>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isImageUploading || isSubmitting}
          form={"process-form"}
          color={"error"}
          variant={"outlined"}
          startIcon={<UndoOutlined/>}
          onClick={onReset}
          size={"small"}
        >
          Очистить
        </Button>
        <LoadingButton
          form={"process-form"}
          type={"submit"}
          variant={"outlined"}
          startIcon={<SaveOutlined/>}
          size={"small"}
          loading={isSubmitting}
          disabled={isImageUploading}
          loadingPosition={"start"}
        >Сохранить</LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
