import React from 'react';
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
import {CloseOutlined, DirectionsCarFilledOutlined} from "@mui/icons-material";
import {Form} from "components/common/Form";
import {Input} from "components/common/Input";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {SettingsSchema} from "schemas/trade";

interface ProcessVehicleDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: ({name}: any) => void;
  title: string;
  label: string;
  placeholder: string;
  initialValue?: string;
}

export const ProcessSettingsDialog: React.FC<ProcessVehicleDialogProps> = ({open, onClose, initialValue, onSubmit, title, label, placeholder}) => {
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
    mode: "onChange",
    defaultValues: {
      name: initialValue
    },
    resolver: yupResolver(SettingsSchema)
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
          <DirectionsCarFilledOutlined fontSize="inherit" className="mr-10"/>
          {title}
        </Typography>
        {!isSubmitting && <CloseOutlined className="cu-p" onClick={onClose}/>}
      </DialogTitle>
      <DialogContent>
        <Form onSubmit={handleSubmit(onSubmit)} id="process-form">
          <Input
            {...register('name')}
            label={label}
            placeholder={placeholder}
            inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
            error={!!errors.name}
            helperText={errors?.name?.message}
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
