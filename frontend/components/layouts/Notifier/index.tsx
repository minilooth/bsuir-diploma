import React from 'react';
import {OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar} from "notistack";

import {useTypedDispatch, useTypedSelector} from "redux/hooks";
import {selectNotifications, selectRemoved} from "redux/slices/snackbar/selectors";
import { removeSnackbar } from 'redux/slices/snackbar';

export interface Notification {
  message: SnackbarMessage,
  key: number,
  options: OptionsObject
  dismissed?: boolean;
}

export const Notifier: React.FC = ({children}) => {
  const dispatch = useTypedDispatch();
  const notifications = useTypedSelector(selectNotifications);
  const removed = useTypedSelector(selectRemoved);
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const [displayed, setDisplayed] = React.useState<SnackbarKey[]>([]);

  const storeDisplayed = (key: SnackbarKey) => {
    setDisplayed((prev) => {
      return [...prev, key]
    });
  }

  const removeDisplayed = (key: SnackbarKey) => {
    setDisplayed((prev) => {
      return [...prev.filter(k => k !== key)];
    })
  }

  React.useEffect(() => {
    notifications.forEach(({key, message, options = {}, dismissed = false}: Notification) => {
      if (removed.includes(key)) {
        return;
      }

      if (dismissed) {
        closeSnackbar(key);
        return;
      }

      if (displayed.includes(key)) {
        return;
      }

      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, snackbarKey) => {
          if (options.onClose) {
            options.onClose(event, reason, snackbarKey);
          }
        },
        onExited: (event, snackbarKey) => {
          dispatch(removeSnackbar(snackbarKey));
          removeDisplayed(snackbarKey)
        }
      })

      storeDisplayed(key);
    })
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch, displayed, removed]);

  return (
    <>{children}</>
  );
};
