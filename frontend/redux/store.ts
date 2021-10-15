import {Action, combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit";

import {userReducer} from "redux/slices/userSlice";
import {registerReducer} from "redux/slices/registerSlice";
import {loginReducer} from "redux/slices/loginSlice";

const rootReducer = combineReducers({
  currentUser: userReducer,
  register: registerReducer,
  login: loginReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
