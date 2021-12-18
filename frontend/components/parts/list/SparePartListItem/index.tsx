import React from 'react';
import {SparePart} from "types/spareparts/sparePart";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Grid,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import {AddShoppingCartOutlined, Check, ExpandMore, MoreVert} from "@mui/icons-material";
import clsx from "clsx";
import styles from "components/parts/list/SparePartListItem/SparePartListItem.module.scss";
import Image from "next/image";
import {getSparePartImageUrl} from "utils/functions/getSparePartImageUrl";
import {SparePartListItemActions} from "components/parts/list/SparePartListItem/SparePartListItemActions";
import {UpdateAvailabilityDialog} from "components/parts/list/UpdateAvailabilityDialog";
import {DATE_FORMAT, DateUtils} from "utils/DateUtils";
import {ProcessSparePartDialog} from "components/parts/ProcessSparePartDialog";
import {getGenerations, getModels} from "redux/slices/vehiclesSlice";
import {getGroups, getSubcategories} from "redux/slices/catalogsSlice";
import {useTypedDispatch, useTypedSelector} from "redux/hooks";
import {SnackbarErrorOptions, SnackbarSuccessOptions} from "core/snackbar/snackbar-options";
import {getAxiosErrorData} from "core/axios";
import {SparePartService} from "service/spareparts/SparePartService";
import {useQuery} from "core/hooks/useQuery";
import {useSnackbar} from "notistack";
import {getSpareParts} from "redux/slices/sparePartsSlice";
import AddToCartDialog from "components/parts/list/AddToCartDialog";
import {getCart, selectAuthority, selectCart} from "redux/slices/usersSlice";
import {PriceUtils} from "utils/PriceUtils";
import {RoleEnum} from "types/user";

interface SparePartListItemProps {
  sparePart: SparePart;
}

export enum SparePartAction {
  EDIT,
  UPDATE_AVAILABILITY,
  DELETE,
}

enum DialogType {
  EDIT,
  UPDATE_AVAILABILITY,
  ADD_TO_CART
}

interface DialogState {
  process: boolean,
  updateAvailability: boolean;
  addToCart: boolean
}

interface RightAction {
  icon: React.ReactNode,
  action: Function;
  authorities: RoleEnum[];
  disabled?: boolean;
}

export const SparePartListItem: React.FC<SparePartListItemProps> = ({sparePart}) => {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useTypedDispatch();
  const {values} = useQuery();
  const [dialogState, setDialogState] = React.useState<DialogState>({process: false, updateAvailability: false, addToCart: false})
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpened = Boolean(anchorEl);
  const {enqueueSnackbar} = useSnackbar();

  const cart = useTypedSelector(selectCart);
  const role = useTypedSelector(selectAuthority);
  const inCart = cart?.items.map((item) => item.sparePart.id).includes(sparePart.id);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  }

  const toggleDialog = React.useCallback((type: DialogType) => {
    switch (type) {
      case DialogType.EDIT:
        dispatch(getModels(sparePart.make.id));
        dispatch(getGenerations(sparePart.model.id));
        dispatch(getSubcategories(sparePart.category.id));
        dispatch(getGroups(sparePart.subcategory.id));
        setDialogState((prev) => ({
          ...prev,
          process: !prev.process
        }))
        break;
      case DialogType.UPDATE_AVAILABILITY:
        setDialogState((prev) => {
          return {
            ...prev,
            updateAvailability: !prev.updateAvailability
          }
        })
        break;
      case DialogType.ADD_TO_CART:
        setDialogState((prev) => ({
          ...prev,
          addToCart: !prev.addToCart
        }))
    }
  }, [dispatch, sparePart.category.id, sparePart.make.id, sparePart.model.id, sparePart.subcategory.id]);

  const onAction = (action?: SparePartAction) => {
    closeMenu();
    switch (action) {
      case SparePartAction.EDIT:
        toggleDialog(DialogType.EDIT);
        break;
      case SparePartAction.UPDATE_AVAILABILITY:
        toggleDialog(DialogType.UPDATE_AVAILABILITY);
        break;
      case SparePartAction.DELETE:
        onDelete();
        break;
    }
  }

  const onDelete = async () => {
    try {
      await SparePartService.delete(sparePart.id);
      enqueueSnackbar(`Запчасть успешно удалена`, SnackbarSuccessOptions);
      await dispatch(getSpareParts({query: values}));
      await dispatch(getCart());
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  const actions = React.useMemo<RightAction[]>(() => [
    {
      icon: inCart ?
        (
          <Badge color="secondary" badgeContent={<Check sx={{color: "#ffffff"}} fontSize={"inherit"}/>}>
            <AddShoppingCartOutlined/>
          </Badge>
        ) : (
          <AddShoppingCartOutlined/>
        ),
      action: !inCart ? () => toggleDialog(DialogType.ADD_TO_CART) : () => null,
      authorities: [RoleEnum.EMPLOYEE, RoleEnum.ADMIN],
      disabled: inCart
    },
    {
      icon: <MoreVert/>,
      action: openMenu,
      authorities: [RoleEnum.ADMIN]
    }
  ], [inCart, toggleDialog]);

  return (
    <Grid item xs={12}>
      <Accordion disableGutters sx={{cursor: 'default'}} expanded={expanded}>
        <AccordionSummary
          expandIcon={<IconButton onClick={toggleExpand}><ExpandMore/></IconButton>}
          sx={{
            height: 200,
            cursor: 'default',
            '&:hover:not(.Mui-disabled)': {
              cursor: 'default'
            },
            ".MuiAccordionSummary-expandIconWrapper": {
              alignSelf: 'start',
              marginTop: 1.25,
              marginLeft: 1
            }
          }}
        >
          <Stack className={"wp-100"} spacing={1}>
            <Typography
              variant={"body2"}>{sparePart.category.name} - {sparePart.subcategory.name} - {sparePart.group?.name ?? ''}</Typography>
            <Stack direction={"row"} spacing={3} className={"wp-100"}>
              <Box className={styles.imageWrapper}>
                <Image src={getSparePartImageUrl(sparePart.image)} alt={sparePart.name}
                       layout="fill" objectFit="cover"/>
              </Box>
              <Stack spacing={1} className={styles.infoWrapper}>
                <Typography
                  variant={"h4"}>{sparePart.name} / {sparePart.make.name} {sparePart.model.name} {sparePart.generation?.name ?? ''}</Typography>
                <Stack direction={"row"} justifyContent={"space-between"} className={"wp-100"}>
                  <Box>
                    <Typography variant={"body1"}>ID: {sparePart.id}</Typography>
                    <Typography variant={"body1"}>Артикул: {sparePart.article}</Typography>
                    <Typography variant={"body1"}>Дата
                      добавления: {sparePart.createdAt ? DateUtils.format(sparePart.createdAt, DATE_FORMAT.DATE_TIME) : 'Неизвестно'}</Typography>
                    <Typography variant={"body1"}>Дата
                      изменения: {sparePart.updatedAt ? DateUtils.format(sparePart.updatedAt, DATE_FORMAT.DATE_TIME) : 'Неизвестно'}</Typography>
                    <Typography variant={"body1"}>Закупочная цена: {PriceUtils.round(sparePart.purchasePrice)} р. / {PriceUtils.round(sparePart.purchasePriceUsd)} $ / {PriceUtils.round(sparePart.purchasePriceEur)} €</Typography>
                    <Typography variant={"body1"}>Производитель: {sparePart.manufacturer?.name ?? 'Не указан'}</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack alignItems={"center"} spacing={1} justifyContent={"center"} className={"w-300"}>
            <Box className={sparePart.totalQuantity > 0 ? styles.priceWrapper : clsx(styles.priceWrapper, styles.notInStock)}>{PriceUtils.round(sparePart.retailPrice)} р.</Box>
            <Typography variant={"body1"}>{PriceUtils.round(sparePart.retailPriceUsd)} $ / {PriceUtils.round(sparePart.retailPriceEur)} €</Typography>
          </Stack>
          <Stack direction={"row"} alignSelf={"start"} spacing={1}>
            {actions.filter(a => role && a.authorities.includes(role.authority)).map((item, index) => (
              <IconButton key={index} onClick={(event) => item.action(event)} disabled={item.disabled}>
                {item.icon}
              </IconButton>
            ))}
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction={"row"} spacing={3}>
            <Stack spacing={1}>
              <Typography variant={"h4"}>Характеристики:</Typography>
              <Box>
                {sparePart.characteristics.map((characteristic, index) => (
                  <Typography variant={"body1"}
                              key={index}>{characteristic.modification.name}: {characteristic.value}</Typography>
                ))}
              </Box>
            </Stack>
            <Stack spacing={1}>
              <Typography variant={"h4"}>Наличие:</Typography>
              <Box>
                {sparePart.availabilities.map((availability, index) => (
                  <Stack key={index} direction={"row"} spacing={1}>
                    <Typography variant={"body1"}>
                      {availability.store.name}:
                    </Typography>
                    {availability.quantity > 0 ? (
                      <Typography variant={"body1"} sx={{color: 'green'}}>
                        {availability.quantity} шт.
                      </Typography>
                    ) : (
                      <Typography variant={"body1"} sx={{color: 'red'}}>
                        Нет в наличии
                      </Typography>
                    )}
                  </Stack>
                ))}
              </Box>
            </Stack>
            <Stack spacing={1}>
              <Typography variant={"h4"}>Описание:</Typography>
              <Typography variant={"body1"}>{sparePart.description}</Typography>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
      {menuOpened && (
        <SparePartListItemActions
          open={menuOpened}
          anchorEl={anchorEl}
          onClose={onAction}
        />
      )}
      {dialogState.updateAvailability && (
        <UpdateAvailabilityDialog
          open={dialogState.updateAvailability}
          onClose={() => toggleDialog(DialogType.UPDATE_AVAILABILITY)}
          sparePart={sparePart}
        />
      )}
      {dialogState.process && (
        <ProcessSparePartDialog
          open={dialogState.process}
          onClose={() => toggleDialog(DialogType.EDIT)}
          sparePart={sparePart}
        />
      )}
      {dialogState.addToCart && (
        <AddToCartDialog
          sparePart={sparePart}
          open={dialogState.addToCart}
          onClose={() => toggleDialog(DialogType.ADD_TO_CART)}
        />
      )}
    </Grid>
  );
};
