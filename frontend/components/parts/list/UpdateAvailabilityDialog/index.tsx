import React from 'react';
import {Availability, SparePart} from "types/spareparts/sparePart";
import {
  Button, ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, IconButton,
  InputAdornment, Stack,
  Typography
} from "@mui/material";
import {CloseOutlined, ProductionQuantityLimits, Save, Undo} from "@mui/icons-material";
import {Form} from "components/common/Form";
import {Input} from "components/common/Input";
import {LoadingButton} from "@mui/lab";
import {useFieldArray, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ChangeQuantitySchema} from "schemas/sparePart";
import {SparePartService} from "service/spareparts/SparePartService";
import {useQuery} from "core/hooks/useQuery";
import {useTypedDispatch} from "redux/hooks";
import {getSpareParts} from "redux/slices/sparePartsSlice";
import {useSnackbar} from "notistack";
import {SnackbarErrorOptions, SnackbarSuccessOptions} from "core/snackbar/snackbar-options";
import {getAxiosErrorData} from "core/axios";
import {getCart} from "redux/slices/usersSlice";

interface UpdateAvailabilityDialogProps {
  open: boolean;
  onClose: () => void;
  sparePart: SparePart;
}

export const UpdateAvailabilityDialog: React.FC<UpdateAvailabilityDialogProps> = ({open, onClose, sparePart}) => {
  const { control, register, handleSubmit, watch, formState: {isSubmitting, errors} } = useForm({
    mode: "onChange",
    defaultValues: {
      availabilities: sparePart.availabilities
    },
    resolver: yupResolver(ChangeQuantitySchema)
  });
  const { fields } = useFieldArray({
    control,
    name: "availabilities",
  });
  const {values} = useQuery();
  const dispatch = useTypedDispatch();
  const {enqueueSnackbar} = useSnackbar();

  const availabilities = watch("availabilities");
  const controlledFields = fields.map((field, index) => {
    return {
      field,
      availability: availabilities[index]
    };
  });

  const onSubmit = async ({availabilities}: {availabilities: Availability[]}) => {
    try {
      const {id} = sparePart;
      await SparePartService.updateAvailability(id, availabilities);
      await dispatch(getSpareParts({query: values}));
      await dispatch(getCart());
      enqueueSnackbar('Наличие успешно обновлено', SnackbarSuccessOptions);
      onClose();
    }
    catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
    >
      <DialogTitle className="d-flex justify-between align-center">
        <Typography variant="h4" className="d-flex align-center">
          <ProductionQuantityLimits fontSize="inherit" className="mr-10"/>Изменение количества товара
        </Typography>
        <IconButton disabled={isSubmitting} onClick={onClose} size={"small"}>
          <CloseOutlined/>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Form className="d-flex flex-column align-center mb-20" onSubmit={handleSubmit(onSubmit)}
              id="change-quantity-form">
          <Stack spacing={1} className={"wp-100"}>
            {controlledFields.map((item, index) => (
              <Input
                key={index}
                {...register(`availabilities.${index}.quantity`)}
                label={`Количество для магазина: ${item.availability.store.name}`}
                type={'number'}
                placeholder={`Введите количество для магазина: ${item.availability.store.name}`}
                inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
                error={!!errors?.availabilities?.at(index)?.quantity}
                helperText={errors?.availabilities?.at(index)?.quantity?.message}
              />
            ))}
          </Stack>
        </Form>
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant={"outlined"} disabled={isSubmitting} size={"small"}>
          <Button
            form={"change-quantity-form"}
            type={"reset"}
            startIcon={<Undo/>}
          >
            Очистить
          </Button>
          <LoadingButton
            form={"change-quantity-form"}
            type="submit"
            startIcon={<Save/>}
            loadingPosition={"start"}
            loading={isSubmitting}
          >
            Сохранить
          </LoadingButton>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};

