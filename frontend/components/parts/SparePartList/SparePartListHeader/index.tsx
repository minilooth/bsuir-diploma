import React, {ChangeEvent} from 'react';
import {Box, Button, ButtonGroup, Chip, InputAdornment, Stack, Typography} from "@mui/material";
import {
  Search,
  Settings,
  MiscellaneousServicesOutlined,
  FilterList, Add
} from "@mui/icons-material";
import {Input} from "components/common/Input";
import debounce from "debounce";
import {useQuery} from "core/hooks/useQuery";
import {useForm} from "react-hook-form";
import {SortDirection} from "types/common/sort-direction";
import {useTypedSelector} from "redux/hooks";
import {
  selectFilterCategories,
  selectFilterGenerations, selectFilterGroups,
  selectFilterMakes,
  selectFilterManufacturers,
  selectFilterModels, selectFilterSubcategories
} from "redux/slices/sparePartsSlice";
import {SparePartSortItems} from "types/spareparts/sparePart";
import {PartsSettingsDialog} from "components/parts/settings/PartsSettingsDialog";
import {ProcessSparePartDialog} from "components/parts/ProcessSparePartDialog";

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

export const SparePartListHeader = () => {
  const [dialogState, setDialogState] = React.useState<DialogState>({
    filter: false,
    process: false,
    settings: false
  })
  const {values, deleteFromQuery, appendToQuery, push} = useQuery();

  const manufacturers = useTypedSelector(selectFilterManufacturers);
  const makes = useTypedSelector(selectFilterMakes);
  const models = useTypedSelector(selectFilterModels);
  const generations = useTypedSelector(selectFilterGenerations);
  const categories = useTypedSelector(selectFilterCategories);
  const subcategories = useTypedSelector(selectFilterSubcategories);
  const groups = useTypedSelector(selectFilterGroups);

  const {register} = useForm({
    defaultValues: {
      search: values.search ?? ''
    }
  })

  const toggleDialog = (type: DialogType) => {
    switch (type) {
      case DialogType.FILTER:
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
  }

  const deleteFilterItem = async (key: string | string[]) => {
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
  const sortDirection = SortDirection[values.sortDirection as keyof typeof SortDirection]?.toLowerCase();
  const manufacturer = manufacturers.find(m => m.id === Number(values.manufacturerId));
  const make = makes.find(m => m.id === Number(values.makeId));
  const model = models.find(m => m.id === Number(values.modelId));
  const generation = generations.find(g => g.id === Number(values.generationId));
  const category = categories.find(c => c.id === Number(values.categoryId));
  const subcategory = subcategories.find(s => s.id === Number(values.subcategoryId));
  const group = groups.find(g => g.id === Number(values.groupId));
  const article = values.article;
  const description = values.description;
  const purchasePriceFrom = values.purchasePriceFrom;
  const purchasePriceTo = values.purchasePriceTo;
  const retailPriceFrom = values.retailPriceFrom;
  const retailPriceTo = values.retailPriceTo;
  const availabilityFrom = values.availabilityFrom;
  const availabilityTo = values.availabilityTo;

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
          <Button
            startIcon={<Add/>}
            onClick={() => toggleDialog(DialogType.PROCESS)}
          >
            Добавить
          </Button>
          <Button
            startIcon={<FilterList/>}
            onClick={() => toggleDialog(DialogType.FILTER)}
          >
            Фильтр
          </Button>
          <Button
            startIcon={<Settings/>}
            onClick={() => toggleDialog(DialogType.SETTINGS)}
          >
            Настройки
          </Button>
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
              onDelete={() => deleteFilterItem('manufacturerId')}/>
          )}
          {make && (
            <Chip
              label={`Марка: ${make.name}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem(['makeId', 'modelId', 'generationId'])}/>
          )}
          {model && (
            <Chip
              label={`Модель: ${model.name}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem(['modelId', 'generationId'])}/>
          )}
          {generation && (
            <Chip
              label={`Поколение: ${generation.name}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem('generationId')}/>
          )}
          {category && (
            <Chip
              label={`Категория: ${category.name}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem(['categoryId', 'subcategoryId', 'groupId'])}/>
          )}
          {subcategory && (
            <Chip
              label={`Подкатегория: ${subcategory.name}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem(['subcategoryId', 'groupId'])}/>
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
      {/*{dialogState.filter && <StoreFilter open={dialogState.filter} onClose={() => toggleDialog(DialogType.FILTER)}/>}*/}
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
