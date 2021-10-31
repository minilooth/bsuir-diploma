import React, {ChangeEvent} from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment, MenuItem,
  Stack,
  Typography
} from "@mui/material";
import {CloseOutlined, Store as StoreIcon} from "@mui/icons-material";
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
  const [loader, setLoader] = React.useState(false)
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
  })

  const image = watch("image");

  const toggleLoader = () => {
    setLoader((prev) => !prev);
  }

  const onAvatarChanged = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length) {
      toggleLoader();

      const formData = new FormData();
      const file = files[0];
      formData.append("file", file, file.name);

      try {
        const image = await ImageService.upload(formData);
        setValue("image", image);
      } catch (err) {
        enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
      }

      toggleLoader();
    }
  }

  const onSubmit = async (form: ProcessStoreFormData) => {
    const {type, address, ...other} = form;
    const founded = addresses.find(a => a.id === address);

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
      disableEscapeKeyDown={loader || isSubmitting}
      onClose={onClose}
    >
      <DialogTitle className="d-flex justify-between align-center">
        <Typography variant="h4" className="d-flex align-center">
          <StoreIcon fontSize="inherit" className="mr-10"/>
          {store ? 'Редактирование магазина / склада' : 'Добавление магазина / склада'}
        </Typography>
        {!loader && !isSubmitting && <CloseOutlined className="cu-p" onClick={onClose}/>}
      </DialogTitle>
      <DialogContent>
        <Stack direction={"row"} className={"align-center"} spacing={2}>
          <Box className={clsx("d-flex flex-column justify-center", styles.imageContainer)}>
            <Box className={clsx("d-flex justify-center", styles.imageWrapper)}>
              <NextImage src={getStoreImageUrl(image)} alt={'Магазин'} layout="fill" objectFit="cover"/>
            </Box>
            <Box className="d-flex justify-center mt-10">
              <input accept="image/*" type={"file"} id="file-input" hidden onChange={onAvatarChanged}/>
              <label htmlFor="file-input">
                <Button component="span" disabled={loader || isSubmitting}>
                  {loader ? <CircularProgress size={24} color="inherit"/> : "Выбрать"}
                </Button>
              </label>
              {image && (
                <Button component="span" color={"error"} disabled={loader || isSubmitting}
                        onClick={onDeleteAvatar}>
                  Удалить
                </Button>
              )}
            </Box>
          </Box>
          <Box className={clsx(styles.formContainer)}>
            <Form className="d-flex flex-column align-center mt-20 mb-20" onSubmit={handleSubmit(onSubmit)}
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
            </Form>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button disabled={loader || isSubmitting} form={"process-form"} color={"error"} onClick={onReset}>
          Очистить
        </Button>
        <Button disabled={loader || isSubmitting} form={"process-form"} type={"submit"}>
          {isSubmitting ? <CircularProgress size={24} color="inherit"/> : "Сохранить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
