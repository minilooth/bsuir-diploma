import React from "react";
import {NextPage} from "next";
import {useSpringRef, useTransition} from "@react-spring/core";
import {animated} from "@react-spring/web";

import {MainContainer} from "components/common/MainContainer";
import {CommonLayout} from "components/layouts/CommonLayout";
import {RestorePasswordCard} from "components/login/restore-password/RestorePasswordCard";
import {useTypedSelector} from "redux/hooks";
import {selectRestorePasswordStep} from "redux/slices/loginSlice";
import {RestorePasswordStep} from "types/login";
import {PasswordDroppedCard} from "components/login/restore-password/PasswordDroppedCard";
import {withAuthServerSideProps} from "core/auth/withAuthServerSideProps";

const RestorePasswordPage: NextPage = () => {
  const step = useTypedSelector(selectRestorePasswordStep);
  const transRef = useSpringRef();
  const transitions = useTransition(step, {
    ref: transRef,
    keys: null,
    from: {opacity: 0, transform: 'translate3d(100%,0,0)'},
    enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
  })

  React.useEffect(() => {
    transRef.start()
  }, [step, transRef])

  return (
    <CommonLayout title="Restore Password">
      <MainContainer>
        {transitions((style, step) => {
          switch (step) {
            case RestorePasswordStep.RESTORE_PASSWORD:
              return (
                <animated.div style={style}>
                  <RestorePasswordCard/>
                </animated.div>
              )
            case RestorePasswordStep.PASSWORD_DROPPED:
              return (
                <animated.div style={style}>
                  <PasswordDroppedCard/>
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

export default RestorePasswordPage;
