import {NextPage} from "next";

import {CommonLayout} from "components/layouts/CommonLayout";
import {MainContainer} from "components/common/MainContainer";
import {SuccessConfirmAccountCard as ConfirmAccountCard} from "components/register/SuccessConfirmAccountCard";
import {withAuthServerSideProps} from "core/auth/withAuthServerSideProps";
import {Axios} from "core/axios";
import {AccountRoutes} from "core/api";

const SuccessConfirmAccountCard: NextPage = () => {
  return (
    <CommonLayout title='Success Confirm'>
      <MainContainer>
        <ConfirmAccountCard/>
      </MainContainer>
    </CommonLayout>
  )
}

export const getServerSideProps = withAuthServerSideProps(async (ctx, user) => {
  const {query: {token}} = ctx;

  try {
    await Axios.get(AccountRoutes.CONFIRM_ACCOUNT, {params: {token}});
  }
  catch (err) {}

  return { props: {} }
}, {
  authorizationNeeded: false,
  canAccessAuthorized: false
})

export default SuccessConfirmAccountCard;
