import React from 'react';
import {Divider, Drawer, Stack, Typography} from "@mui/material";
import {CartItem} from "types/cart";
import {CartElement} from "components/nav/Navbar/CartElement";
import {ShoppingCartOutlined} from "@mui/icons-material";

import styles from 'components/nav/Navbar/Cart/Cart.module.scss';
import {PriceUtils} from "utils/PriceUtils";
import {useTypedDispatch} from "redux/hooks";
import {enqueueError, enqueueSuccess} from "redux/slices/snackbar/actions";
import {getAxiosErrorData} from "core/axios";
import {CartService} from "service/cart/CartService";
import { setCart } from 'redux/slices/usersSlice';
import {LoadingButton} from "@mui/lab";
import {useForm} from "react-hook-form";
import {getSpareParts} from "redux/slices/sparePartsSlice";
import { useQuery } from 'core/hooks/useQuery';

interface CartProps {
  open: boolean;
  onClose: () => void;
  items?: CartItem[];
  totalQuantity?: number;
  totalCost?: number;
  totalCostUsd?: number;
  totalCostEur?: number;
}

export const Cart: React.FC<CartProps> = ({
                                            open,
                                            onClose,
                                            items,
                                            totalQuantity,
                                            totalCost,
                                            totalCostEur,
                                            totalCostUsd
                                          }) => {
  const dispatch = useTypedDispatch();
  const [resetLoading, setResetLoading] = React.useState(false);
  const [arrangeLoading, setArrangeLoading] = React.useState(false);
  const {values} = useQuery();

  const reset = async () => {
    await setResetLoading(true);
    try {
      const cart = await CartService.reset();
      await dispatch(setCart(cart));
      await dispatch(enqueueSuccess('Корзина успешно очищена'));
      await onClose();
    }
    catch (err) {
      await dispatch(enqueueError(getAxiosErrorData(err)));
    }
    await setResetLoading(false);
  }

  const arrange = async () => {
    await setArrangeLoading(true);
    try {
      const cart = await CartService.arrange();
      await dispatch(getSpareParts({query: values}));
      await dispatch(setCart(cart));
      await dispatch(enqueueSuccess('Продажа успешно оформлена'));
      await onClose();
    }
    catch (err) {
      await dispatch(enqueueError(getAxiosErrorData(err)));
    }
    await setArrangeLoading(false);
  }

  return (
    <Drawer
      anchor={'left'}
      open={open}
      onClose={!resetLoading || !arrangeLoading ? onClose : () => null}
      sx={{".MuiDrawer-paper": {width: 600}}}
    >
      <Stack direction={"column"} justifyContent={"space-between"} padding={3} spacing={3}>
        <Typography variant={"h4"} className="d-flex align-center">
          <ShoppingCartOutlined fontSize={"inherit"} className={"mr-10"}/>Корзина
        </Typography>
        <Divider/>
        <Stack direction={"column"} spacing={1} padding={1} className={styles.items}>
          {!!items?.length ? items?.map((item, index) => (
            <CartElement item={item} key={index}/>
          )) : (
            <Stack alignItems={"center"} className={"wp-100"}>
              <Typography variant={"body1"}>Корзина пока еще пуста :(</Typography>
            </Stack>
          )}
        </Stack>
        <Divider/>
        <Stack spacing={1}>
          <Typography variant={"body1"}>Общее количество: <b>{totalQuantity} шт.</b></Typography>
          <Typography variant={"body1"}>Общая
            стоимость: <b>{totalCost ? PriceUtils.round(totalCost) : 0} р.</b> / <b>{totalCostUsd ? PriceUtils.round(totalCostUsd) : 0} $</b> / <b>{totalCostEur ? PriceUtils.round(totalCostEur) : 0} €</b></Typography>
        </Stack>
        <Divider/>
        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={1}>
          <LoadingButton
            variant={"outlined"}
            color={"primary"}
            size={"small"}
            loadingPosition={"start"}
            loading={arrangeLoading}
            disabled={items?.length === 0 || arrangeLoading || resetLoading}
            onClick={arrange}
          >
            Оформить продажу
          </LoadingButton>
          <LoadingButton
            variant={"outlined"}
            color={"error"}
            size={"small"}
            loadingPosition={"start"}
            loading={resetLoading}
            disabled={items?.length === 0 || arrangeLoading || resetLoading}
            onClick={reset}
          >
            Очистить корзину
          </LoadingButton>
        </Stack>
      </Stack>
    </Drawer>
  );
};
