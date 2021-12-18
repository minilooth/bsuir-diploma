import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Notification} from "components/layouts/Notifier";
import {OptionsObject, SnackbarKey, SnackbarMessage} from "notistack";
import {WritableDraft} from "immer/dist/types/types-external";

export interface SnackbarSliceState {
  notifications: Notification[],
  removed: SnackbarKey[],
}

const initialState: SnackbarSliceState = {
  notifications: [],
  removed: []
}

export const enqueueSnackbar = createAction('snackbar/enqueue', ({message, options}: {message: SnackbarMessage, options?: OptionsObject}) => {
  const key = options && options.key;
  return {
    payload: {
      message,
      options,
      key: key || new Date().getTime() + Math.random()
    }
  }
})

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    closeSnackbar: (state, action: PayloadAction<{dismissAll: boolean, key: SnackbarKey}>) => {
      state.notifications = [...state.notifications.map((notification) => (
        (action.payload.dismissAll || notification.key === action.payload.key)
          ? {...notification, dismissed: true}
          : {...notification}
      ))]
    },
    removeSnackbar: (state, action: PayloadAction<SnackbarKey>) => {
      state.removed = [...state.removed, action.payload];
      state.notifications = [...state.notifications.filter((notification) => notification.key !== action.payload)]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(enqueueSnackbar, (state, action) => {
      state.notifications = [...state.notifications, action.payload as WritableDraft<Notification>];
    })
  }
})

export const snackbarReducer = snackbarSlice.reducer;
export const {removeSnackbar} = snackbarSlice.actions;
