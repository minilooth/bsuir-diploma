import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {SortItems, User, UserFilter, UserSort} from "types/user";
import {RootState} from "redux/store";
import {UserService} from "service/UserService";
import {SortDirection, SortDirections} from "types/common/sort-direction";
import {Cart} from "types/cart";
import { CartService } from "service/cart/CartService";
import {StoreSort, StoreSortItems} from "types/stores/store";

export interface UsersSliceState {
  current: User | null,
  users: User[];
  pages: number;
  initialized: boolean;
}

const initialState: UsersSliceState = {
  current: null,
  users: [],
  pages: 1,
  initialized: false
}

export const getAll = createAsyncThunk(
  'users/getAll',
  async ({query, headers = {}}: any) => {
    const {fullname, email, phoneNumber, registerDateFrom, registerDateTo, page, search} = query;

    const sort = Object.keys(UserSort).find(key => UserSort[key as keyof typeof UserSort] === SortItems.find(i => i.query === query.sort)?.field);
    const sortDirection = Object.keys(SortDirection).find(key => SortDirection[key as keyof typeof SortDirection] === SortDirections.find(i => i.query === query.sortDirection)?.key);

    const filter: UserFilter = {
      sort: sort as string,
      sortDirection: sortDirection as string,
      fullname,
      email,
      phoneNumber,
      registerDateFrom,
      registerDateTo,
      search,
      page
    };
    return await UserService.getAll(filter, headers);
  })

export const getCart = createAsyncThunk(
  'users/getCart',
  async () => {
    return await CartService.get();
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.current = action.payload;
    },
    setCart: (state, action: PayloadAction<Cart>) => {
      if (state.current) {
        state.current.cart = action.payload;
      }
    },
    initialize: (state, action: PayloadAction<User>) => {
      state.current = action.payload;
      state.initialized = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.users = action.payload.users;
      state.pages = action.payload.pages;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      if (state.current) {
        state.current.cart = action.payload;
      }
    })
  }
})

export const {setCurrentUser, setCart, initialize} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.users.current;
export const selectInitialized = (state: RootState) => state.users.initialized;
export const selectUsers = (state: RootState) => state.users.users;
export const selectPages = (state: RootState) => state.users.pages;
export const selectCart = (state: RootState) => state.users.current?.cart;
export const selectAuthority = (state: RootState) => state.users.current?.roles[0];
