import {Manufacturer} from "types/spareparts/manufacturer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IncomingHttpHeaders} from "http";
import {ManufacturerService} from "service/spareparts/manufacturer/ManufacturerService";
import {RootState} from "redux/store";

interface ManufacturersSliceState {
  manufacturers: Manufacturer[];
}

const initialState: ManufacturersSliceState = {
  manufacturers: []
}

export const getManufacturers = createAsyncThunk(
  'manufacturers/getManufacturers',
  async (headers?: IncomingHttpHeaders) => {
    return await ManufacturerService.getAll(headers);
  }
)

const manufacturersSlice = createSlice({
  name: 'manufacturers',
  initialState,
  reducers: {
    setManufacturers: (state, action: PayloadAction<Manufacturer[]>) => {
      state.manufacturers = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getManufacturers.fulfilled, (state, action) => {
      state.manufacturers = action.payload;
    })
  }
})

export const {setManufacturers} = manufacturersSlice.actions;
export const manufacturersReducer = manufacturersSlice.reducer;

export const selectManufacturers = (state: RootState) => state.manufacturers.manufacturers;
