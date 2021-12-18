import React, {ChangeEvent} from 'react';
import {useSnackbar} from "notistack";
import {useTypedDispatch, useTypedSelector} from "redux/hooks";
import {setGenerations, setModels} from "redux/slices/vehiclesSlice";
import {useQuery} from "core/hooks/useQuery";
import {useFieldArray, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {StoreSchema} from "schemas/store";
import {ImageService} from "service/ImageService";
import {getAxiosErrorData} from "core/axios";
import {SnackbarErrorOptions, SnackbarSuccessOptions} from "core/snackbar/snackbar-options";
import {ProcessStore, StoreType, StoreTypes} from "types/stores/store";
import {StoreService} from "service/stores/StoreService";
import {
  Box,
  Button, ButtonGroup,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment, MenuItem,
  Stack,
  Typography
} from "@mui/material";
import {
  AddOutlined,
  BackupOutlined,
  CloseOutlined, DehazeOutlined,
  DeleteOutlined,
  DirectionsCarOutlined,
  FeaturedPlayListOutlined,
  InfoOutlined,
  MiscellaneousServicesOutlined,
  SaveOutlined,
  Store as StoreIcon,
  TouchApp,
  TouchAppOutlined,
  UndoOutlined
} from "@mui/icons-material";
import clsx from "clsx";
import styles from "components/parts/ProcessSparePartDialog/ProcessSparePartDialog.module.scss";
import NextImage from "next/image";
import {getStoreImageUrl} from "utils/functions/getStoreImageUrl";
import {LoadingButton} from "@mui/lab";
import {Form} from "components/common/Form";
import {Input} from "components/common/Input";
import {Dropdown} from "components/common/Dropdown";
import {Characteristic, ProcessSparePart, SparePart} from "types/spareparts/sparePart";
import {selectManufacturers} from "redux/slices/manufacturersSlice";
import {getGenerations, getModels, selectGenerations, selectMakes, selectModels} from "redux/slices/vehiclesSlice";
import {
  getGroups,
  getSubcategories,
  selectCategories,
  selectGroups,
  selectSubcategories,
  setGroups,
  setSubcategories
} from "redux/slices/catalogsSlice";
import {selectModifications} from "redux/slices/modificationsSlice";
import {Model} from "types/spareparts/vehicle/model";
import {Make} from "types/spareparts/vehicle/make";
import {Category} from "types/spareparts/catalog/category";
import {Subcategory} from "types/spareparts/catalog/subcategory";
import {Modification} from "types/spareparts/modification";
import {SelectModificationDialog} from "components/parts/ProcessSparePartDialog/SelectModificationDialog";
import {getSparePartImageUrl} from "utils/functions/getSparePartImageUrl";
import {ProcessSparePartSchema} from "schemas/sparePart";
import {SparePartService} from "service/spareparts/SparePartService";
import {getSpareParts} from "redux/slices/sparePartsSlice";
import {Generation} from "types/spareparts/vehicle/generation";
import {Group} from "types/spareparts/catalog/group";
import {Image} from "types/image";
import {getCart} from "redux/slices/usersSlice";
import {PartsSettingsDialog} from "components/parts/settings/PartsSettingsDialog";

interface ProcessSparePartDialogProps {
  open: boolean;
  onClose: () => void;
  sparePart?: SparePart;
}

interface ProcessSparePartDialogFormData {
  name: string;
  manufacturerId: number;
  article: string;
  purchasePrice: number;
  retailPrice: number;
  makeId: number;
  modelId: number;
  generationId: number;
  categoryId: number;
  subcategoryId: number;
  groupId: number;
  description: string;
  characteristics: Characteristic[];
  image: Image;
}

export const ProcessSparePartDialog: React.FC<ProcessSparePartDialogProps> = ({open, onClose, sparePart}) => {
  const [isImageUploading, setIsImageUploading] = React.useState(false)
  const [selectModificationDialogOpened, setSelectModificationDialogOpened] = React.useState(false);
  const [partsSettingsDialogOpened, setPartsSettingsDialogOpened] = React.useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const {values} = useQuery();
  const dispatch = useTypedDispatch();
  const {register, handleSubmit, control, watch, formState: {errors, isSubmitting}, setValue, reset} = useForm({
    mode: "onChange",
    defaultValues: {
      name: sparePart?.name ?? '',
      manufacturerId: sparePart?.manufacturer?.id ?? '',
      article: sparePart?.article ?? '',
      description: sparePart?.description ?? '',
      purchasePrice: sparePart?.purchasePrice ?? '',
      retailPrice: sparePart?.retailPrice ?? '',
      characteristics: sparePart?.characteristics ?? [],
      makeId: sparePart?.make?.id ?? '',
      hasModels: false,
      modelId: sparePart?.model?.id ?? '',
      hasGenerations: false,
      generationId: sparePart?.generation?.id ?? '',
      categoryId: sparePart?.category?.id ?? '',
      hasSubcategories: false,
      subcategoryId: sparePart?.subcategory?.id ?? '',
      hasGroups: false,
      groupId: sparePart?.group?.id ?? '',
      image: sparePart?.image ?? null
    },
    resolver: yupResolver(ProcessSparePartSchema)
  })
  const {fields, append, remove} = useFieldArray({
    control,
    name: "characteristics",
  });

  const characteristics = watch("characteristics");
  const controlledFields = fields.map((field, index) => {
    return {
      field,
      characteristic: characteristics[index]
    };
  });

  const image = watch("image");
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

  const manufacturers = useTypedSelector(selectManufacturers);
  const makes = useTypedSelector(selectMakes);
  const models = useTypedSelector(selectModels);
  const generations = useTypedSelector(selectGenerations);
  const categories = useTypedSelector(selectCategories);
  const subcategories = useTypedSelector(selectSubcategories);
  const groups = useTypedSelector(selectGroups);
  const modifications = useTypedSelector(selectModifications);

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

  const togglePartsSettingsDialog = () => {
    setPartsSettingsDialogOpened((prev) => !prev);
  }

  const onAddCharacteristic = (modification?: Modification) => {
    toggleSelectModificationDialog();
    if (modification) {
      append({
        modification,
        value: ''
      });
    }
  }

  const toggleSelectModificationDialog = () => {
    setSelectModificationDialogOpened((prev) => !prev);
  }

  const onDeleteCharacteristic = (index: number) => {
    remove(index);
  }

  const toggleUploadLoader = () => {
    setIsImageUploading((prev) => !prev);
  }

  const onImageChanged = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length) {
      toggleUploadLoader();

      const formData = new FormData();
      const file = files[0];
      formData.append("file", file, file.name);

      try {
        const image = await ImageService.upload(formData);
        setValue("image", image);
      } catch (err) {
        enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
      }

      toggleUploadLoader();
    }
  }

  const onSubmit = async (data: ProcessSparePartDialogFormData) => {
    const {manufacturerId, makeId, modelId, generationId, categoryId, subcategoryId, groupId, ...others} = data;

    const manufacturer = manufacturers.find(m => m.id === Number(manufacturerId));
    if (!manufacturer) {
      enqueueSnackbar('Не удалось найти производителя', SnackbarErrorOptions);
      return;
    }

    const make = makes.find(m => m.id === Number(makeId));
    if (!make) {
      enqueueSnackbar('Не удалось найти марку', SnackbarErrorOptions);
      return;
    }

    const model = models.find(m => m.id === Number(modelId));
    if (!model && models.length > 0) {
      enqueueSnackbar('Не удалось найти модель', SnackbarErrorOptions);
      return;
    }

    const generation = generations.find(g => g.id === Number(generationId));
    if (!generation && generations.length > 0) {
      enqueueSnackbar('Не удалось найти поколение', SnackbarErrorOptions);
      return;
    }

    const category = categories.find(c => c.id === Number(categoryId));
    if (!category) {
      enqueueSnackbar('Не удалось найти категорию', SnackbarErrorOptions);
      return;
    }

    const subcategory = subcategories.find(s => s.id === Number(subcategoryId));
    if (!subcategory && subcategories.length > 0) {
      enqueueSnackbar('Не удалось найти подкатегорию', SnackbarErrorOptions);
      return;
    }

    const group = groups.find(g => g.id === Number(groupId));
    if (!group && groups.length > 0) {
      enqueueSnackbar('Не удалось найти группу', SnackbarErrorOptions);
      return;
    }

    const process: ProcessSparePart = {
      ...others,
      manufacturer,
      make,
      model: model as Model,
      generation: generation as Generation,
      category,
      subcategory: subcategory as Subcategory,
      group: group as Group
    }

    try {
      if (sparePart) {
        await SparePartService.update(sparePart.id, process);
        enqueueSnackbar('Запчасть успешно обновлена', SnackbarSuccessOptions);
      }
      else {
        await SparePartService.add(process);
        enqueueSnackbar('Запчасть успешно сохранена', SnackbarSuccessOptions);
      }
      await dispatch(getSpareParts({query: values}));
      await dispatch(getCart());
      onCloseWrapper();
    }
    catch (err) {
      enqueueSnackbar(getAxiosErrorData(err), SnackbarErrorOptions);
    }
  }

  const onReset = () => {
    reset({
      name: '',
      manufacturerId: '',
      article: '',
      description: '',
      purchasePrice: '',
      retailPrice: '',
      characteristics: [],
      makeId: '',
      hasModels: false,
      modelId: '',
      hasGenerations: false,
      generationId: '',
      categoryId: '',
      hasSubcategories: false,
      subcategoryId: '',
      hasGroups: false,
      groupId: '',
      image: null
    })
  }

  const onDeleteImage = () => {
    setValue("image", null);
  }

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        disableEscapeKeyDown={isImageUploading || isSubmitting}
        onClose={onCloseWrapper}
      >
        <DialogTitle className="d-flex justify-between align-center">
          <Typography variant="h4" className="d-flex align-center">
            <MiscellaneousServicesOutlined fontSize="inherit" className="mr-10"/>
            {sparePart ? 'Редактирование запчасти' : 'Добавление запчасти'}
          </Typography>
          <IconButton
            onClick={onCloseWrapper}
            disabled={isImageUploading || isSubmitting}
            size={"small"}
          >
            <CloseOutlined htmlColor="#000000"/>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Form onSubmit={handleSubmit(onSubmit)} id="process-form" className={"wp-100"}>
            <Stack direction={"column"} spacing={1}>
              <Stack direction={"row"} spacing={2}>
                <Box className={clsx("d-flex flex-column justify-center")}>
                  <Box className={clsx("d-flex justify-center", styles.imageWrapper)}>
                    <NextImage src={getSparePartImageUrl(image)} alt={'Запчасть'} layout="fill" objectFit="cover"/>
                  </Box>
                  <Stack direction={"row"} spacing={1} className="justify-center mt-10">
                    <input accept="image/*" type={"file"} id="file-input" hidden onChange={onImageChanged}/>
                    <label htmlFor="file-input">
                      <LoadingButton
                        component="span"
                        variant="outlined"
                        startIcon={<BackupOutlined/>}
                        size={"small"}
                        loading={isImageUploading}
                        loadingPosition={"start"}
                        disabled={isSubmitting}
                      >Загрузить</LoadingButton>
                    </label>
                    {image && (
                      <Button
                        component="span"
                        color={"error"}
                        disabled={isImageUploading || isSubmitting}
                        onClick={onDeleteImage}
                        variant={"outlined"}
                        startIcon={<DeleteOutlined/>}
                        size={"small"}
                      >
                        Удалить
                      </Button>
                    )}
                  </Stack>
                </Box>
                <Box className={"wp-100"}>
                  <Stack direction={"row"} spacing={2} className={"wp-100"}>
                    <Stack spacing={2} direction={"column"} className={"wp-100"}>
                      <Stack spacing={1} direction={"row"} alignItems={"center"}>
                        <InfoOutlined fontSize="inherit"/>
                        <Typography variant="h4">Информация</Typography>
                      </Stack>
                      <Stack spacing={1} className={"wp-100"}>
                        <Input
                          {...register('name')}
                          label={'Наименование'}
                          placeholder={'Введите наименование'}
                          inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
                          error={!!errors.name}
                          helperText={errors?.name?.message}
                        />
                        <Dropdown
                          name={'manufacturerId'}
                          control={control}
                          label={"Производитель"}
                          defaultValue={''}
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
                          inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
                          error={!!errors.article}
                          helperText={errors?.article?.message}
                        />
                        <Input
                          {...register('purchasePrice')}
                          label={'Закупочная цена'}
                          placeholder={'Введите закупочную цену'}
                          inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
                          error={!!errors.purchasePrice}
                          helperText={errors?.purchasePrice?.message}
                        />
                        <Input
                          {...register('retailPrice')}
                          label={'Розничная цена'}
                          placeholder={'Введите розничную цену'}
                          inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
                          error={!!errors.retailPrice}
                          helperText={errors?.retailPrice?.message}
                        />
                      </Stack>
                    </Stack>
                    <Stack spacing={2} direction={"column"} className={"wp-100"}>
                      <Stack spacing={1} direction={"row"} alignItems={"center"}>
                        <DirectionsCarOutlined fontSize="inherit"/>
                        <Typography variant="h4">Автомобиль</Typography>
                      </Stack>
                      <Stack spacing={1} className={"wp-100"}>
                        <Dropdown
                          name={'makeId'}
                          control={control}
                          label={"Марка"}
                          defaultValue={''}
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
                            defaultValue={''}
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
                            defaultValue={''}
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
                    </Stack>
                    <Stack spacing={2} direction={"column"} className={"wp-100"}>
                      <Stack spacing={1} direction={"row"} alignItems={"center"}>
                        <FeaturedPlayListOutlined fontSize={"inherit"}/>
                        <Typography variant="h4">Каталог</Typography>
                      </Stack>
                      <Stack spacing={1} className={"wp-100"}>
                        <Dropdown
                          name={'categoryId'}
                          control={control}
                          label={"Категория"}
                          defaultValue={''}
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
                            defaultValue={''}
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
                            defaultValue={''}
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
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Box className={clsx("wp-50 p-10", styles.description)}>
                  <Input
                    {...register('description')}
                    label={'Описание'}
                    placeholder={'Введите описание'}
                    inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
                    error={!!errors.description}
                    helperText={errors?.description?.message}
                    multiline={true}
                    minRows={10}
                    maxRows={99}
                  />
                </Box>
                <Stack spacing={2} direction={"column"} className={"wp-50"}>
                  <Stack direction={"row"} spacing={1} justifyContent={"space-between"} alignItems={"center"}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                      <DehazeOutlined fontSize={"inherit"}/>
                      <Typography variant={'h4'}>Характеристики</Typography>
                    </Stack>
                    <ButtonGroup
                      color={"primary"}
                      variant={"outlined"}
                      size={"small"}
                    >
                      <Button
                        startIcon={<TouchAppOutlined/>}
                        disabled={modifications.length < characteristics.length || isSubmitting || isImageUploading}
                        onClick={toggleSelectModificationDialog}
                      >
                        Выбрать
                      </Button>
                      <Button
                        startIcon={<AddOutlined/>}
                        disabled={isSubmitting || isImageUploading}
                        onClick={togglePartsSettingsDialog}
                      >
                        Добавить
                      </Button>
                    </ButtonGroup>
                  </Stack>
                  <Stack direction={"column"} spacing={1} className={"wp-100"}>
                    {!controlledFields.length && (
                      <Stack direction={"row"} justifyContent={"center"}>
                        <Typography variant={"h5"}>Еще не выбрано ни одной модификации &#128577;</Typography>
                      </Stack>
                    )}
                    {controlledFields.map((item, index) => (
                      <Stack direction={"row"} spacing={1} className={"wp-100"} key={index}>
                        <Input
                          {...register(`characteristics.${index}.value`)}
                          label={item.characteristic?.modification?.name}
                          placeholder={`Введите значение для модификации: ${item.characteristic?.modification?.name}`}
                          inputProps={{startAdornment: <InputAdornment position={"start"}/>}}
                          error={!!errors?.characteristics?.at(index)?.value}
                          helperText={errors?.characteristics?.at(index)?.value?.message}
                        />
                        <IconButton
                          component={"span"}
                          size={"small"}
                          onClick={() => onDeleteCharacteristic(index)}
                        >
                          <DeleteOutlined/>
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Form>
        </DialogContent>
        <DialogActions>
          <ButtonGroup
            color={"primary"}
            variant={"outlined"}
            size={"small"}
            disabled={isImageUploading || isSubmitting}
          >
            <Button
              form={"process-form"}
              startIcon={<UndoOutlined/>}
              onClick={onReset}
            >Очистить</Button>
            <LoadingButton
              form={"process-form"}
              type={"submit"}
              startIcon={<SaveOutlined/>}
              loading={isSubmitting}
              loadingPosition={"start"}
            >Сохранить</LoadingButton>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
      {selectModificationDialogOpened && (
        <SelectModificationDialog
          open={selectModificationDialogOpened}
          onClose={onAddCharacteristic}
          selected={characteristics.map(c => c.modification)}
        />
      )}
      {partsSettingsDialogOpened && (
        <PartsSettingsDialog
          open={partsSettingsDialogOpened}
          onClose={togglePartsSettingsDialog}
        />
      )}
    </>
  );
};
