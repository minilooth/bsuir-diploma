import {SnackbarMessage} from "notistack";
import {SnackbarErrorOptions, SnackbarSuccessOptions} from "core/snackbar/snackbar-options";
import {enqueueSnackbar} from "redux/slices/snackbar/index";

export const enqueueError = (message: SnackbarMessage) => {
  return enqueueSnackbar({message, options: SnackbarErrorOptions});
}

export const enqueueSuccess = (message: SnackbarMessage) => {
  return enqueueSnackbar({message, options: SnackbarSuccessOptions});
}
