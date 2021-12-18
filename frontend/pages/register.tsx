import React from 'react';
import {NextPage} from "next";
import {useSpringRef, useTransition} from "@react-spring/core";
import {animated} from "@react-spring/web";

import {MainContainer} from "components/common/MainContainer";
import {EmailStep} from "components/register/steps/EmailStep";
import {CommonLayout} from "components/layouts/CommonLayout";
import {useTypedSelector} from "redux/hooks";
import {RegisterStep} from "types/register";
import {UsernameStep} from "components/register/steps/UsernameStep";
import {SuccessStep} from 'components/register/steps/SuccessStep';
import {withAuthServerSideProps} from "core/auth/withAuthServerSideProps";
import {PhoneNumberStep} from "components/register/steps/PhoneNumberStep";
import {InformationStep} from "components/register/steps/InformationStep";
import {selectStep} from "redux/slices/register/selectors";

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

  const getStepTitle = (step: RegisterStep) => {
    switch(step) {
      case RegisterStep.USERNAME:
        return 'Username';
      case RegisterStep.EMAIL:
        return 'E-mail';
      case RegisterStep.PHONE_NUMBER:
        return 'Phone Number';
      case RegisterStep.INFORMATION:
        return 'Information';
      case RegisterStep.SUCCESS:
        return 'Success';
    }
  }

  return (
    <CommonLayout title={`Register - ${getStepTitle(step)}`}>
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
            case RegisterStep.PHONE_NUMBER:
              return (
                <animated.div style={style}>
                  <PhoneNumberStep/>
                </animated.div>
              )
            case RegisterStep.INFORMATION:
              return (
                <animated.div style={style}>
                  <InformationStep/>
                </animated.div>
              )
            case RegisterStep.SUCCESS:
              return (
                <animated.div style={style}>
                  <SuccessStep/>
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
