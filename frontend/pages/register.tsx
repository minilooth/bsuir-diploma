import React from 'react';
import {NextPage} from "next";
import {useSpringRef, useTransition} from "@react-spring/core";
import {animated} from "@react-spring/web";

import {MainContainer} from "components/common/MainContainer";
import {EmailStep} from "components/register/EmailStep";
import {CommonLayout} from "components/layouts/CommonLayout";
import {useTypedSelector} from "redux/hooks";
import {RegisterStep} from "types/register";
import {UsernameStep} from "components/register/UsernameStep";
import {ConfirmationMailStep} from 'components/register/ConfirmationMailStep';
import {selectStep} from "redux/slices/registerSlice";
import {withAuthServerSideProps} from "core/auth/withAuthServerSideProps";

const Register: NextPage = () => {
  const step = useTypedSelector(selectStep);
  const transRef = useSpringRef();
  const transitions = useTransition(step, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
  })

  React.useEffect(() => {
    transRef.start()
  }, [step, transRef])

  return (
    <CommonLayout title="Register">
      <MainContainer>
        {transitions((style, step) => {
          switch (step) {
            case RegisterStep.USERNAME:
              return (
                <animated.div style={style}>
                  <UsernameStep/>
                </animated.div>
              )
            case RegisterStep.EMAIL:
              return (
                <animated.div style={style}>
                  <EmailStep/>
                </animated.div>
              )
            case RegisterStep.CONFIRMATION_MAIL:
              return (
                <animated.div style={style}>
                 <ConfirmationMailStep/>
                </animated.div>
              )
          }
        })}
      </MainContainer>
    </CommonLayout>
  )
}

export const getServerSideProps = withAuthServerSideProps(null, {
  authorizationNeeded: false,
  canAccessAuthorized: false
})

export default Register;
