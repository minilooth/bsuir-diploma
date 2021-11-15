import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {SettingsSchema} from "schemas/trade";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Typography
} from "@mui/material";
import {CloseOutlined, House} from "@mui/icons-material";
import {Form} from "components/common/Form";
import {Input} from "components/common/Input";
import {Address, ProcessAddress} from "types/stores/address";
import {AddressSchema} from "schemas/address";

interface ProcessAddressDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (processAddress: ProcessAddress) => void;
  address?: Address;
}

export const ProcessAddressDialog: React.FC<ProcessAddressDialogProps> = ({open, onClose, onSubmit, address}) => {
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
    mode: "onChange",
    defaultValues: {
      house: address?.house,
      housing: address?.housing,
      room: address?.room,
      street: address?.street
    },
    resolver: yupResolver(AddressSchema)
  })

  return (
    <Dialog
      maxWidth={"xs"}
      fullWidth
      open={open}
      closeAfterTransition
      onClose={isSubmitting ? () => null : onClose}
    >
      <DialogTitle className="d-flex justify-between align-center">
        <Typography variant="h4" className="d-flex align-center">
          <House fontSize="inherit" className="mr-10"/>
          {address ? 'Редактирование адреса' : 'Добавление адреса'}
        </Typography>
        {!isSubmitting && <CloseOutlined className="cu-p" onClick={onClose}/>}
      </DialogTitle>
      <DialogContent>
        <Form onSubmit={handleSubmit(onSubmit)} id="process-form">
          <Input
            {...register('street')}
            className={"mb-20"}
            label={'Улица'}
            placeholder={'Введите улицу'}
            inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
            error={!!errors.street}
            helperText={errors?.street?.message}
          />
          <Input
            {...register('house')}
            className={"mb-20"}
            label={'Номер дома'}
            placeholder={'Введите номер дома'}
            inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
            error={!!errors.house}
            helperText={errors?.house?.message}
          />
          <Input
            {...register('housing')}
            className={"mb-20"}
            label={'Корпус'}
            placeholder={'Введите корпус'}
            inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
            error={!!errors.housing}
            helperText={errors?.housing?.message}
          />
          <Input
            {...register('room')}
            label={'Квартира/помещение'}
            placeholder={'Введите номер квартиры/помещения'}
            inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
            error={!!errors.room}
            helperText={errors?.room?.message}
          />
        </Form>
      </DialogContent>
      <DialogActions>
        <Button form={"process-form"} color={"error"} type={"reset"} disabled={isSubmitting}>
          Очистить
        </Button>
        <Button form={"process-form"} type={"submit"} disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} color="inherit"/> : "Сохранить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
