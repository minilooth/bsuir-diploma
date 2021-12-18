import React from 'react';
import {Box, IconButton, Stack, Typography} from "@mui/material";
import Image from "next/image";
import {getSparePartImageUrl} from "utils/functions/getSparePartImageUrl";
import {CartItem} from "types/cart";

import styles from 'components/nav/Navbar/CartElement/CartElement.module.scss';
import {Add, Close, Remove} from "@mui/icons-material";
import {useTypedDispatch} from "redux/hooks";
import {CartService} from "service/cart/CartService";
import {enqueueError, enqueueSuccess} from "redux/slices/snackbar/actions";
import {getAxiosErrorData} from "core/axios";
import { setCart } from 'redux/slices/usersSlice';
import {PriceUtils} from "utils/PriceUtils";

interface CartElementProps {
  item: CartItem;
}

export const CartElement: React.FC<CartElementProps> = ({item}) => {
  const dispatch = useTypedDispatch();

  const onDelete = async () => {
    try {
      const cart = await CartService.delete(item.sparePart.id);
      await dispatch(setCart(cart));
      await dispatch(enqueueSuccess('Товар успешно удален из корзины'));
    }
    catch (err) {
      await dispatch(enqueueError(getAxiosErrorData(err)));
    }
  }

  const increase = async () => {
    try {
      const cart = await CartService.increase(item.sparePart.id);
      await dispatch(setCart(cart));
    }
    catch (err) {
      await dispatch(enqueueError(getAxiosErrorData(err)));
    }
  }

  const decrease = async () => {
    try {
      const cart = await CartService.decrease(item.sparePart.id);
      await dispatch(setCart(cart));
    }
    catch (err) {
      await dispatch(enqueueError(getAxiosErrorData(err)));
    }
  }

  return (
    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
      <Box className={styles.image}>
        <Image src={getSparePartImageUrl(item.sparePart.image)} alt={item.sparePart.name}
               layout="fill" objectFit="cover"/>
      </Box>
      <Stack className={styles.info}>
        <Typography variant={"body1"}>Название: <b>{item.sparePart.name}</b></Typography>
        <Typography
          variant={"body1"}>Автомобиль: {item.sparePart.make?.name} {item.sparePart.model?.name} {item.sparePart.generation?.name}</Typography>
        <Typography variant={"body1"}>Артикул: {item.sparePart.article}</Typography>
        <Typography variant={"body1"}>Из магазина: {item.store.name}</Typography>
        <Typography variant={"body1"}>Сумма: <b>{PriceUtils.round(item.sparePart.retailPrice * item.quantity)} р.</b> / <b>{PriceUtils.round(item.sparePart.retailPriceUsd  * item.quantity)} $</b> / <b>{PriceUtils.round(item.sparePart.retailPriceEur * item.quantity)} €</b></Typography>
      </Stack>
      <Stack className={"hp-100"} alignItems={"end"} justifyContent={"space-between"}>
        <Stack className={"wp-100"} alignItems={"end"}>
          <Box>
            <IconButton size={"small"} onClick={onDelete}>
              <Close fontSize={"inherit"}/>
            </IconButton>
          </Box>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          {item.quantity > 0 && (
            <IconButton size={"small"} className={"mr-5"} onClick={decrease}>
              <Remove fontSize={"inherit"}/>
            </IconButton>
          )}
          <Typography variant={"body1"}>{item.quantity} шт.</Typography>
          <IconButton size={"small"} className={"ml-5"} onClick={increase}>
            <Add fontSize={"inherit"}/>
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
