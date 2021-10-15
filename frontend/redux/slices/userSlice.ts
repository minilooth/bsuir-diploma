import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {User} from "types/user";
import {RootState} from "redux/store";

interface UserSliceState {
  user: User | null,
  initialized: boolean;
}

const initialState: UserSliceState = {
  user: null,
  initialized: false
}

// const fetchMeByServer = createAsyncThunk<UserData, IncomingHttpHeaders>(
//   'user/fetchMeByServer',
//   async (headers: IncomingHttpHeaders) => {
//     const {data: me} = await axios.get(`${process.env.SERVER_API_URL}/api/auth/me`, {headers});
//     return me;
//   })


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    initialize: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.initialized = true;
    }
  },
  // extraReducers: {
  //   [fetchMeByServer.fulfilled.type]: (state, action) => {
  //     state.user = action.payload;
  //   }
  // }
})

export const {setUser, initialize} = userSlice.actions;
export const userReducer = userSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.currentUser.user;
export const selectInitialized = (state: RootState) => state.currentUser.initialized;
