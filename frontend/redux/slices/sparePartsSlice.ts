import {SparePart, SparePartFilter, SparePartSort} from "types/spareparts/sparePart";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SortDirection} from "types/common/sort-direction";
import {SparePartService} from "service/spareparts/SparePartService";
import {RootState} from "redux/store";
import {Manufacturer} from "types/spareparts/manufacturer";
import {Make} from "types/spareparts/vehicle/make";
import {Model} from "types/spareparts/vehicle/model";
import {Generation} from "types/spareparts/vehicle/generation";
import {Category} from "types/spareparts/catalog/category";
import {Subcategory} from "types/spareparts/catalog/subcategory";
import {Group} from "types/spareparts/catalog/group";
import {IncomingHttpHeaders} from "http";
import {ManufacturerService} from "service/spareparts/manufacturer/ManufacturerService";
import {MakeService} from "service/spareparts/vehicle/MakeService";
import {ModelService} from "service/spareparts/vehicle/ModelService";
import {GenerationService} from "service/spareparts/vehicle/GenerationService";
import {CategoryService} from "service/spareparts/catalog/CategoryService";
import {SubcategoryService} from "service/spareparts/catalog/SubcategoryService";
import {GroupService} from "service/spareparts/catalog/GroupService";
import {ParsedUrlQuery} from "querystring";

interface SparePartsFilterState {
  manufacturers: Manufacturer[];
  makes: Make[],
  models: Model[],
  generations: Generation[],
  categories: Category[],
  subcategories: Subcategory[];
  groups: Group[]
}

interface SparePartsSliceState {
  spareParts: SparePart[];
  pages: number;
  filter: SparePartsFilterState;
}

const filterInitialState: SparePartsFilterState = {
  manufacturers: [],
  makes: [],
  models: [],
  generations: [],
  categories: [],
  subcategories: [],
  groups: []
}

const initialState: SparePartsSliceState = {
  spareParts: [],
  pages: 1,
  filter: filterInitialState
}

export const getSpareParts = createAsyncThunk(
  'spareParts/getSpareParts',
  async ({query, headers = {}}: {query: ParsedUrlQuery, headers?: IncomingHttpHeaders}, thunkAPI) => {
    const {search, page, manufacturerId, article, description, purchasePriceFrom, purchasePriceTo, retailPriceFrom,
           retailPriceTo, availabilityFrom, availabilityTo, makeId, modelId, generationId, categoryId, subcategoryId,
           groupId} = query;
    const sort = SparePartSort[query.sort as keyof typeof SparePartSort];
    const sortDirection = SortDirection[query.sortDirection as keyof typeof SortDirection];

    const filter: SparePartFilter = {
      sort,
      sortDirection,
      manufacturerId: Number(manufacturerId as string),
      article: article as string,
      description: description as string,
      purchasePriceFrom: Number(purchasePriceFrom as string),
      purchasePriceTo: Number(purchasePriceTo as string),
      retailPriceFrom: Number(retailPriceFrom as string),
      retailPriceTo: Number(retailPriceTo as string),
      availabilityFrom: Number(availabilityFrom as string),
      availabilityTo: Number(availabilityTo as string),
      makeId: Number(makeId as string),
      modelId: Number(modelId as string),
      generationId: Number(generationId as string),
      categoryId: Number(categoryId as string),
      subcategoryId: Number(subcategoryId as string),
      groupId: Number(groupId as string),
      search: search as string,
      page: Number(page as string)
    };

    thunkAPI.dispatch(getFilterManufacturers(headers));
    thunkAPI.dispatch(getFilterMakes(headers));

    if (makeId) {
      thunkAPI.dispatch(getFilterModels({makeId: Number(makeId as string), headers}));
    }

    if (modelId) {
      thunkAPI.dispatch(getFilterGenerations({modelId, headers}));
    }

    thunkAPI.dispatch(getFilterCategories(headers));

    if (categoryId) {
      thunkAPI.dispatch(getFilterSubcategories({categoryId, headers}));
    }

    if (subcategoryId) {
      thunkAPI.dispatch(getFilterGroups({subcategoryId, headers}));
    }

    return await SparePartService.getAll(filter, headers);
  }
)

export const getFilterManufacturers = createAsyncThunk(
  'spareParts/filter/getManufacturers',
  async (headers: IncomingHttpHeaders) => {
    return await ManufacturerService.getAll(headers);
  }
)

export const getFilterMakes = createAsyncThunk(
  'spareParts/filter/getMakes',
  async (headers: IncomingHttpHeaders) => {
    return await MakeService.getAll(headers);
  }
)

export const getFilterModels = createAsyncThunk(
  'spareParts/filter/getModels',
  async ({makeId, headers}: {makeId: number, headers: IncomingHttpHeaders}) => {
    return await ModelService.getAll(makeId, headers);
  }
)

export const getFilterGenerations = createAsyncThunk(
  'spareParts/filter/getGenerations',
  async ({modelId, headers}: any) => {
    return await GenerationService.getAll(modelId, headers);
  }
)

export const getFilterCategories = createAsyncThunk(
  'spareParts/filter/getCategories',
  async (headers: IncomingHttpHeaders) => {
    return await CategoryService.getAll(headers);
  }
)

export const getFilterSubcategories = createAsyncThunk(
  'spareParts/filter/getSubcategories',
  async ({categoryId, headers}: any) => {
    return await SubcategoryService.getAll(categoryId, headers);
  }
)

export const getFilterGroups = createAsyncThunk(
  'spareParts/filter/getGroup',
  async ({subcategoryId, headers}: any) => {
    return await GroupService.getAll(subcategoryId, headers);
  }
)

const sparePartsSlice = createSlice({
  name: 'spareParts',
  initialState,
  reducers: {
    setSpareParts: (state, action: PayloadAction<SparePart[]>) => {
      state.spareParts = action.payload
    },
    setFilterManufacturers: (state, action: PayloadAction<Manufacturer[]>) => {
      state.filter.manufacturers = action.payload;
    },
    setFilterMakes: (state, action: PayloadAction<Make[]>) => {
      state.filter.makes = action.payload;
    },
    setFilterModels: (state, action: PayloadAction<Model[]>) => {
      state.filter.models = action.payload;
    },
    setFilterGenerations: (state, action: PayloadAction<Generation[]>) => {
      state.filter.generations = action.payload;
    },
    setFilterCategories: (state, action: PayloadAction<Category[]>) => {
      state.filter.categories = action.payload;
    },
    setFilterSubcategories: (state, action: PayloadAction<Subcategory[]>) => {
      state.filter.subcategories = action.payload;
    },
    setFilterGroups: (state, action: PayloadAction<Group[]>) => {
      state.filter.groups = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSpareParts.fulfilled, (state, action) => {
      state.spareParts = action.payload.spareParts;
      state.pages = action.payload.pages;
    });
    builder.addCase(getFilterManufacturers.fulfilled, (state, action) => {
      state.filter.manufacturers = action.payload;
    });
    builder.addCase(getFilterMakes.fulfilled, (state, action) => {
      state.filter.makes = action.payload;
    });
    builder.addCase(getFilterModels.fulfilled, (state, action) => {
      state.filter.models = action.payload;
    });
    builder.addCase(getFilterGenerations.fulfilled, (state, action) => {
      state.filter.generations = action.payload;
    });
    builder.addCase(getFilterCategories.fulfilled, (state, action) => {
      state.filter.categories = action.payload;
    });
    builder.addCase(getFilterSubcategories.fulfilled, (state, action) => {
      state.filter.subcategories = action.payload;
    });
    builder.addCase(getFilterGroups.fulfilled, (state, action) => {
      state.filter.groups = action.payload;
    })
  }
})

export const {setSpareParts, setFilterCategories, setFilterGenerations, setFilterGroups, setFilterMakes,
  setFilterManufacturers, setFilterModels, setFilterSubcategories} = sparePartsSlice.actions;
export const sparePartsReducer = sparePartsSlice.reducer;

export const selectSpareParts = (state: RootState) => state.spareParts.spareParts;
export const selectPages = (state: RootState) => state.spareParts.pages;
export const selectFilterManufacturers = (state: RootState) => state.spareParts.filter.manufacturers;
export const selectFilterMakes = (state: RootState) => state.spareParts.filter.makes;
export const selectFilterModels = (state: RootState) => state.spareParts.filter.models;
export const selectFilterGenerations = (state: RootState) => state.spareParts.filter.generations;
export const selectFilterCategories = (state: RootState) => state.spareParts.filter.categories;
export const selectFilterGroups = (state: RootState) => state.spareParts.filter.groups;
export const selectFilterSubcategories = (state: RootState) => state.spareParts.filter.subcategories;
