import {NextPage} from "next";

import {MainContainer} from "components/common/MainContainer";
import {CommonLayout} from "components/layouts/CommonLayout";

const ServerError: NextPage = () => {
  return (
    <CommonLayout title={"Server Error"}>
      <MainContainer>
        Server Error
      </MainContainer>
    </CommonLayout>
  )
}

export default ServerError;
