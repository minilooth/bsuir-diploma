import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RestorePasswordStep} from "types/login";
import {Axios} from "core/axios";
import {AuthRoutes} from "core/api";
import {AppDispatch, RootState} from "redux/store";

interface LoginSliceState {
  restorePasswordStep: RestorePasswordStep
}

const initialState: LoginSliceState = {
  restorePasswordStep: RestorePasswordStep.RESTORE_PASSWORD
}

export const restorePassword = createAsyncThunk<void, string, {state: RootState, dispatch: AppDispatch}>(
  'login/restorePassword',
  async (email: string) => {
    await Axios.post(AuthRoutes.RESTORE_PASSWORD, {email});
  })

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setRestorePasswordStep: (state, action: PayloadAction<RestorePasswordStep>) => {
      state.restorePasswordStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(restorePassword.fulfilled, (state) => {
      state.restorePasswordStep = RestorePasswordStep.PASSWORD_DROPPED;
    })
  }
})

export const {setRestorePasswordStep} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

export const selectRestorePasswordStep = (state: RootState) => state.login.restorePasswordStep;

