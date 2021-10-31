import React from 'react';
import {Category} from "types/spareparts/catalog/category";
import {Subcategory} from "types/spareparts/catalog/subcategory";
import {Group} from "types/spareparts/catalog/group";
import {Button, Divider, Stack, Typography} from "@mui/material";
import {Table} from "components/common/Table";
import {NoRowsOverlay} from "components/common/NoRowsOverlay";
import {useTypedDispatch, useTypedSelector} from "redux/hooks";
import {
  getCategories,
  getGroups,
  getSubcategories,
  selectCategories,
  selectGroups,
  selectSubcategories,
  setGroups,
  setSubcategories
} from "redux/slices/catalogsSlice";
import {
  categoryColumns,
  groupColumns,
  subcategoryColumns
} from "components/parts/settings/CatalogSettings/catalog-grid-columns";
import {GridSelectionModel} from "@mui/x-data-grid";
import {ProcessSettingsDialog} from "components/parts/settings/ProcessSettingsDialog";
import {getAxiosErrorData} from "core/axios";
import {SnackbarErrorOptions, SnackbarSuccessOptions} from "core/snackbar/snackbar-options";
import {useSnackbar} from "notistack";
import {CatalogUtils} from "utils/CatalogUtils";
import {CategoryService} from "service/spareparts/catalog/CategoryService";
import {SubcategoryService} from "service/spareparts/catalog/SubcategoryService";
import {GroupService} from "service/spareparts/catalog/GroupService";

export enum CatalogActionType {
  ADD = 1,
  UPDATE = 2,
  DELETE = 3
}

export enum CatalogModel {
  CATEGORY = 1,
  SUBCATEGORY = 2,
  GROUP = 3
}

interface CatalogSettingsSelection {
  category: Category | null;
  subcategory: Subcategory | null;
  group: Group | null;
}

interface ProcessCatalogDialogParams {
  type: CatalogActionType;
  model: CatalogModel;
  initialValue?: string;
}

export const CatalogSettings = () => {
  const [processDialogOpened, setProcessDialogOpened] = React.useState(false);
  const [processDialogParams, setProcessDialogParams] = React.useState<ProcessCatalogDialogParams>({} as ProcessCatalogDialogParams);
  const [selectedItems, setSelectedItems] = React.useState<CatalogSettingsSelection>({
    category: null, subcategory: null, group: null
  });
  const dispatch = useTypedDispatch();

  const categories = useTypedSelector(selectCategories);
  const subcategories = useTypedSelector(selectSubcategories);
  const groups = useTypedSelector(selectGroups);

  const {enqueueSnackbar} = useSnackbar();

  const onAction = async (id: number | string, type: CatalogActionType, model: CatalogModel, initialValue?: string) => {
    switch (type) {
      case CatalogActionType.DELETE:
        await onDelete(id, model);
        break;
      case CatalogActionType.ADD:
      case CatalogActionType.UPDATE:
        await openProcessDialog(type, model, initialValue);
        break;
    }
  }

  const onDelete = async (id: number | string, model: CatalogModel) => {
    try {
      switch (model) {
        case CatalogModel.CATEGORY:
          await deleteCategory(id);
          break;
        case CatalogModel.SUBCATEGORY:
          await deleteSubcategory(id);
          break;
        case CatalogModel.GROUP:
          await deleteGroup(id);
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
        case CatalogModel.CATEGORY:
          await saveCategory(name);
          break;
        case CatalogModel.SUBCATEGORY:
          await saveSubcategory(name);
          break;
        case CatalogModel.GROUP:
          await saveGroup(name);
          break;
      }
      await closeProcessDialog();
    } catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  const add = async (type: CatalogActionType, model: CatalogModel) => {
    switch (model) {
      case CatalogModel.SUBCATEGORY:
        if (!selectedItems.category) {
          enqueueSnackbar('Чтобы добавить подкатегорию нужно выбрать категорию', SnackbarErrorOptions);
          return;
        }
        break;
      case CatalogModel.GROUP: {
        if (!selectedItems.subcategory) {
          enqueueSnackbar('Чтобы добавить группу нужно выбрать подкатегорию', SnackbarErrorOptions);
          return;
        }
        break;
      }
    }
    await openProcessDialog(type, model);
  }

  const saveCategory = async (name: string) => {
    const {type, model} = processDialogParams;
    switch (type) {
      case CatalogActionType.ADD:
        await CategoryService.add({name: name});
        break;
      case CatalogActionType.UPDATE:
        const {category} = selectedItems;
        if (category) {
          await CategoryService.update(category.id, {name});
        } else {
          enqueueSnackbar('Категория не выбрана', SnackbarErrorOptions);
          return;
        }
        break;
    }
    await dispatch(getCategories());
    enqueueSnackbar(CatalogUtils.getActionMessage(model), SnackbarSuccessOptions);
  }

  const saveSubcategory = async (name: string) => {
    const {type, model} = processDialogParams;
    const {category, subcategory} = selectedItems;

    if (!category) {
      enqueueSnackbar('Категория не выбрана', SnackbarErrorOptions);
      return;
    }

    switch (type) {
      case CatalogActionType.ADD:
        await SubcategoryService.add({name, category});
        break;
      case CatalogActionType.UPDATE:
        if (subcategory) {
          await SubcategoryService.update(subcategory.id, {name, category});
        } else {
          enqueueSnackbar('Подкатегория не выбрана', SnackbarErrorOptions);
          return;
        }
        break;
    }
    await dispatch(getSubcategories(category?.id));
    enqueueSnackbar(CatalogUtils.getActionMessage(model), SnackbarSuccessOptions);
  }

  const saveGroup = async (name: string) => {
    const {type, model} = processDialogParams;
    const {subcategory, group} = selectedItems;

    if (!subcategory) {
      enqueueSnackbar('Подкатегория не выбрана', SnackbarErrorOptions);
      return;
    }

    switch (type) {
      case CatalogActionType.ADD:
        await GroupService.add({name, subcategory});
        break;
      case CatalogActionType.UPDATE:
        if (group) {
          await GroupService.update(group.id, {name, subcategory});
        } else {
          enqueueSnackbar('Группа не выбрано', SnackbarErrorOptions);
          return;
        }
        break;
    }
    await dispatch(getGroups(subcategory?.id));
    enqueueSnackbar(CatalogUtils.getActionMessage(model), SnackbarSuccessOptions);
  }

  const deleteCategory = async (categoryId: number | string) => {
    await CategoryService.delete(categoryId);
    await dispatch(getCategories());
    await setSelectedItems((prev) => {
      return {
        ...prev,
        category: null,
        subcategory: null,
        group: null
      }
    });
    await dispatch(setSubcategories([]));
    await dispatch(setGroups([]));
    enqueueSnackbar('Категория успешно удалена', SnackbarSuccessOptions);
  }

  const deleteSubcategory = async (subcategoryId: number | string) => {
    const {category} = selectedItems;
    if (category) {
      await SubcategoryService.delete(subcategoryId);
      await dispatch(getSubcategories(category.id));
      await setSelectedItems((prev) => {
        return {
          ...prev,
          subcategory: null,
          group: null
        }
      })
      await dispatch(setGroups([]));
      enqueueSnackbar('Подкатегория успешно удалена', SnackbarSuccessOptions);
    }
  }

  const deleteGroup = async (groupId: number | string) => {
    const {subcategory} = selectedItems;
    if (subcategory) {
      await GroupService.delete(groupId);
      await dispatch(getGroups(subcategory.id));
      await setSelectedItems((prev) => {
        return {
          ...prev,
          group: null
        }
      })
      enqueueSnackbar('Группа успешно удалено', SnackbarSuccessOptions);
    }
  }

  const onSelectionChange = (selection: GridSelectionModel, model: CatalogModel) => {
    const id = Number(selection[0]);

    if (isNaN(id)) {
      return;
    }

    switch (model) {
      case CatalogModel.CATEGORY:
        setSelectedItems((prev) => {
          return {
            ...prev,
            category: categories.find(c => c.id === id) ?? null,
            subcategory: null,
            group: null
          }
        })
        dispatch(getSubcategories(id));
        dispatch(setGroups([]));
        break;
      case CatalogModel.SUBCATEGORY:
        setSelectedItems((prev) => {
          return {
            ...prev,
            subcategory: subcategories.find(s => s.id === id) ?? null,
            group: null
          }
        })
        dispatch(getGroups(id));
        break;
      case CatalogModel.GROUP:
        setSelectedItems((prev) => {
          return {
            ...prev,
            group: groups.find(g => g.id === id) ?? null
          }
        })
        break;
    }
  }

  const openProcessDialog = async (type: CatalogActionType, model: CatalogModel, initialValue?: string) => {
    await setProcessDialogParams({type, model, initialValue});
    await setProcessDialogOpened((prev) => !prev);
  }

  const closeProcessDialog = () => {
    setProcessDialogOpened(false);
  }

  return (
    <Stack direction="row" spacing={2} height={415}>
      <Stack spacing={1} width={'100%'}>
        <Stack direction="row" className="justify-between align-center">
          <Typography variant={"h4"}>Категории</Typography>
          <Button onClick={() => add(CatalogActionType.ADD, CatalogModel.CATEGORY)}>Добавить</Button>
        </Stack>
        <Table
          columns={categoryColumns(onAction, CatalogModel.CATEGORY)}
          rows={categories}
          onSelectionModelChange={(selection) => onSelectionChange(selection, CatalogModel.CATEGORY)}
          selectionModel={selectedItems.category?.id}
          components={{
            NoRowsOverlay: () => NoRowsOverlay({text: 'Не найдено ни одной категории'})
          }}
        />
      </Stack>
      <Divider orientation={'vertical'}/>
      <Stack spacing={1} width={'100%'}>
        <Stack direction="row" className="justify-between align-center">
          <Typography variant={"h4"}>Подкатегории</Typography>
          <Button onClick={() => add(CatalogActionType.ADD, CatalogModel.SUBCATEGORY)}>Добавить</Button>
        </Stack>
        <Table
          columns={subcategoryColumns(onAction, CatalogModel.SUBCATEGORY)}
          rows={subcategories}
          onSelectionModelChange={(selection) => onSelectionChange(selection, CatalogModel.SUBCATEGORY)}
          selectionModel={selectedItems.subcategory?.id}
          components={{
            NoRowsOverlay: () => NoRowsOverlay({text: 'Не найдено ни одной подкатегории или вы не выбрали категорию.'})
          }}
        />
      </Stack>
      <Divider orientation={'vertical'}/>
      <Stack spacing={1} width={'100%'}>
        <Stack direction="row" className="justify-between align-center">
          <Typography variant={"h4"}>Группы</Typography>
          <Button onClick={() => add(CatalogActionType.ADD, CatalogModel.GROUP)}>Добавить</Button>
        </Stack>
        <Table
          columns={groupColumns(onAction, CatalogModel.GROUP)}
          rows={groups}
          onSelectionModelChange={(selection) => onSelectionChange(selection, CatalogModel.GROUP)}
          selectionModel={selectedItems.group?.id}
          components={{
            NoRowsOverlay: () => NoRowsOverlay({text: 'Не найдено ни одной группы или вы не выбрали подкатегорию.'})
          }}
        />
      </Stack>
      {processDialogOpened && <ProcessSettingsDialog
        open={processDialogOpened}
        onClose={closeProcessDialog}
        onSubmit={onSubmit}
        initialValue={processDialogParams.initialValue}
        title={CatalogUtils.getTitle(processDialogParams.type, processDialogParams.model)}
        label={CatalogUtils.getInputLabel(processDialogParams.model)}
        placeholder={CatalogUtils.getInputPlaceholder(processDialogParams.model)}
      />}
    </Stack>
  );
};
