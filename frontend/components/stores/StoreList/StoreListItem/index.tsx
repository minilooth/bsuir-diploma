import React from 'react';
import {Store, StoreTypes} from "types/stores/store";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import {useSnackbar} from "notistack";
import {useTypedDispatch} from "redux/hooks";
import {useQuery} from "core/hooks/useQuery";
import {SnackbarErrorOptions, SnackbarSuccessOptions} from "core/snackbar/snackbar-options";
import {getAxiosErrorData} from "core/axios";
import {StoreService} from "service/stores/StoreService";
import {getStores} from "redux/slices/storesSlice";
import {getStoreImageUrl} from "utils/functions/getStoreImageUrl";
import {ProcessStoreDialog} from "components/stores/ProcessStoreDialog";

import styles from "components/stores/StoreList/StoreListItem/StoreItemList.module.scss";
import {StoreListItemActionMenu} from "components/stores/StoreList/StoreListItem/StoreListItemActionMenu";

interface StoreListItemProps {
  store: Store;
}

export enum StoreAction {
  EDIT,
  DELETE
}

export const StoreListItem: React.FC<StoreListItemProps> = ({store}) => {
  const {id, image, name, type, address} = store;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dialogState, setDialogState] = React.useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useTypedDispatch();
  const {values} = useQuery();
  const menuOpened = Boolean(anchorEl);

  const onOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const toggleDialog = () => {
    setDialogState((prev) => !prev);
  }

  const onDelete = async () => {
    try {
      await StoreService.delete(id);
      enqueueSnackbar(`Склад / магазин успешно удален`, SnackbarSuccessOptions);
      await dispatch(getStores({query: values}));
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  const onActionClick = async (action?: StoreAction) => {
    onCloseMenu();
    switch (action) {
      case StoreAction.EDIT:
        toggleDialog();
        break;
      case StoreAction.DELETE:
        await onDelete();
        break;
      default:
        break;
    }
  }

  return (
    <Grid item xs={4}>
      <Card>
        <CardMedia>
          <Box className={clsx("d-flex justify-center", styles.imageWrapper)}>
            <Image src={getStoreImageUrl(image)} alt={name}
                   layout="fill" objectFit="cover"/>
          </Box>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Тип: {StoreTypes.find(t => t.key === type)?.label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Адрес: {address.full}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onOpenMenu}>Еще</Button>
        </CardActions>
      </Card>
      {menuOpened && (
        <StoreListItemActionMenu
          open={menuOpened}
          anchorEl={anchorEl}
          onClose={onActionClick}
        />
      )}
      {dialogState && (
        <ProcessStoreDialog
          open={dialogState}
          onClose={toggleDialog}
          store={store}
        />
      )}
    </Grid>
  );
};
