import {Make} from "types/spareparts/vehicle/make";
import {Model} from "types/spareparts/vehicle/model";
import {Generation} from "types/spareparts/vehicle/generation";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "redux/store";
import {MakeService} from "service/spareparts/vehicle/MakeService";
import {IncomingHttpHeaders} from "http";
import {ModelService} from "service/spareparts/vehicle/ModelService";
import {GenerationService} from "service/spareparts/vehicle/GenerationService";

export interface VehiclesSliceState {
  makes: Make[];
  models: Model[];
  generations: Generation[];
}

const initialState: VehiclesSliceState = {
  makes: [],
  models: [],
  generations: []
}

export const getMakes = createAsyncThunk(
  'vehicles/getMakes',
  async (headers?: IncomingHttpHeaders) => {
    return await MakeService.getAll(headers);
  }
)

export const getModels = createAsyncThunk(
  'vehicles/getModels',
  async (id: number) => {
    return await ModelService.getAll(id);
  }
)

export const getGenerations = createAsyncThunk(
  'vehicles/getGenerations',
  async (id: number) => {
    return await GenerationService.getAll(id);
  }
)

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setMakes: (state, action: PayloadAction<Make[]>) => {
      state.makes = action.payload;
    },
    setModels: (state, action: PayloadAction<Model[]>) => {
      state.models = action.payload;
    },
    setGenerations: (state, action: PayloadAction<Generation[]>) => {
      state.generations = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMakes.fulfilled, (state, action) => {
      state.makes = action.payload;
    });
    builder.addCase(getModels.fulfilled, (state, action) => {
      state.models = action.payload;
    })
    builder.addCase(getGenerations.fulfilled, (state, action) => {
      state.generations = action.payload;
    })
  }
})

export const {setMakes, setModels, setGenerations} = vehiclesSlice.actions;
export const vehiclesReducer = vehiclesSlice.reducer;

export const selectMakes = (state: RootState) => state.vehicles.makes;
export const selectModels = (state: RootState) => state.vehicles.models;
export const selectGenerations = (state: RootState) => state.vehicles.generations;
