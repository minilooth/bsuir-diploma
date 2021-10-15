import React from 'react';
import {NextPage} from "next";

import {MainContainer} from "components/common/MainContainer";
import {AuthenticatedLayout} from "components/layouts/AuthenticatedLayout";
import {withAuthServerSideProps} from "core/auth/withAuthServerSideProps";

const Home: NextPage = () => {
  return (
    <AuthenticatedLayout title={'Main'}>
      <MainContainer>
        INDEX PAGE
      </MainContainer>
    </AuthenticatedLayout>
  )
}

export const getServerSideProps = withAuthServerSideProps(null, {
  authorizationNeeded: true
})

export default Home;
