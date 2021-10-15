import React from 'react';
import type {AppProps} from 'next/app'
import {ThemeProvider} from "@mui/system";
import {SnackbarProvider} from "notistack";
import {Provider} from "react-redux";

import {theme} from "theme/theme"
import {store} from "redux/store";
import {InitializeLayout} from "components/layouts/InitializeLayout";

import 'styles/globals.scss'

function MyApp(appProps: AppProps) {
  const {Component, pageProps} = appProps;
  const {user} = pageProps;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <InitializeLayout user={user}>
            <Component {...pageProps} />
          </InitializeLayout>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp;
