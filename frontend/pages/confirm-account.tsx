import {NextPage} from "next";

import {CommonLayout} from "components/layouts/CommonLayout";
import {MainContainer} from "components/common/MainContainer";
import {ConfirmCard} from "components/register/ConfirmCard";
import {withAuthServerSideProps} from "core/auth/withAuthServerSideProps";
import {Axios} from "core/axios";
import {AccountRoutes} from "core/api";
import {AppRoutes} from "core/routes";

const ConfirmAccountPage: NextPage = () => {
  return (
    <CommonLayout title='Success Confirm'>
      <MainContainer>
        <ConfirmCard/>
      </MainContainer>
    </CommonLayout>
  )
}

export const getServerSideProps = withAuthServerSideProps(async (ctx, user) => {
  const {query: {token}} = ctx;

  if (!token) {
    return {
      props: {
        redirect: {
          destination: AppRoutes.LOGIN,
          permanent: true
        }
      }
    }
  }

  try {
    await Axios.get(AccountRoutes.CONFIRM_ACCOUNT, {params: {token}});
  }
  catch (err) {}

  return { props: {} }
}, {
  authorizationNeeded: false,
  canAccessAuthorized: false
})

export default ConfirmAccountPage;
