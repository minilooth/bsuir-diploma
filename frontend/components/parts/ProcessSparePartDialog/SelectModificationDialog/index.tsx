import React from 'react';
import {useForm} from "react-hook-form";
import {
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, IconButton,
  InputAdornment, MenuItem,
  Typography
} from "@mui/material";
import {CheckOutlined, CloseOutlined, TouchAppOutlined} from "@mui/icons-material";
import {Form} from "components/common/Form";
import {Modification} from "types/spareparts/modification";
import {useTypedSelector} from "redux/hooks";
import {selectModifications} from "redux/slices/modificationsSlice";
import {Dropdown} from "components/common/Dropdown";
import {LoadingButton} from "@mui/lab";

interface SelectModificationDialog {
  open: boolean;
  onClose: (modification?: Modification) => void;
  selected: Modification[];
}

interface SelectModificationDialogFormData {
  modificationId: number;
}

export const SelectModificationDialog: React.FC<SelectModificationDialog> = ({open, onClose, selected}) => {
  const {control, handleSubmit, formState: {errors, isSubmitting}} = useForm({
    mode: "onChange",
  })
  const modifications = useTypedSelector(selectModifications);

  const options = modifications.filter(m => !selected.find(s => s.id === m.id));

  const onSubmit = (data: SelectModificationDialogFormData) => {
    const {modificationId} = data;
    const modification = modifications.find(m => m.id === modificationId);
    onClose(modification);
  }

  return (
    <Dialog
      maxWidth={"xs"}
      fullWidth
      open={open}
      closeAfterTransition
      onClose={isSubmitting ? () => null : () => onClose()}
    >
      <DialogTitle className="d-flex justify-between align-center">
        <Typography variant="h4" className="d-flex align-center">
          <TouchAppOutlined fontSize="inherit" className="mr-10"/>Выбор характеристики
        </Typography>
        <IconButton onClick={() => onClose()} disabled={isSubmitting}>
          <CloseOutlined/>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Form onSubmit={handleSubmit(onSubmit)} id="select-modification-dialog">
          <Dropdown
            control={control}
            name={`modificationId`}
            label={"Модификация"}
            defaultValue={''}
            displayEmpty={true}
            startAdornment={<InputAdornment position={"start"}/>}
            error={!!errors.modificationId}
            helperText={errors?.modificationId?.message}
          >
            <MenuItem value={''}>Выберите...</MenuItem>
            {options.map((option, index) => (
              <MenuItem value={option.id} key={index}>{option.name}</MenuItem>
            ))}
          </Dropdown>
        </Form>
      </DialogContent>
      <DialogActions>
        <ButtonGroup
          color={"primary"}
          variant={"outlined"}
          size={"small"}
        >
          <LoadingButton
            form={"select-modification-dialog"}
            type={"submit"}
            loading={isSubmitting}
            startIcon={<CheckOutlined/>}
            loadingPosition={"start"}
          >
            Выбрать
          </LoadingButton>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};
