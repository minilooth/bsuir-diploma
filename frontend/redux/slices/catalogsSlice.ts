import {Category} from "types/spareparts/catalog/category";
import {Subcategory} from "types/spareparts/catalog/subcategory";
import {Group} from "types/spareparts/catalog/group";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IncomingHttpHeaders} from "http";
import {CategoryService} from "service/spareparts/catalog/CategoryService";
import {SubcategoryService} from "service/spareparts/catalog/SubcategoryService";
import {GroupService} from "service/spareparts/catalog/GroupService";
import {RootState} from "redux/store";

export interface CatalogsSliceState {
  categories: Category[];
  subcategories: Subcategory[];
  groups: Group[];
}

const initialState: CatalogsSliceState = {
  categories: [],
  subcategories: [],
  groups: []
}

export const getCategories = createAsyncThunk(
  'catalogs/getCategories',
  async (headers?: IncomingHttpHeaders) => {
    return await CategoryService.getAll(headers);
  }
)

export const getSubcategories = createAsyncThunk(
  'catalogs/getSubcategories',
  async (id: number) => {
    return await SubcategoryService.getAll(id);
  }
)

export const getGroups = createAsyncThunk(
  'catalogs/getGroups',
  async (id: number) => {
    return await GroupService.getAll(id);
  }
)

const catalogsSlice = createSlice({
  name: 'catalogs',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setSubcategories: (state, action: PayloadAction<Subcategory[]>) => {
      state.subcategories = action.payload;
    },
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getSubcategories.fulfilled, (state, action) => {
      state.subcategories = action.payload;
    });
    builder.addCase(getGroups.fulfilled, (state, action) => {
      state.groups = action.payload
    })
  }
})

export const {setCategories, setSubcategories, setGroups} = catalogsSlice.actions;
export const catalogsReducer = catalogsSlice.reducer;

export const selectCategories = (state: RootState) => state.catalogs.categories;
export const selectSubcategories = (state: RootState) => state.catalogs.subcategories;
export const selectGroups = (state: RootState) => state.catalogs.groups;
