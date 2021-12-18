import {Modification} from "types/spareparts/modification";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IncomingHttpHeaders} from "http";
import {ModificationService} from "service/spareparts/modification/ModificationService";
import {RootState} from "redux/store";

export interface ModificationsSliceState {
  modifications: Modification[];
}

const initialState: ModificationsSliceState = {
  modifications: []
}

export const getModifications = createAsyncThunk(
  'modifications/getModifications',
  async (headers?: IncomingHttpHeaders) => {
    return await ModificationService.getAll(headers);
  }
)

const modificationsSlice = createSlice({
  name: 'modifications',
  initialState,
  reducers: {
    setModifications: (state, action: PayloadAction<Modification[]>) => {
      state.modifications = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getModifications.fulfilled, (state, action) => {
      state.modifications = action.payload;
    })
  }
})

export const {setModifications} = modificationsSlice.actions;
export const modificationsReducer = modificationsSlice.reducer;

export const selectModifications = (state: RootState) => state.modifications.modifications;

