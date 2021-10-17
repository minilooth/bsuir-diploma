import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {User, UserFilter, UserSort} from "types/user";
import {AppDispatch, RootState} from "redux/store";
import {HYDRATE} from "next-redux-wrapper";
import {Axios} from "core/axios";
import {AuthRoutes} from "core/api";
import {IncomingHttpHeaders} from "http";
import {RegisterStep} from "types/register";
import {register} from "redux/slices/registerSlice";
import {UserService} from "service/UserService";
import {ParsedUrlQuery} from "querystring";
import {QueryUtils} from "utils/QueryUtils";
import {SortDirection} from "types/common/sort-direction";

interface UsersSliceState {
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
    const sort = UserSort[query.sort as keyof typeof UserSort];
    const sortDirection = SortDirection[query.sortDirection as keyof typeof SortDirection];

    const filter: UserFilter = {
      sort,
      sortDirection,
      fullname,
      email,
      phoneNumber,
      registerDateFrom,
      registerDateTo,
      search,
      page
    };

    console.log()

    return await UserService.getAll(filter, headers);
  })

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.current = action.payload;
    },
    initialize: (state, action: PayloadAction<User>) => {
      state.current = action.payload;
      state.initialized = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.users = action.payload;
    })
  }
})

export const {setCurrentUser, initialize} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.users.current;
export const selectInitialized = (state: RootState) => state.users.initialized;
export const selectUsers = (state: RootState) => state.users.users;
export const selectPages = (state: RootState) => state.users.pages;
