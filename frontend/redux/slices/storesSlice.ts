import {Store, StoreFilter, StoreSort, StoreSortItems, StoreType, StoreTypes,} from "types/stores/store";
import {Address} from "types/stores/address";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IncomingHttpHeaders} from "http";
import {StoreService} from "service/stores/StoreService";
import {AddressService} from "service/stores/AddressService";
import {RootState} from "redux/store";
import {SortDirection, SortDirections} from "types/common/sort-direction";

export interface StoresSliceState {
  stores: Store[];
  pages: number;
  addresses: Address[];
}

const initialState: StoresSliceState = {
  stores: [],
  pages: 1,
  addresses: []
}

export const getStores = createAsyncThunk(
  'stores/getStores',
  async ({query, headers = {}}: any) => {
    const {search, page, addressId} = query;

    const sort = Object.keys(StoreSort).find(key => StoreSort[key as keyof typeof StoreSort] === StoreSortItems.find(i => i.query === query.sort)?.field);
    const sortDirection = Object.keys(SortDirection).find(key => SortDirection[key as keyof typeof SortDirection] === SortDirections.find(i => i.query === query.sortDirection)?.key);
    const type = Object.keys(StoreType).find(key => StoreType[key as keyof typeof StoreType] === StoreTypes.find(i => i.query === query.type)?.key);

    const filter: StoreFilter = {
      sort: sort as string,
      sortDirection: sortDirection as string,
      type: type as string,
      addressId,
      search,
      page
    };
    console.log(filter)
    return await StoreService.getAll(filter, headers);
  }
)

export const getAddresses = createAsyncThunk(
  'stores/getAddresses',
  async (headers?: IncomingHttpHeaders) => {
    return await AddressService.getAll(headers);
  }
)

const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    setStores: (state, action: PayloadAction<Store[]>) => {
      state.stores = action.payload
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getStores.fulfilled, (state, action) => {
      state.stores = action.payload.stores;
      state.pages = action.payload.pages;
    })
    builder.addCase(getAddresses.fulfilled, (state, action) => {
      state.addresses = action.payload;
    })
  }
})

export const {setStores, setAddresses} = storesSlice.actions;
export const storesReducer = storesSlice.reducer;

export const selectStores = (state: RootState) => state.stores.stores;
export const selectPages = (state: RootState) => state.stores.pages;
export const selectAddresses = (state: RootState) => state.stores.addresses;
