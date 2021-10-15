import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RegisterStep} from "types/register";
import {Axios} from "core/axios";
import {AuthRoutes} from "core/api";
import {AppDispatch, RootState} from "redux/store";

interface RegisterSliceState {
  step: RegisterStep;
  username: string;
  email: string;
}

const initialState: RegisterSliceState = {
  step: RegisterStep.USERNAME,
  username: '',
  email: '',
}

export const register = createAsyncThunk<void, void, {state: RootState, dispatch: AppDispatch}>(
  'register/register',
  async (arg: void, thunkAPI) => {
    const state = thunkAPI.getState();
    const {username, email} = state.register;
    await Axios.post(AuthRoutes.REGISTER, {username, email});
  })

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<RegisterStep>) => {
      state.step = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state) => {
      state.step = RegisterStep.CONFIRMATION_MAIL;
      state.username = '';
      state.email = '';
    })
  }
})

export const {setStep, setUsername, setEmail} = registerSlice.actions;
export const registerReducer = registerSlice.reducer;

export const selectStep = (state: RootState) => state.register.step;
