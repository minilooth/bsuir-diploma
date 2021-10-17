import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  createReducer,
  ThunkAction
} from "@reduxjs/toolkit";

import {usersReducer} from "redux/slices/usersSlice";
import {registerReducer} from "redux/slices/registerSlice";
import {loginReducer} from "redux/slices/loginSlice";
import {createWrapper, HYDRATE} from "next-redux-wrapper";

const combinedReducers = combineReducers({
  users: usersReducer,
  register: registerReducer,
  login: loginReducer
})

const rootReducer = createReducer(combinedReducers(undefined, {type: ""}), (builder) => {
  builder
    .addCase(HYDRATE, (state, action: AnyAction) => {
      return {...state, ...action.payload};
      // if (state.users.initialized) {
      //   nextState.users.initialized = state.users.initialized;
      //   nextState.users.current = state.users.current;
      // }
      // return nextState;
    })
    .addDefaultCase(combinedReducers);
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const wrapper = createWrapper<AppStore>(makeStore, {debug: true});

