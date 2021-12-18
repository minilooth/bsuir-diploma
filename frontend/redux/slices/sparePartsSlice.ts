import {SparePart, SparePartFilter, SparePartSort, SparePartSortItems} from "types/spareparts/sparePart";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SortDirection, SortDirections} from "types/common/sort-direction";
import {SparePartService} from "service/spareparts/SparePartService";
import {RootState} from "redux/store";
import {IncomingHttpHeaders} from "http";
import {ParsedUrlQuery} from "querystring";

export interface SparePartsSliceState {
  spareParts: SparePart[];
  pages: number;
}

const initialState: SparePartsSliceState = {
  spareParts: [],
  pages: 1,
}

export const getSpareParts = createAsyncThunk(
  'spareParts/getSpareParts',
  async ({query, headers = {}}: any, thunkAPI) => {
    const {search, page, manufacturerId, article, purchasePriceFrom, purchasePriceTo, retailPriceFrom,
           retailPriceTo, availabilityFrom, availabilityTo, makeId, modelId, generationId, categoryId, subcategoryId,
           groupId} = query;
    const sort = Object.keys(SparePartSort).find(key => SparePartSort[key as keyof typeof SparePartSort] === SparePartSortItems.find(i => i.query === query.sort)?.field);
    const sortDirection = Object.keys(SortDirection).find(key => SortDirection[key as keyof typeof SortDirection] === SortDirections.find(i => i.query === query.sortDirection)?.key);

    const filter: SparePartFilter = {
      sort: sort as string,
      sortDirection: sortDirection as string,
      manufacturerId: manufacturerId,
      article: article,
      purchasePriceFrom: purchasePriceFrom,
      purchasePriceTo: purchasePriceTo,
      retailPriceFrom: retailPriceFrom,
      retailPriceTo: retailPriceTo,
      availabilityFrom: availabilityFrom,
      availabilityTo: availabilityTo,
      makeId: makeId,
      modelId: modelId,
      generationId: generationId,
      categoryId: categoryId,
      subcategoryId: subcategoryId,
      groupId: groupId,
      search: search,
      page: page
    };
    console.log(filter);
    return await SparePartService.getAll(filter, headers);
  }
)

const sparePartsSlice = createSlice({
  name: 'spareParts',
  initialState,
  reducers: {
    setSpareParts: (state, action: PayloadAction<SparePart[]>) => {
      state.spareParts = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSpareParts.fulfilled, (state, action) => {
      state.spareParts = action.payload.spareParts;
      state.pages = action.payload.pages;
    });
    builder.addCase(getSpareParts.rejected, (state, action) => {
      console.log(action.payload);
    })
  }
})

export const {setSpareParts} = sparePartsSlice.actions;
export const sparePartsReducer = sparePartsSlice.reducer;

export const selectSpareParts = (state: RootState) => state.spareParts.spareParts;
export const selectPages = (state: RootState) => state.spareParts.pages;
