import React from "react";
import {NextPage} from "next";
import {useSpringRef, useTransition} from "@react-spring/core";
import {animated} from "@react-spring/web";

import {MainContainer} from "components/common/MainContainer";
import {LoginCard} from "components/login/LoginCard";
import {CommonLayout} from "components/layouts/CommonLayout";
import {withAuthServerSideProps} from "core/auth/withAuthServerSideProps";
import {wrapper} from "redux/store";

const Login: NextPage = () => {
  const transRef = useSpringRef();
  const transitions = useTransition(null, {
    ref: transRef,
    keys: null,
    from: {opacity: 0, transform: 'translate3d(100%,0,0)'},
    enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
  })

  React.useEffect(() => {
    transRef.start();
  }, [transRef])

  return (
    <CommonLayout title="Login">
      <MainContainer>
        {transitions((style) => {
          return (
            <animated.div style={style}>
              <LoginCard/>
            </animated.div>
          )
        })}
      </MainContainer>
    </CommonLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => withAuthServerSideProps(null, {
  authorizationNeeded: false,
  canAccessAuthorized: false
}, store))

export default Login;

