import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import nookies from 'nookies';

import {User} from "types/user";
import {AuthRoutes} from "core/api";
import {AppRoutes} from "core/routes";
import {Axios} from "core/axios";
import {RootState} from "redux/store";
import {initialize} from 'redux/slices/usersSlice';
import {AnyAction, EnhancedStore} from "@reduxjs/toolkit";

type IncomingGSSP<P> = (ctx: GetServerSidePropsContext, user: User | null) => Promise<P>;

type WithAuthServerSidePropsResult = GetServerSidePropsResult<{ [key: string]: any }>;

type WithAuthServerSidePropsOptions = {
  authorizationNeeded?: boolean,
  canAccessAuthorized?: boolean
};

export const withAuthServerSideProps = (
  incomingGSSP?: IncomingGSSP<WithAuthServerSidePropsResult> | null,
  options: WithAuthServerSidePropsOptions = {authorizationNeeded: false, canAccessAuthorized: true},
  store?: EnhancedStore<RootState, AnyAction, [any]>,
) => {
  return async (ctx: GetServerSidePropsContext): Promise<WithAuthServerSidePropsResult> => {
    const {data: isLoggedIn} = await Axios.get<boolean>(AuthRoutes.IS_LOGGED_IN, {headers: ctx.req.headers});
    const {token} = nookies.get(ctx);

    if (!isLoggedIn && options.authorizationNeeded) {
      if (token) {
        return {
          redirect: {
            destination: AppRoutes.LOGIN + '?expired=true',
            permanent: true
          }
        }
      } else {
        return {
          redirect: {
            destination: AppRoutes.LOGIN,
            permanent: true
          }
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
