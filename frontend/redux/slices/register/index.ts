import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RegisterStep} from "types/register";
import {register, setEmail, setPhoneNumber, setUsername} from "redux/slices/register/actions";

export interface RegisterSliceState {
  step: RegisterStep;
  username: string;
  email: string;
  phoneNumber: string;
  firstname: string;
  lastname: string;
  middlename: string;
}

const initialState: RegisterSliceState = {
  step: RegisterStep.USERNAME,
  username: '',
  email: '',
  phoneNumber: '',
  firstname: '',
  lastname: '',
  middlename: ''
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    cancel: (state) => {
      state.step = RegisterStep.USERNAME;
      state.username = '';
      state.email = '';
      state.phoneNumber = '';
      state.firstname = '';
      state.lastname = '';
      state.middlename = '';
    },
    back: (state) => {
      state.step = state.step - 1;
    },
    setInformation: (state, action: PayloadAction<{firstname: string, lastname: string, middlename: string}>) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.middlename = action.payload.middlename;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state) => {
      state.step = RegisterStep.SUCCESS;
      state.username = '';
      state.email = '';
      state.phoneNumber = '';
      state.firstname = '';
      state.lastname = '';
      state.middlename = '';
    });
    builder.addCase(setUsername.fulfilled, (state, action) => {
      state.step = RegisterStep.EMAIL;
      state.username = action.payload;
    });
    builder.addCase(setEmail.fulfilled, (state, action) => {
      state.step = RegisterStep.PHONE_NUMBER;
      state.email = action.payload;
    });
    builder.addCase(setPhoneNumber.fulfilled, (state, action) => {
      state.step = RegisterStep.INFORMATION;
      state.phoneNumber = action.payload;
    })
  }
})

export const registerReducer = registerSlice.reducer;
export const {cancel, back, setInformation} = registerSlice.actions;

