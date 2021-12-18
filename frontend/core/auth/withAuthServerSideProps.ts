import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import nookies from 'nookies';

import {RoleEnum, User} from "types/user";
import {AuthRoutes} from "core/api";
import {AppRoutes} from "core/routes";
import {Axios} from "core/axios";
import {RootState} from "redux/store";
import {initialize, setCurrentUser} from 'redux/slices/usersSlice';
import {AnyAction, EnhancedStore} from "@reduxjs/toolkit";
import {enqueueError} from "redux/slices/snackbar/actions";
import { removeSnackbar } from 'redux/slices/snackbar';

type IncomingGSSP<P> = (ctx: GetServerSidePropsContext, user: User | null) => Promise<P>;

type WithAuthServerSidePropsResult = GetServerSidePropsResult<{ [key: string]: any }>;

type WithAuthServerSidePropsOptions = {
  authorizationNeeded?: boolean,
  authorities?: RoleEnum[],
  canAccessAuthorized?: boolean
};

export const withAuthServerSideProps = (
  incomingGSSP?: IncomingGSSP<WithAuthServerSidePropsResult> | null,
  options: WithAuthServerSidePropsOptions = {authorizationNeeded: false, authorities: [], canAccessAuthorized: true},
  store?: EnhancedStore<RootState, AnyAction, [any]>,
) => {
  return async (ctx: GetServerSidePropsContext): Promise<WithAuthServerSidePropsResult> => {
    const {data: isLoggedIn} = await Axios.get<boolean>(AuthRoutes.IS_LOGGED_IN, {headers: ctx.req.headers});
    const {token} = nookies.get(ctx);

    if (!isLoggedIn && options.authorizationNeeded) {
      if (token) {
        // const key = new Date().getTime() + Math.random();
        store?.dispatch(enqueueError('Session expired. Please log in'));
        // Remove message on server. Need to better solution
        // setTimeout(() => {
        //   store?.dispatch(removeSnackbar(key));
        // }, 3000);
      }
      store?.dispatch(setCurrentUser(null));
      return {
        redirect: {
          destination: AppRoutes.LOGIN,
          permanent: true,
        }
      }
    }

    if (isLoggedIn && options.canAccessAuthorized) {
      return {
        redirect: {
          destination: AppRoutes.HOME,
          permanent: true
        }
      }
    }

    const {data: user} = await Axios.get<User>(AuthRoutes.ME, {headers: ctx.req.headers});

    if (store && !store.getState().users.initialized) {
      store.dispatch(initialize(user));
    }

    if (options.authorizationNeeded && !options.authorities?.includes(user.roles[0].authority)) {
      // const key = new Date().getTime() + Math.random();
      store?.dispatch(enqueueError('You don\'t have permissions to access this page'));
      // Remove message on server. Need to better solution
      // setTimeout(() => {
      //   store?.dispatch(removeSnackbar(key));
      // }, 3000);
      return {
        redirect: {
          destination: AppRoutes.HOME,
          permanent: true
        }
      }
    }

    if (incomingGSSP) {
      const incomingGSSPResult = await incomingGSSP(ctx, user);

      if ('props' in incomingGSSPResult) {
        return {props: {...incomingGSSPResult.props, user}};
      }

      if ('redirect' in incomingGSSPResult) {
        return {redirect: {...incomingGSSPResult.redirect}};
      }

      if ('notFound' in incomingGSSPResult) {
        return {notFound: incomingGSSPResult.notFound};
      }
    }

    return {
      props: {
        user
      },
    }
  };
}
