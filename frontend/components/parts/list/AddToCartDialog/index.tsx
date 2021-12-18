import React from 'react';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment, MenuItem,
  Stack,
  Typography
} from "@mui/material";
import {AddShoppingCartOutlined, Check, CloseOutlined, ProductionQuantityLimits, Save, Undo} from "@mui/icons-material";
import {Form} from "components/common/Form";
import {Input} from "components/common/Input";
import {LoadingButton} from "@mui/lab";
import {DialogHeader} from "components/common/DialogHeader";
import {useFieldArray, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ChangeQuantitySchema} from "schemas/sparePart";
import {useQuery} from "core/hooks/useQuery";
import {useTypedDispatch} from "redux/hooks";
import {useSnackbar} from "notistack";
import {Dropdown} from "components/common/Dropdown";
import {SparePart} from "types/spareparts/sparePart";
import {CartService} from "service/cart/CartService";
import {enqueueError, enqueueSuccess} from "redux/slices/snackbar/actions";
import {getAxiosErrorData} from "core/axios";
import { setCart } from 'redux/slices/usersSlice';
import { StoreType } from 'types/stores/store';
import {AddToCartSchema} from "schemas/cart";

interface AddToCartDialogProps {
  sparePart: SparePart;
  open: boolean;
  onClose: () => void;
}

const AddToCartDialog: React.FC<AddToCartDialogProps> = ({sparePart: {id, availabilities}, open, onClose}) => {
  const {control, register, handleSubmit, watch, formState: {isSubmitting, errors}, setValue} = useForm({
    mode: "onChange",
    defaultValues: {
      storeId: '',
      availability: 0,
      quantity: 0
    },
    resolver: yupResolver(AddToCartSchema)
  });
  const dispatch = useTypedDispatch();

  const onSubmit = async ({quantity, storeId}: { quantity: number, storeId: number }) => {
    try {
      const cart = await CartService.add(id, storeId, quantity);
      await dispatch(setCart(cart));
      await dispatch(enqueueSuccess('Товар успешно добавлен в корзину'));
      await onClose();
    }
    catch (err) {
      await dispatch(enqueueError(getAxiosErrorData(err)));
    }
  }

  const quantity = watch('quantity');
  const storeId = watch('storeId');

  const selectedStoreAvailability = availabilities.find(a => a.store.id === Number(storeId));

  const appendQuantity = async (count: number) => {
    setValue('quantity', Number(quantity) + count);
  }

  React.useEffect(() => {
    const subscription = watch((value, {name}) => {
      switch (name) {
        case 'storeId':
          const availability = availabilities.find(a => a.store.id === Number(value.storeId));
          setValue('quantity', 1);
          setValue('availability', availability?.quantity ?? 0);
          break;
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch, setValue, availabilities]);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
    >
      <DialogHeader title={'Сколько товаров добавить?'} Icon={AddShoppingCartOutlined} onClose={onClose}/>
      <DialogContent>
        <Form className="d-flex flex-column align-center mb-20" onSubmit={handleSubmit(onSubmit)}
              id="change-quantity-form">
          <Stack spacing={1} className={"wp-100"}>
            <Dropdown
              control={control}
              name={`storeId`}
              label={"Магазин"}
              defaultValue={''}
              displayEmpty={true}
              startAdornment={<InputAdornment position={"start"}/>}
              error={!!errors.storeId}
              helperText={errors?.storeId?.message}
            >
              <MenuItem value={''}>Выберите...</MenuItem>
              {availabilities.filter(a => a.quantity > 0 && a.store.type != StoreType.STORAGE).map((availability, index) => (
                <MenuItem value={availability.store.id}
                          key={index}>{availability.store.name} / Наличие: {availability.quantity} шт.</MenuItem>
              ))}
            </Dropdown>
            {!!storeId && (
              <>
                <Input
                  {...register(`quantity`)}
                  label={`Количество`}
                  type={'number'}
                  placeholder={`Введите количество`}
                  inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
                  error={!!errors?.quantity}
                  helperText={errors?.quantity?.message}
                />
                <ButtonGroup variant={"outlined"} disabled={isSubmitting} size={"small"} className={"wp-100"}>
                  <Button
                    disabled={Number(quantity) < 2}
                    onClick={() => appendQuantity(-1)}
                    className={"wp-100"}
                  >-1 шт.</Button>
                  <Button
                    disabled={Number(quantity) < 3}
                    onClick={() => appendQuantity(-2)}
                    className={"wp-100"}
                  >-2 шт.</Button>
                  <Button
                    disabled={Number(quantity) < 6}
                    onClick={() => appendQuantity(-5)}
                    className={"wp-100"}
                  >-5 шт.</Button>
                  <Button
                    disabled={!selectedStoreAvailability || (selectedStoreAvailability.quantity - Number(quantity) < 1)}
                    onClick={() => appendQuantity(1)}
                    className={"wp-100"}
                  >+1 шт.</Button>
                  <Button
                    disabled={!selectedStoreAvailability || (selectedStoreAvailability.quantity - Number(quantity) < 2)}
                    onClick={() => appendQuantity(2)}
                    className={"wp-100"}
                  >+2 шт.</Button>
                  <Button
                    disabled={!selectedStoreAvailability || (selectedStoreAvailability.quantity - Number(quantity) < 5)}
                    onClick={() => appendQuantity(5)}
                    className={"wp-100"}
                  >+5 шт.</Button>
                </ButtonGroup>
              </>
            )}
          </Stack>
        </Form>
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant={"outlined"} disabled={isSubmitting} size={"small"}>
          <LoadingButton
            form={"change-quantity-form"}
            type="submit"
            startIcon={<Check/>}
            loadingPosition={"start"}
            loading={isSubmitting}
          >
            Добавить
          </LoadingButton>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}

export default AddToCartDialog;
