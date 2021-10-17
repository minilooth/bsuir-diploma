import React from 'react';
import type {AppProps} from 'next/app'
import {ThemeProvider} from "@mui/system";
import {SnackbarProvider} from "notistack";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import {theme} from "theme/theme"
import {wrapper} from "redux/store";
import {InitializeLayout} from "components/layouts/InitializeLayout";

import 'styles/globals.scss'

function MyApp(appProps: AppProps) {
  const {Component, pageProps} = appProps;
  const {user} = pageProps;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <InitializeLayout user={user}>
            <Component {...pageProps} />
          </InitializeLayout>
        </SnackbarProvider>
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default wrapper.withRedux(MyApp);
