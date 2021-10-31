import React from 'react';
import {Button, Divider, Stack, Typography} from "@mui/material";
import {Table} from "components/common/Table";
import {NoRowsOverlay} from "components/common/NoRowsOverlay";
import {useTypedDispatch, useTypedSelector} from "redux/hooks";
import {getModifications, selectModifications} from "redux/slices/modificationsSlice";
import {getManufacturers, selectManufacturers} from "redux/slices/manufacturersSlice";
import {manufacturerColumns, modificationColumns} from "components/parts/settings/MAMSettings/mam-grid-columns";
import {getAxiosErrorData} from "core/axios";
import {SnackbarErrorOptions, SnackbarSuccessOptions} from "core/snackbar/snackbar-options";
import {ProcessSettingsDialog} from "components/parts/settings/ProcessSettingsDialog";
import {useSnackbar} from "notistack";
import {Modification} from "types/spareparts/modification";
import {Manufacturer} from "types/spareparts/manufacturer";
import {GridSelectionModel} from "@mui/x-data-grid";
import {ModificationService} from "service/spareparts/modification/ModificationService";
import {ManufacturerService} from "service/spareparts/manufacturer/ManufacturerService";
import {MAMUtils} from "utils/MAMUtils";
import {CatalogActionType, CatalogModel} from "components/parts/settings/CatalogSettings";

export enum MAMActionType {
  ADD = 1,
  UPDATE = 2,
  DELETE = 3
}

export enum MAMModel {
  MODIFICATION = 1,
  MANUFACTURER = 2
}

interface ProcessMAMDialogParams {
  type: MAMActionType;
  model: MAMModel;
  initialValue?: string;
}

interface MAMSettingsSelection {
  modification: Modification | null,
  manufacturer: Manufacturer | null
}

export const MAMSettings = () => {
  const [processDialogOpened, setProcessDialogOpened] = React.useState(false);
  const [processDialogParams, setProcessDialogParams] = React.useState<ProcessMAMDialogParams>({} as ProcessMAMDialogParams);
  const [selectedItems, setSelectedItems] = React.useState<MAMSettingsSelection>({
    modification: null, manufacturer: null
  });

  const dispatch = useTypedDispatch();

  const modifications = useTypedSelector(selectModifications);
  const manufacturers = useTypedSelector(selectManufacturers);

  const {enqueueSnackbar} = useSnackbar();

  const onAction = async (id: number | string, type: MAMActionType, model: MAMModel, initialValue?: string) => {
    switch (type) {
      case MAMActionType.DELETE:
        await onDelete(id, model);
        break;
      case MAMActionType.ADD:
      case MAMActionType.UPDATE:
        await openProcessDialog(type, model, initialValue);
        break;
    }
  }

  const onDelete = async (id: number | string, model: MAMModel) => {
    try {
      switch (model) {
        case MAMModel.MODIFICATION:
          await deleteModification(id);
          break;
        case MAMModel.MANUFACTURER:
          await deleteManufacturer(id);
          break;
      }
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  const deleteModification = async (modificationId: number | string) => {
    await ModificationService.delete(modificationId);
    await dispatch(getModifications());
    await setSelectedItems((prev) => {
      return {
        ...prev,
        modification: null
      }
    });
    enqueueSnackbar('Модификация успешно удалена', SnackbarSuccessOptions);
  }

  const deleteManufacturer = async (manufacturerId: number | string) => {
    await ManufacturerService.delete(manufacturerId);
    await dispatch(getManufacturers());
    await setSelectedItems((prev) => {
      return {
        ...prev,
        manufacturer: null
      }
    });
    enqueueSnackbar('Производитель успешно удален', SnackbarSuccessOptions);
  }

  const onSubmit = async ({name}: any) => {
    const {model} = processDialogParams;
    try {
      switch (model) {
        case MAMModel.MODIFICATION:
          await saveModification(name);
          break;
        case MAMModel.MANUFACTURER:
          await saveManufacturer(name);
          break;
      }
      await closeProcessDialog();
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  const saveModification = async (name: string) => {
    const {type, model} = processDialogParams;
    switch (type) {
      case MAMActionType.ADD:
        await ModificationService.add({name: name});
        break;
      case MAMActionType.UPDATE:
        const {modification} = selectedItems;
        if (modification) {
          await ModificationService.update(modification.id, {name});
        } else {
          enqueueSnackbar('Модификация не выбрана', SnackbarErrorOptions);
          return;
        }
        break;
    }
    await dispatch(getModifications());
    enqueueSnackbar(MAMUtils.getActionMessage(model), SnackbarSuccessOptions);
  }

  const saveManufacturer = async (name: string) => {
    const {type, model} = processDialogParams;
    switch (type) {
      case MAMActionType.ADD:
        await ManufacturerService.add({name: name});
        break;
      case MAMActionType.UPDATE:
        const {manufacturer} = selectedItems;
        if (manufacturer) {
          await ManufacturerService.update(manufacturer.id, {name});
        } else {
          enqueueSnackbar('Производитель не выбран', SnackbarErrorOptions);
          return;
        }
        break;
    }
    await dispatch(getManufacturers());
    enqueueSnackbar(MAMUtils.getActionMessage(model), SnackbarSuccessOptions);
  }

  const openProcessDialog = async (type: MAMActionType, model: MAMModel, initialValue?: string) => {
    await setProcessDialogParams({type, model, initialValue});
    await setProcessDialogOpened((prev) => !prev);
  }

  const closeProcessDialog = () => {
    setProcessDialogOpened(false);
  }

  const onSelectionChange = (selection: GridSelectionModel, model: MAMModel) => {
    const id = Number(selection[0]);

    if (isNaN(id)) {
      return;
    }

    switch (model) {
      case MAMModel.MODIFICATION:
        setSelectedItems((prev) => {
          return {
            ...prev,
            modification: modifications.find(m => m.id === id) ?? null
          }
        })
        break;
      case MAMModel.MANUFACTURER:
        setSelectedItems((prev) => {
          return {
            ...prev,
            manufacturer: manufacturers.find(m => m.id === id) ?? null
          }
        })
        break;
    }
  }

  return (
    <Stack direction="row" spacing={2} height={415}>
      <Stack spacing={1} width={'100%'}>
        <Stack direction="row" className="justify-between align-center">
          <Typography variant={"h4"}>Модификации</Typography>
          <Button onClick={() => openProcessDialog(MAMActionType.ADD, MAMModel.MODIFICATION)}>Добавить</Button>
        </Stack>
        <Table
          columns={modificationColumns(onAction, MAMModel.MODIFICATION)}
          rows={modifications}
          onSelectionModelChange={(selection) => onSelectionChange(selection, MAMModel.MODIFICATION)}
          selectionModel={selectedItems.modification?.id}
          components={{
            NoRowsOverlay: () => NoRowsOverlay({text: 'Не найдено ни одной модификации'})
          }}
        />
      </Stack>
      <Divider orientation={'vertical'}/>
      <Stack spacing={1} width={'100%'}>
        <Stack direction="row" className="justify-between align-center">
          <Typography variant={"h4"}>Производители</Typography>
          <Button onClick={() => openProcessDialog(MAMActionType.ADD, MAMModel.MANUFACTURER)}>Добавить</Button>
        </Stack>
        <Table
          columns={manufacturerColumns(onAction, MAMModel.MANUFACTURER)}
          rows={manufacturers}
          onSelectionModelChange={(selection) => onSelectionChange(selection, MAMModel.MANUFACTURER)}
          selectionModel={selectedItems.manufacturer?.id}
          components={{
            NoRowsOverlay: () => NoRowsOverlay({text: 'Не найдено ни одного производителя'})
          }}
        />
      </Stack>
      {processDialogOpened && <ProcessSettingsDialog
        open={processDialogOpened}
        onClose={closeProcessDialog}
        onSubmit={onSubmit}
        initialValue={processDialogParams.initialValue}
        title={MAMUtils.getTitle(processDialogParams.type, processDialogParams.model)}
        label={MAMUtils.getInputLabel(processDialogParams.model)}
        placeholder={MAMUtils.getInputPlaceholder(processDialogParams.model)}
      />}
    </Stack>
  );
};
