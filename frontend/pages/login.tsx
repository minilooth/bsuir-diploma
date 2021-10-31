import React from "react";
import {NextPage} from "next";
import {useSpringRef, useTransition} from "@react-spring/core";
import {animated} from "@react-spring/web";
import {useRouter} from "next/router";
import {useSnackbar} from "notistack";

import {MainContainer} from "components/common/MainContainer";
import {LoginCard} from "components/login/LoginCard";
import {CommonLayout} from "components/layouts/CommonLayout";
import {withAuthServerSideProps} from "core/auth/withAuthServerSideProps";
import {SnackbarErrorOptions} from "core/snackbar/snackbar-options";

const Login: NextPage = () => {
  // const transRef = useSpringRef();
  // const transitions = useTransition(null, {
  //   ref: transRef,
  //   keys: null,
  //   from: {opacity: 0, transform: 'translate3d(100%,0,0)'},
  //   enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
  // })
  const router = useRouter();
  const {enqueueSnackbar} = useSnackbar();
  const {expired} = router.query;

  if (expired) {
    enqueueSnackbar('Session expired. Please log in', SnackbarErrorOptions);
  }

  // React.useEffect(() => {
  //   transRef.start()
  // }, [transRef])

  return (
    <CommonLayout title="Login">
      <MainContainer>
        {/*{transitions((style) => {*/}
        {/*  return (*/}
        {/*    <animated.div style={style}>*/}
        {/*      <LoginCard/>*/}
        {/*    </animated.div>*/}
        {/*  )*/}
        {/*})}*/}
        <LoginCard/>
      </MainContainer>
    </CommonLayout>
  )
}

export const getServerSideProps = withAuthServerSideProps(null, {
  authorizationNeeded: false,
  canAccessAuthorized: false
})

export default Login;

