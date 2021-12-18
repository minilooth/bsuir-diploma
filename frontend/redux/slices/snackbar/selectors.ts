import {RootState} from "redux/store";

export const selectNotifications = (state: RootState) => state.snackbar.notifications;
export const selectRemoved = (state: RootState) => state.snackbar.removed;
