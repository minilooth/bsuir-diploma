import {RootState} from "redux/store";

export const selectStep = (state: RootState) => state.register.step;
export const selectUsername = (state: RootState) => state.register.username;
export const selectEmail = (state: RootState) => state.register.email;
export const selectPhoneNumber = (state: RootState) => state.register.phoneNumber;
export const selectFirstname = (state: RootState) => state.register.firstname;
export const selectLastname = (state: RootState) => state.register.lastname;
export const selectMiddlename = (state: RootState) => state.register.middlename;
