import React from 'react';
import {NextPage} from "next";

import {MainContainer} from "components/common/MainContainer";
import {AuthenticatedLayout} from "components/layouts/AuthenticatedLayout";
import {withAuthServerSideProps} from "core/auth/withAuthServerSideProps";
import {UserList} from "components/users/UserList";
import {wrapper} from "redux/store";
import {useTypedSelector} from "redux/hooks";
import {getAll, selectPages, selectUsers} from "redux/slices/usersSlice";

const Users: NextPage = () => {
  const users = useTypedSelector(selectUsers);
  const pages = useTypedSelector(selectPages);

  return (
    <AuthenticatedLayout title={'Пользователи'}>
      <MainContainer>
        <UserList users={users} pages={pages}/>
      </MainContainer>
    </AuthenticatedLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => withAuthServerSideProps(async ({req, res, query}) => {
  const {headers} = req;
  await store.dispatch(getAll({query, headers}));
  return {
    props: {}
  }
}, {
  authorizationNeeded: true
}, store))

export default Users;
