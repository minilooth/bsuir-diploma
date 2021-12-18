import {createAsyncThunk} from "@reduxjs/toolkit";

import {AppDispatch, RootState} from "redux/store";
import {User} from "types/user";
import {AuthService} from "service/user/AuthService";
import {getAxiosErrorData} from "core/axios";
import {enqueueError} from "redux/slices/snackbar/actions";

export const register = createAsyncThunk<void, any, {state: RootState, dispatch: AppDispatch}>(
  'register/register',
  async ({firstname, lastname, middlename}: any, {dispatch, getState, rejectWithValue}) => {
    try {
      const {username, email, phoneNumber} = getState().register;
      const user = {
        firstname,
        lastname,
        middlename,
        username,
        email,
        phoneNumber
      } as User;
      await AuthService.register(user);
    }
    catch (err) {
      dispatch(enqueueError(getAxiosErrorData(err)));
      return rejectWithValue(getAxiosErrorData(err));
    }
  }
)

export const setUsername = createAsyncThunk<string, any, {state: RootState, dispatch: AppDispatch}>(
  'register/setUsername',
  async ({username}: {username: string}, {dispatch, rejectWithValue}) => {
    try {
      const isBusy = await AuthService.isUsernameBusy(username);
      if (isBusy) {
        dispatch(enqueueError('Пользователь с таким именем пользователя уже существует'));
        return rejectWithValue(isBusy);
      }
      else {
        return username;
      }
    } catch (err) {
      dispatch(enqueueError(getAxiosErrorData(err)));
      return rejectWithValue(getAxiosErrorData(err));
    }
  }
)

export const setEmail = createAsyncThunk<string, any, {state: RootState, dispatch: AppDispatch}>(
  'register/setEmail',
  async ({email}: {email: string}, {dispatch, rejectWithValue}) => {
    try {
      const isBusy = await AuthService.isEmailBusy(email);
      if (isBusy) {
        dispatch(enqueueError('Пользователь с таким e-mail уже существует'));
        return rejectWithValue(isBusy);
      }
      else {
        return email;
      }
    } catch (err) {
      dispatch(enqueueError(getAxiosErrorData(err)));
      return rejectWithValue(getAxiosErrorData(err));
    }
  }
)

export const setPhoneNumber = createAsyncThunk<string, any, {state: RootState, dispatch: AppDispatch}>(
  'register/setPhoneNumber',
  async ({phoneNumber}: {phoneNumber: string}, {dispatch, rejectWithValue}) => {
    try {
      const isBusy = await AuthService.isPhoneNumberBusy(phoneNumber);
      if (isBusy) {
        dispatch(enqueueError('Пользователь с таким номером телефона уже существует'));
        return rejectWithValue(isBusy);
      }
      else {
        return phoneNumber;
      }
    } catch (err) {
      dispatch(enqueueError(getAxiosErrorData(err)));
      return rejectWithValue(getAxiosErrorData(err));
    }
  }
)
