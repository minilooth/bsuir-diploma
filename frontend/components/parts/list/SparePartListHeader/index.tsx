import React, {ChangeEvent} from 'react';
import {Box, Button, ButtonGroup, Chip, InputAdornment, Stack, Typography} from "@mui/material";
import {Add, FilterList, MiscellaneousServicesOutlined, Search, Settings} from "@mui/icons-material";
import {Input} from "components/common/Input";
import debounce from "debounce";
import {useQuery} from "core/hooks/useQuery";
import {useForm} from "react-hook-form";
import {SortDirection, SortDirections} from "types/common/sort-direction";
import {useTypedDispatch, useTypedSelector} from "redux/hooks";
import {SparePartSortItems} from "types/spareparts/sparePart";
import {PartsSettingsDialog} from "components/parts/settings/PartsSettingsDialog";
import {ProcessSparePartDialog} from "components/parts/ProcessSparePartDialog";
import {getGenerations, getModels} from "redux/slices/vehiclesSlice";
import {getGroups, getSubcategories} from "redux/slices/catalogsSlice";
import {SparePartFilter} from "components/parts/list/SparePartListHeader/SparePartFilter";
import {Manufacturer} from "types/spareparts/manufacturer";
import {Make} from "types/spareparts/vehicle/make";
import {Model} from "types/spareparts/vehicle/model";
import {Generation} from "types/spareparts/vehicle/generation";
import {Category} from "types/spareparts/catalog/category";
import {Subcategory} from "types/spareparts/catalog/subcategory";
import {Group} from "types/spareparts/catalog/group";
import {RoleEnum} from "types/user";
import {selectAuthority} from "redux/slices/usersSlice";

enum DialogType {
  FILTER,
  PROCESS,
  SETTINGS
}

interface DialogState {
  filter: boolean,
  process: boolean,
  settings: boolean
}

interface SparePartListHeaderProps {
  manufacturer: Manufacturer | null,
  make: Make | null,
  model: Model | null,
  generation: Generation | null,
  category: Category | null,
  subcategory: Subcategory | null,
  group: Group | null
}

interface HeaderAction {
  icon: React.ReactNode,
  action: () => void;
  title: string;
  authorities: RoleEnum[];
}

export const SparePartListHeader: React.FC<SparePartListHeaderProps> = ({manufacturer, make,
                                                                          model, generation,
                                                                          category, subcategory,
                                                                          group}) => {
  const [dialogState, setDialogState] = React.useState<DialogState>({
    filter: false,
    process: false,
    settings: false
  })
  const {values, deleteFromQuery, appendToQuery, push} = useQuery();

  const dispatch = useTypedDispatch();
  const role = useTypedSelector(selectAuthority);

  const {register} = useForm({
    defaultValues: {
      search: values.search ?? ''
    }
  })

  const toggleDialog = React.useCallback((type: DialogType) => {
    switch (type) {
      case DialogType.FILTER:
        if (make) {
          dispatch(getModels(make.id));
        }
        if (model) {
          dispatch(getGenerations(model.id));
        }
        if (category) {
          dispatch(getSubcategories(category.id));
        }
        if (subcategory) {
          dispatch(getGroups(subcategory.id));
        }
        setDialogState((prev) => {
          return {
            ...prev,
            filter: !prev.filter
          }
        });
        break;
      case DialogType.PROCESS:
        setDialogState((prev) => {
          return {
            ...prev,
            process: !prev.process
          }
        });
        break;
      case DialogType.SETTINGS:
        setDialogState((prev) => {
          return {
            ...prev,
            settings: !prev.settings
          }
        })
        break;
    }
  }, [category, dispatch, make, model, subcategory])

  const deleteFilterItem = async (key: string | string[]) => {
    console.log(key)
    deleteFromQuery(key);
    await push()
  }

  const onSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    appendToQuery({
      search: event.target.value
    });
    await push();
  }

  const sort = SparePartSortItems.find(i => i.query === values.sort)?.label;
  const sortDirection = SortDirections.find(i => i.query === values.sortDirection)?.label?.toLowerCase();
  const article = values.article;
  const description = values.description;
  const purchasePriceFrom = values.purchasePriceFrom;
  const purchasePriceTo = values.purchasePriceTo;
  const retailPriceFrom = values.retailPriceFrom;
  const retailPriceTo = values.retailPriceTo;
  const availabilityFrom = values.availabilityFrom;
  const availabilityTo = values.availabilityTo;

  const headerActions = React.useMemo<HeaderAction[]>(() => [
    {icon: <Add/>, action: () => toggleDialog(DialogType.PROCESS), title: 'Добавить', authorities: [RoleEnum.ADMIN]},
    {icon: <FilterList/>, action: () => toggleDialog(DialogType.FILTER), title: 'Фильтр', authorities: [RoleEnum.ADMIN, RoleEnum.EMPLOYEE]},
    {icon: <Settings/>, action: () => toggleDialog(DialogType.SETTINGS), title: 'Настройки', authorities: [RoleEnum.ADMIN]}
  ], [toggleDialog])

  return (
    <>
      <Stack direction="row" className="justify-between align-center">
        <Typography variant="h4" className="d-flex align-center">
          <MiscellaneousServicesOutlined fontSize="inherit" className="mr-10"/>
          Запчасти
        </Typography>
        <Box>
          <Input
            {...register('search')}
            placeholder='Поиск'
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search/>
                </InputAdornment>
              ),
            }}
            onChange={debounce(onSearch, 1000)}
          />
        </Box>
      </Stack>
      <Stack direction="row" spacing={2} className="pt-20 pb-20 align-center">
        <ButtonGroup color={"primary"} variant={"outlined"} size={"small"}>
          {headerActions.filter(a => role && a.authorities.includes(role.authority)).map((item, index) => (
            <Button
              key={index}
              startIcon={item.icon}
              onClick={item.action}
            >{item.title}</Button>
          ))}
        </ButtonGroup>
        <Stack direction="row" spacing={1} className="super-scroll align-center">
          {sort && sortDirection && (
            <Chip
              label={`Сортировка: ${sort} ${sortDirection}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem(['sort', 'sortDirection'])}/>
          )}
          {manufacturer && (
            <Chip
              label={`Производитель: ${manufacturer.name}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem('manufacturerId')}
            />
          )}
          {make && (
            <Chip
              label={`Марка: ${make.name}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem(['makeId', 'modelId', 'generationId'])}
            />
          )}
          {model && (
            <Chip
              label={`Модель: ${model.name}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem(['modelId', 'generationId'])}
            />
          )}
          {generation && (
            <Chip
              label={`Поколение: ${generation.name}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem('generationId')}
            />
          )}
          {category && (
            <Chip
              label={`Категория: ${category.name}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem(['categoryId', 'subcategoryId', 'groupId'])}
            />
          )}
          {subcategory && (
            <Chip
              label={`Подкатегория: ${subcategory.name}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem(['subcategoryId', 'groupId'])}
            />
          )}
          {group && (
            <Chip
              label={`Группа: ${group.name}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem('groupId')}/>
          )}
          {article && (
            <Chip
              label={`Артикул: ${article}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem('article')}/>
          )}
          {description && (
            <Chip
              label={`Описание: ${description}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem('description')}/>
          )}
          {(purchasePriceFrom || purchasePriceTo) && (
            <Chip
              label={`Закупочная цена: ${purchasePriceFrom ? purchasePriceFrom + ' р.' : ''}${purchasePriceFrom && purchasePriceTo ? ' - ' : ''}${purchasePriceTo ? purchasePriceTo + ' р.' : ''}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem(['purchasePriceFrom', 'purchasePriceTo'])}/>
          )}
          {(retailPriceFrom || retailPriceTo) && (
            <Chip
              label={`Розничная цена: ${retailPriceFrom ? retailPriceFrom + ' р.' : ''}${retailPriceFrom && retailPriceTo ? ' - ' : ''}${retailPriceTo ? retailPriceTo + ' р.' : ''}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem(['retailPriceFrom', 'retailPriceTo'])}/>
          )}
          {(availabilityFrom || availabilityTo) && (
            <Chip
              label={`Наличие: ${availabilityFrom ?? ''}${availabilityFrom && availabilityTo ? ' - ' : ''}${retailPriceTo ?? ''}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem(['availabilityFrom', 'availabilityTo'])}/>
          )}
        </Stack>
      </Stack>
      {dialogState.filter && (
        <SparePartFilter
          open={dialogState.filter}
          onClose={() => toggleDialog(DialogType.FILTER)}
        />
      )}
      {dialogState.process && (
        <ProcessSparePartDialog
          open={dialogState.process}
          onClose={() => toggleDialog(DialogType.PROCESS)}
        />
      )}
      {dialogState.settings && (
        <PartsSettingsDialog
          open={dialogState.settings}
          onClose={() => toggleDialog(DialogType.SETTINGS)}
        />
      )}
    </>
  );
};
