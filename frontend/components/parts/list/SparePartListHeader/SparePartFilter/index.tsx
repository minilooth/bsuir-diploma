import React from 'react';
import {
  Box, Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem, Stack,
  Typography
} from "@mui/material";
import {CloseOutlined, FilterAlt} from "@mui/icons-material";
import {Form} from "components/common/Form";
import {Dropdown} from "components/common/Dropdown";
import {SortDirection, SortDirections} from "types/common/sort-direction";
import {Input} from "components/common/Input";
import {useQuery} from "core/hooks/useQuery";
import {useForm} from "react-hook-form";
import {useTypedDispatch, useTypedSelector} from "redux/hooks";
import {selectManufacturers} from "redux/slices/manufacturersSlice";
import {
  getGenerations,
  getModels,
  selectGenerations,
  selectMakes,
  selectModels,
  setGenerations,
  setModels
} from "redux/slices/vehiclesSlice";
import {
  getGroups,
  getSubcategories,
  selectCategories,
  selectGroups, selectSubcategories,
  setGroups,
  setSubcategories
} from "redux/slices/catalogsSlice";
import {SparePartSortItems} from "types/spareparts/sparePart";
import {SparePartFilterSchema} from "schemas/sparePart";
import {yupResolver} from "@hookform/resolvers/yup";

interface SparePartFilterProps {
  open: boolean;
  onClose: () => void;
}

export const SparePartFilter: React.FC<SparePartFilterProps> = ({open, onClose}) => {
  const {values, appendToQuery, push} = useQuery();
  const dispatch = useTypedDispatch();

  const manufacturers = useTypedSelector(selectManufacturers);
  const makes = useTypedSelector(selectMakes);
  const models = useTypedSelector(selectModels);
  const generations = useTypedSelector(selectGenerations);
  const categories = useTypedSelector(selectCategories);
  const subcategories = useTypedSelector(selectSubcategories);
  const groups = useTypedSelector(selectGroups);

  const {register, handleSubmit, control, watch, formState: {errors}, reset, setValue} = useForm({
    mode: "onChange",
    defaultValues: {
      sort: values.sort ?? '',
      sortDirection: values.sortDirection ?? '',
      manufacturerId: values.manufacturerId ?? '',
      article: values.article ?? '',
      purchasePriceFrom: values.purchasePriceFrom ?? '',
      purchasePriceTo: values.purchasePriceTo ?? '',
      retailPriceFrom: values.retailPriceFrom ?? '',
      retailPriceTo: values.retailPriceTo ?? '',
      availabilityFrom: values.availabilityFrom ?? '',
      availabilityTo: values.availabilityTo ?? '',
      makeId: values.makeId ?? '',
      hasModels: false,
      modelId: values.modelId ?? '',
      hasGenerations: false,
      generationId: values.generationId ?? '',
      categoryId: values.categoryId ?? '',
      hasSubcategories: false,
      subcategoryId: values.subcategoryId ?? '',
      hasGroups: false,
      groupId: values.groupId ?? ''
    },
    resolver: yupResolver(SparePartFilterSchema)
  })

  const sort = watch('sort');
  const makeId = watch("makeId");
  const modelId = watch("modelId");
  const categoryId = watch("categoryId");
  const subcategoryId = watch("subcategoryId");

  const onMakeChangeCallback = React.useCallback((value) => {
    setValue("modelId", '');
    setValue("generationId", '');
    dispatch(setGenerations([]))
    dispatch(getModels(value));
  }, [setValue, dispatch]);

  const onModelChangeCallback = React.useCallback((value) => {
    setValue("generationId", '');
    dispatch(getGenerations(value))
  }, [setValue, dispatch])

  const onCategoryChangeCallback = React.useCallback((value) => {
    setValue("subcategoryId", '');
    setValue("groupId", "");
    dispatch(setGroups([]));
    dispatch(getSubcategories(value));
  }, [setValue, dispatch])

  const onSubcategoryChangeCallback = React.useCallback((value) => {
    setValue('groupId', '');
    dispatch(getGroups(value));
  }, [setValue, dispatch])

  React.useEffect(() => {
    const subscription = watch((value, {name}) => {
      switch (name) {
        case 'makeId':
          onMakeChangeCallback(Number(value['makeId']));
          break;
        case 'modelId':
          onModelChangeCallback(Number(value['modelId']));
          break;
        case 'categoryId':
          onCategoryChangeCallback(Number(value['categoryId']));
          break;
        case 'subcategoryId':
          onSubcategoryChangeCallback(Number(value['subcategoryId']));
          break;
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch, onMakeChangeCallback, onModelChangeCallback, onCategoryChangeCallback,
    onSubcategoryChangeCallback]);

  React.useEffect(() => {
    setValue("hasModels", !!models.length)
    setValue("hasGenerations", !!generations.length);
    setValue("hasSubcategories", !!subcategories.length);
    setValue("hasGroups", !!groups.length);
  }, [models, generations, subcategories, groups, setValue]);

  const onCloseWrapper = () => {
    dispatch(setModels([]));
    dispatch(setGenerations([]));
    dispatch(setSubcategories([]));
    dispatch(setGroups([]));
    onClose();
  }

  const onSubmit = async (data: any) => {
    const {sort: sortField, sortDirection, hasModels, hasGenerations, hasSubcategories, hasGroups, ...other} = data;
    appendToQuery({
      sort: sortField,
      sortDirection: sortDirection,
      ...other
    })
    await push();
    onClose();
  }

  const onReset = () => {
    reset({
      sort: '',
      sortDirection: '',
      manufacturerId: '',
      article: '',
      purchasePriceFrom: '',
      purchasePriceTo: '',
      retailPriceFrom: '',
      retailPriceTo: '',
      availabilityFrom: '',
      availabilityTo: '',
      makeId: '',
      hasModels: false,
      modelId: '',
      hasGenerations: false,
      generationId: '',
      categoryId: '',
      hasSubcategories: false,
      subcategoryId: '',
      hasGroups: false,
      groupId: ''
    })
  }

  return (
    <Dialog
      open={open}
      onClose={onCloseWrapper}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle className={"d-flex flex-row justify-between align-center"}>
        <Typography variant="h4" className="d-flex align-center">
          <FilterAlt fontSize="inherit" className="mr-10"/>Фильтр запчастей
        </Typography>
        <CloseOutlined className="cu-p" onClick={onCloseWrapper}/>
      </DialogTitle>
      <DialogContent>
        <Form className="d-flex flex-column align-center mt-20 mb-20" onSubmit={handleSubmit(onSubmit)}
              id="filter-form">
          <Box className="d-flex wp-100 mb-10">
            <Dropdown
              name={'sort'}
              control={control}
              label={"Сортировка"}
              className={sort ? "mr-10" : ""}
              displayEmpty={true}
              startAdornment={<InputAdornment position={"start"}/>}
              error={!!errors.sort}
              helperText={errors?.sort?.message}
            >
              <MenuItem value={''}>Выберите...</MenuItem>
              {SparePartSortItems.map((item, index) =>
                <MenuItem value={item.query} key={index}>{item.label}</MenuItem>
              )}
            </Dropdown>
            {sort && (
              <Dropdown
                name={'sortDirection'}
                control={control}
                label={"Тип сортировки"}
                className={"ml-10"}
                displayEmpty={true}
                startAdornment={<InputAdornment position={"start"}/>}
                error={!!errors.sortDirection}
                helperText={errors?.sortDirection?.message}
              >
                <MenuItem value={''}>Выберите...</MenuItem>
                {SortDirections.map((item, index) =>
                  <MenuItem value={item.query} key={index}>{item.label}</MenuItem>
                )}
              </Dropdown>
            )}
          </Box>
          <Dropdown
            name={'manufacturerId'}
            control={control}
            label={"Производитель"}
            displayEmpty={true}
            startAdornment={<InputAdornment position={"start"}/>}
            error={!!errors.manufacturerId}
            helperText={errors?.manufacturerId?.message}
          >
            <MenuItem value={''}>Выберите...</MenuItem>
            {manufacturers.map((manufacturer, index) =>
              <MenuItem value={manufacturer.id} key={index}>{manufacturer.name}</MenuItem>
            )}
          </Dropdown>
          <Input
            {...register('article')}
            label={'Артикул'}
            placeholder={'Введите артикул'}
            className={"mb-10"}
            inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
            error={!!errors.article}
            helperText={errors?.article?.message}
          />
          <Box className="d-flex wp-100 mb-10">
            <Input
              {...register('purchasePriceFrom')}
              label={'Закупочная цена от'}
              placeholder={'Введите закупочную цену от'}
              className={"mr-10"}
              inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
              error={!!errors.purchasePriceFrom}
              helperText={errors?.purchasePriceFrom?.message}
            />
            <Input
              {...register('purchasePriceTo')}
              label={'Закупочная цена до'}
              placeholder={'Введите закупочную цену до'}
              inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
              error={!!errors.purchasePriceTo}
              helperText={errors?.purchasePriceTo?.message}
            />
          </Box>
          <Box className="d-flex wp-100 mb-10">
            <Input
              {...register('retailPriceFrom')}
              label={'Розничная цена от'}
              placeholder={'Введите розничную цену от'}
              className={"mr-10"}
              inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
              error={!!errors.retailPriceFrom}
              helperText={errors?.retailPriceFrom?.message}
            />
            <Input
              {...register('retailPriceTo')}
              label={'Розничная цена до'}
              placeholder={'Введите розничную цену до'}
              inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
              error={!!errors.retailPriceTo}
              helperText={errors?.retailPriceTo?.message}
            />
          </Box>
          <Box className="d-flex wp-100 mb-10">
            <Input
              {...register('availabilityFrom')}
              label={'Наличие от'}
              placeholder={'Введите наличие от'}
              className={"mr-10"}
              inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
              error={!!errors.availabilityFrom}
              helperText={errors?.availabilityFrom?.message}
            />
            <Input
              {...register('availabilityTo')}
              label={'Наличие до'}
              placeholder={'Введите наличие до'}
              inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
              error={!!errors.availabilityFrom}
              helperText={errors?.availabilityFrom?.message}
            />
          </Box>
          <Stack spacing={1} direction={"row"} alignItems={"center"} justifyContent={"spare-between"}
                 className={"mb-10 wp-100"}>
            <Dropdown
              name={'makeId'}
              control={control}
              label={"Марка"}
              displayEmpty={true}
              startAdornment={<InputAdornment position={"start"}/>}
              error={!!errors.makeId}
              helperText={errors?.makeId?.message}
            >
              <MenuItem value={''}>Выберите...</MenuItem>
              {makes.map((make, index) =>
                <MenuItem value={make.id} key={index}>{make.name}</MenuItem>
              )}
            </Dropdown>
            {(makeId && models.length > 0) && (
              <Dropdown
                name={'modelId'}
                control={control}
                label={"Модель"}
                displayEmpty={true}
                startAdornment={<InputAdornment position={"start"}/>}
                error={!!errors.modelId}
                helperText={errors?.modelId?.message}
              >
                <MenuItem value={''}>Выберите...</MenuItem>
                {models.map((model, index) =>
                  <MenuItem value={model.id} key={index}>{model.name}</MenuItem>
                )}
              </Dropdown>
            )}
            {(modelId && generations.length > 0) && (
              <Dropdown
                name={'generationId'}
                control={control}
                label={"Поколение"}
                displayEmpty={true}
                startAdornment={<InputAdornment position={"start"}/>}
                error={!!errors.generationId}
                helperText={errors?.generationId?.message}
              >
                <MenuItem value={''}>Выберите...</MenuItem>
                {generations.map((generation, index) =>
                  <MenuItem value={generation.id} key={index}>{generation.name}</MenuItem>
                )}
              </Dropdown>
            )}
          </Stack>
          <Stack spacing={1} direction={"row"} alignItems={"center"} justifyContent={"spare-between"}
                 className={"mb-10 wp-100"}>
            <Dropdown
              name={'categoryId'}
              control={control}
              label={"Категория"}
              displayEmpty={true}
              startAdornment={<InputAdornment position={"start"}/>}
              error={!!errors.categoryId}
              helperText={errors?.categoryId?.message}
            >
              <MenuItem value={''}>Выберите...</MenuItem>
              {categories.map((category, index) =>
                <MenuItem value={category.id} key={index}>{category.name}</MenuItem>
              )}
            </Dropdown>
            {(categoryId && subcategories.length > 0) && (
              <Dropdown
                name={'subcategoryId'}
                control={control}
                label={"Подкатегория"}
                displayEmpty={true}
                startAdornment={<InputAdornment position={"start"}/>}
                error={!!errors.subcategoryId}
                helperText={errors?.subcategoryId?.message}
              >
                <MenuItem value={''}>Выберите...</MenuItem>
                {subcategories.map((subcategory, index) =>
                  <MenuItem value={subcategory.id} key={index}>{subcategory.name}</MenuItem>
                )}
              </Dropdown>
            )}
            {(subcategoryId && groups.length > 0) && (
              <Dropdown
                name={'groupId'}
                control={control}
                label={"Группа"}
                displayEmpty={true}
                startAdornment={<InputAdornment position={"start"}/>}
                error={!!errors.groupId}
                helperText={errors?.groupId?.message}
              >
                <MenuItem value={''}>Выберите...</MenuItem>
                {groups.map((group, index) =>
                  <MenuItem value={group.id} key={index}>{group.name}</MenuItem>
                )}
              </Dropdown>
            )}
          </Stack>
        </Form>
      </DialogContent>
      <DialogActions>
        <Button form={"filter-form"} onClick={onReset} color={"error"}>Очистить</Button>
        <Button form={"filter-form"} type={"submit"}>Применить</Button>
      </DialogActions>
    </Dialog>
  );
};
