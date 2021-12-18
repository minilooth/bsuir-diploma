import React from 'react';
import {AuthenticatedLayout} from "components/layouts/AuthenticatedLayout";
import {MainContainer} from "components/common/MainContainer";
import {wrapper} from "redux/store";
import {withAuthServerSideProps} from "core/auth/withAuthServerSideProps";
import {NextPage} from "next";
import {getAddresses, getStores, selectPages, selectStores} from "redux/slices/storesSlice";
import {useTypedSelector} from "redux/hooks";
import {StoreList} from "components/stores/StoreList";
import {RoleEnum} from "types/user";

const Stores: NextPage = () => {
  const stores = useTypedSelector(selectStores);
  const pages = useTypedSelector(selectPages);

  return (
    <AuthenticatedLayout title={'Склады и магазины'}>
      <MainContainer>
        <StoreList stores={stores} pages={pages}/>
      </MainContainer>
    </AuthenticatedLayout>
  )
};

export const getServerSideProps = wrapper.getServerSideProps((store) => withAuthServerSideProps(async ({req, res, query}) => {
  const {headers} = req;
  await store.dispatch(getStores({query, headers}));
  await store.dispatch(getAddresses(headers));
  return {
    props: {}
  }
}, {
  authorizationNeeded: true,
  authorities: [RoleEnum.ADMIN]
}, store))

export default Stores;
