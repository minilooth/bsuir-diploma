import React from 'react';
import {SparePart} from "types/spareparts/sparePart";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import {ExpandMore, MoreVert} from "@mui/icons-material";
import clsx from "clsx";
import styles from "components/parts/SparePartList/SparePartListItem/SparePartListItem.module.scss";
import Image from "next/image";
import {getSparePartImageUrl} from "utils/functions/getSparePartImageUrl";
import {SparePartListItemActions} from "components/parts/SparePartList/SparePartListItem/SparePartListItemActions";
import {UpdateAvailabilityDialog} from "components/parts/SparePartList/UpdateAvailabilityDialog";
import {DateUtils} from "utils/DateUtils";

interface SparePartListItemProps {
  sparePart: SparePart;
}

export enum SparePartAction {
  EDIT,
  UPDATE_AVAILABILITY,
  DELETE
}

enum DialogType {
  EDIT,
  UPDATE_AVAILABILITY
}

interface DialogState {
  process: boolean,
  updateAvailability: boolean;
}

export const SparePartListItem: React.FC<SparePartListItemProps> = ({sparePart}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [dialogState, setDialogState] = React.useState<DialogState>({process: false, updateAvailability: false})
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpened = Boolean(anchorEl);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  }

  const toggleDialog = (type: DialogType) => {
    switch (type) {
      case DialogType.EDIT:
        break;
      case DialogType.UPDATE_AVAILABILITY:
        setDialogState((prev) => {
          return {
            ...prev,
            updateAvailability: !prev.updateAvailability
          }
        })
        break;
    }
  }

  const onAction = (action?: SparePartAction) => {
    closeMenu();
    switch (action) {
      case SparePartAction.EDIT:
        break;
      case SparePartAction.UPDATE_AVAILABILITY:
        toggleDialog(DialogType.UPDATE_AVAILABILITY);
        break;
      case SparePartAction.DELETE:
        break;
    }
  }

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
              marginTop: 1.5
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
                      добавления: {sparePart.createdAt ? DateUtils.format(new Date(sparePart.createdAt), DateUtils.DEFAULT_DATE_TIME_FORMAT) : 'Неизвестно'}</Typography>
                    <Typography variant={"body1"}>Дата
                      изменения: {sparePart.updatedAt ? DateUtils.format(new Date(sparePart.updatedAt),  DateUtils.DEFAULT_DATE_TIME_FORMAT) : 'Неизвестно'}</Typography>
                    <Typography variant={"body1"}>Закупочная цена: {sparePart.purchasePrice} р.</Typography>
                    <Typography variant={"body1"}>Производитель: {sparePart.manufacturer?.name ?? 'Не указан'}</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack alignItems={"center"} spacing={1} justifyContent={"center"} className={"w-200"}>
            <Box className={sparePart.totalQuantity > 0 ? styles.priceWrapper : clsx(styles.priceWrapper, styles.notInStock)}>{sparePart.retailPrice} р.</Box>
            <Typography variant={"body1"}>{Math.round((sparePart.retailPriceUsd + Number.EPSILON) * 100) / 100} $ / {Math.round((sparePart.retailPriceEur + Number.EPSILON) * 100) / 100} €</Typography>
          </Stack>
          <Box>
            <IconButton onClick={openMenu}><MoreVert/></IconButton>
          </Box>
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
    </Grid>
  );
};
