import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  EnhancedStore, getDefaultMiddleware,
  ThunkAction
} from "@reduxjs/toolkit";
import {createWrapper, HYDRATE, MakeStore} from "next-redux-wrapper";
import * as _ from "lodash";

import {usersReducer, UsersSliceState} from "redux/slices/usersSlice";
import {loginReducer, LoginSliceState} from "redux/slices/loginSlice";
import {vehiclesReducer, VehiclesSliceState} from "redux/slices/vehiclesSlice";
import {catalogsReducer, CatalogsSliceState} from "redux/slices/catalogsSlice";
import {modificationsReducer, ModificationsSliceState} from "redux/slices/modificationsSlice";
import {manufacturersReducer, ManufacturersSliceState} from "redux/slices/manufacturersSlice";
import {storesReducer, StoresSliceState} from "redux/slices/storesSlice";
import {sparePartsReducer, SparePartsSliceState} from "redux/slices/sparePartsSlice";
import {registerReducer, RegisterSliceState} from "redux/slices/register";
import {snackbarReducer, SnackbarSliceState} from "redux/slices/snackbar";

interface State {
  users: UsersSliceState,
  register: RegisterSliceState,
  login: LoginSliceState,
  vehicles: VehiclesSliceState,
  catalogs: CatalogsSliceState,
  modifications: ModificationsSliceState,
  manufacturers: ManufacturersSliceState,
  stores: StoresSliceState,
  spareParts: SparePartsSliceState,
  snackbar: SnackbarSliceState
}

const rootReducer = (state: State | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      const nextState = {
        ...state,
        ...action.payload
      };
      if (state?.users.current && !action.payload.users.current) {
        nextState.users.current = state.users.current;
      }
      if (state && state?.snackbar.removed.length != action.payload.snackbar.removed.length) {
        nextState.snackbar.notifications = _.uniqBy([...state.snackbar.notifications, ...action.payload.snackbar.notifications], 'key');
        nextState.snackbar.removed = _.uniq([...state.snackbar.removed, ...action.payload.snackbar.removed]);
      }
      return nextState;
    default:
      const combineReducer = combineReducers({
          users: usersReducer,
          register: registerReducer,
          login: loginReducer,
          vehicles: vehiclesReducer,
          catalogs: catalogsReducer,
          modifications: modificationsReducer,
          manufacturers: manufacturersReducer,
          stores: storesReducer,
          spareParts: sparePartsReducer,
          snackbar: snackbarReducer
      })
      return combineReducer(state, action);
  }
}

const devMode = process.env.NODE_ENV === 'development';

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
  devTools: devMode
})

const setupStore = (context: any): EnhancedStore => store;

const makeStore: MakeStore<any> = (context) => setupStore(context);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const wrapper = createWrapper<AppStore>(makeStore, {debug: false});

