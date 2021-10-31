import React from 'react';
import {Button, Divider, Stack, Typography} from "@mui/material";
import {GridSelectionModel} from "@mui/x-data-grid";
import {
  generationColumns,
  makeColumns,
  modelColumns
} from "components/parts/settings/VehicleSettings/vehicle-grid-columns";
import {
  ProcessSettingsDialog,
} from "components/parts/settings/ProcessSettingsDialog";
import {NoRowsOverlay} from "components/common/NoRowsOverlay";
import {useTypedDispatch, useTypedSelector} from "redux/hooks";
import {
  getGenerations,
  getMakes,
  getModels,
  selectGenerations,
  selectMakes,
  selectModels,
  setGenerations,
  setModels
} from "redux/slices/vehiclesSlice";
import {Make} from "types/spareparts/vehicle/make";
import {Model} from "types/spareparts/vehicle/model";
import {Generation} from "types/spareparts/vehicle/generation";
import {useSnackbar} from "notistack";
import {SnackbarErrorOptions, SnackbarSuccessOptions} from "core/snackbar/snackbar-options";
import {MakeService} from "service/spareparts/vehicle/MakeService";
import {ModelService} from "service/spareparts/vehicle/ModelService";
import {GenerationService} from "service/spareparts/vehicle/GenerationService";
import {getAxiosErrorData} from "core/axios";
import {VehicleUtils} from "utils/VehicleUtils";
import {Table} from "components/common/Table";

export enum VehicleActionType {
  ADD = 1,
  UPDATE = 2,
  DELETE = 3
}

export enum VehicleModel {
  MAKE = 1,
  MODEL = 2,
  GENERATION = 3
}

interface VehicleSettingsSelection {
  make: Make | null;
  model: Model | null;
  generation: Generation | null;
}

interface ProcessVehicleDialogParams {
  type: VehicleActionType;
  model: VehicleModel;
  initialValue?: string;
}

export const VehicleSettings = () => {
  const [processDialogOpened, setProcessDialogOpened] = React.useState(false);
  const [processDialogParams, setProcessDialogParams] = React.useState<ProcessVehicleDialogParams>({} as ProcessVehicleDialogParams);
  const [selectedItems, setSelectedItems] = React.useState<VehicleSettingsSelection>({
    make: null, model: null, generation: null
  });

  const dispatch = useTypedDispatch();
  const makes = useTypedSelector(selectMakes);
  const models = useTypedSelector(selectModels);
  const generations = useTypedSelector(selectGenerations);

  const {enqueueSnackbar} = useSnackbar();

  const onAction = async (id: number | string, type: VehicleActionType, model: VehicleModel, initialValue?: string) => {
    switch (type) {
      case VehicleActionType.DELETE:
        await onDelete(id, model);
        break;
      case VehicleActionType.ADD:
      case VehicleActionType.UPDATE:
        await openProcessDialog(type, model, initialValue);
        break;
    }
  }

  const onDelete = async (id: number | string, model: VehicleModel) => {
    try {
      switch (model) {
        case VehicleModel.MAKE:
          await deleteMake(id);
          break;
        case VehicleModel.MODEL:
          await deleteModel(id);
          break;
        case VehicleModel.GENERATION:
          await deleteGeneration(id);
          break;
      }
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  const onSubmit = async ({name}: any) => {
    const {model} = processDialogParams;
    try {
      switch (model) {
        case VehicleModel.MAKE:
          await saveMake(name);
          break;
        case VehicleModel.MODEL:
          await saveModel(name);
          break;
        case VehicleModel.GENERATION:
          await saveGeneration(name);
          break;
      }
      await closeProcessDialog();
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  const saveMake = async (name: string) => {
    const {type, model} = processDialogParams;
    switch (type) {
      case VehicleActionType.ADD:
        await MakeService.add({name: name});
        break;
      case VehicleActionType.UPDATE:
        const {make} = selectedItems;
        if (make) {
          await MakeService.update(make.id, {name});
        } else {
          enqueueSnackbar('Марка не выбрана', SnackbarErrorOptions);
          return;
        }
        break;
    }
    await dispatch(getMakes());
    enqueueSnackbar(VehicleUtils.getActionMessage(model), SnackbarSuccessOptions);
  }

  const saveModel = async (name: string) => {
    const {type, model} = processDialogParams;
    const {make, model: selectedModel} = selectedItems;

    if (!make) {
      enqueueSnackbar('Марка не выбрана', SnackbarErrorOptions);
      return;
    }

    switch (type) {
      case VehicleActionType.ADD:
        await ModelService.add({name, make});
        break;
      case VehicleActionType.UPDATE:
        if (selectedModel) {
          await ModelService.update(selectedModel.id, {name, make});
        } else {
          enqueueSnackbar('Модель не выбрана', SnackbarErrorOptions);
          return;
        }
        break;
    }
    await dispatch(getModels(make?.id));
    enqueueSnackbar(VehicleUtils.getActionMessage(model), SnackbarSuccessOptions);
  }

  const saveGeneration = async (name: string) => {
    const {type, model} = processDialogParams;
    const {model: selectedModel, generation} = selectedItems;

    if (!selectedModel) {
      enqueueSnackbar('Модель не выбрана', SnackbarErrorOptions);
      return;
    }

    switch (type) {
      case VehicleActionType.ADD:
        await GenerationService.add({name, model: selectedModel});
        break;
      case VehicleActionType.UPDATE:
        if (generation) {
          await GenerationService.update(generation.id, {name, model: selectedModel});
        } else {
          enqueueSnackbar('Поколение не выбрано', SnackbarErrorOptions);
          return;
        }
        break;
    }
    await dispatch(getGenerations(selectedModel?.id));
    enqueueSnackbar(VehicleUtils.getActionMessage(model), SnackbarSuccessOptions);
  }

  const deleteMake = async (makeId: number | string) => {
    await MakeService.delete(makeId);
    await dispatch(getMakes());
    await setSelectedItems((prev) => {
      return {
        ...prev,
        make: null,
        model: null,
        generation: null
      }
    });
    await dispatch(setModels([]));
    await dispatch(setGenerations([]));
    enqueueSnackbar('Марка успешно удалена', SnackbarSuccessOptions);
  }

  const deleteModel = async (modelId: number | string) => {
    const {make} = selectedItems;
    if (make) {
      await ModelService.delete(modelId);
      await dispatch(getModels(make.id));
      await setSelectedItems((prev) => {
        return {
          ...prev,
          model: null,
          generation: null
        }
      })
      await dispatch(setGenerations([]));
      enqueueSnackbar('Модель успешно удалена', SnackbarSuccessOptions);
    }
  }

  const deleteGeneration = async (generationId: number | string) => {
    const {model} = selectedItems;
    if (model) {
      await GenerationService.delete(generationId);
      await dispatch(getGenerations(model.id));
      await setSelectedItems((prev) => {
        return {
          ...prev,
          generation: null
        }
      })
      enqueueSnackbar('Поколение успешно удалено', SnackbarSuccessOptions);
    }
  }

  const add = async (type: VehicleActionType, model: VehicleModel) => {
    switch (model) {
      case VehicleModel.MODEL:
        if (!selectedItems.make) {
          enqueueSnackbar('Чтобы добавить модель нужно выбрать марку', SnackbarErrorOptions);
          return;
        }
        break;
      case VehicleModel.GENERATION: {
        if (!selectedItems.model) {
          enqueueSnackbar('Чтобы добавить поколение нужно выбрать модель', SnackbarErrorOptions);
          return;
        }
        break;
      }
    }
    await openProcessDialog(type, model);
  }

  const openProcessDialog = async (type: VehicleActionType, model: VehicleModel, initialValue?: string) => {
    await setProcessDialogParams({type, model, initialValue});
    await setProcessDialogOpened((prev) => !prev);
  }

  const closeProcessDialog = () => {
    setProcessDialogOpened(false);
  }

  const onSelectionChange = (selection: GridSelectionModel, model: VehicleModel) => {
    const id = Number(selection[0]);

    if (isNaN(id)) {
      return;
    }

    switch (model) {
      case VehicleModel.MAKE:
        setSelectedItems((prev) => {
          return {
            ...prev,
            make: makes.find(m => m.id === id) ?? null,
            model: null,
            generation: null
          }
        })
        dispatch(getModels(id));
        dispatch(setGenerations([]));
        break;
      case VehicleModel.MODEL:
        setSelectedItems((prev) => {
          return {
            ...prev,
            model: models.find(m => m.id === id) ?? null,
            generation: null
          }
        })
        dispatch(getGenerations(id));
        break;
      case VehicleModel.GENERATION:
        setSelectedItems((prev) => {
          return {
            ...prev,
            generation: generations.find(g => g.id === id) ?? null
          }
        })
        break;
    }
  }

  return (
    <Stack direction="row" spacing={2} height={415}>
      <Stack spacing={1} width={'100%'}>
        <Stack direction="row" className="justify-between align-center">
          <Typography variant={"h4"}>Марки</Typography>
          <Button onClick={() => add(VehicleActionType.ADD, VehicleModel.MAKE)}>Добавить</Button>
        </Stack>
        <Table
          columns={makeColumns(onAction, VehicleModel.MAKE)}
          rows={makes}
          onSelectionModelChange={(selection) => onSelectionChange(selection, VehicleModel.MAKE)}
          selectionModel={selectedItems.make?.id}
          components={{
            NoRowsOverlay: () => NoRowsOverlay({text: 'Не найдено ни одной марки'})
          }}
        />
      </Stack>
      <Divider orientation={'vertical'}/>
      <Stack spacing={1} width={'100%'}>
        <Stack direction="row" className="justify-between align-center">
          <Typography variant={"h4"}>Модели</Typography>
          <Button onClick={() => add(VehicleActionType.ADD, VehicleModel.MODEL)}>Добавить</Button>
        </Stack>
        <Table
          columns={modelColumns(onAction, VehicleModel.MODEL)}
          rows={models}
          onSelectionModelChange={(selection) => onSelectionChange(selection, VehicleModel.MODEL)}
          selectionModel={selectedItems.model?.id}
          components={{
            NoRowsOverlay: () => NoRowsOverlay({text: 'Не найдено ни одной модели или вы не выбрали марку.'})
          }}
        />
      </Stack>
      <Divider orientation={'vertical'}/>
      <Stack spacing={1} width={'100%'}>
        <Stack direction="row" className="justify-between align-center">
          <Typography variant={"h4"}>Поколения</Typography>
          <Button onClick={() => add(VehicleActionType.ADD, VehicleModel.GENERATION)}>Добавить</Button>
        </Stack>
        <Table
          columns={generationColumns(onAction, VehicleModel.GENERATION)}
          rows={generations}
          onSelectionModelChange={(selection) => onSelectionChange(selection, VehicleModel.GENERATION)}
          selectionModel={selectedItems.generation?.id}
          components={{
            NoRowsOverlay: () => NoRowsOverlay({text: 'Не найдено ни одного поколения или вы не выбрали модель.'})
          }}
        />
      </Stack>
      {processDialogOpened && <ProcessSettingsDialog
        open={processDialogOpened}
        onClose={closeProcessDialog}
        onSubmit={onSubmit}
        initialValue={processDialogParams.initialValue}
        title={VehicleUtils.getTitle(processDialogParams.type, processDialogParams.model)}
        label={VehicleUtils.getInputLabel(processDialogParams.model)}
        placeholder={VehicleUtils.getInputPlaceholder(processDialogParams.model)}
      />}
    </Stack>
  )
};
