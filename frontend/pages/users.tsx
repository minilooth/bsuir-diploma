import React from 'react';
import {NextPage} from "next";

import {MainContainer} from "components/common/MainContainer";
import {AuthenticatedLayout} from "components/layouts/AuthenticatedLayout";
import {withAuthServerSideProps} from "core/auth/withAuthServerSideProps";
import {UserList} from "components/users/UserList";
import {User} from "types/user";
import {UserService} from "service/UserService";

interface UsersPageProps {
  users: User[];
}

const Users: NextPage<UsersPageProps> = ({users}) => {
  return (
    <AuthenticatedLayout title={'Пользователи'}>
      <MainContainer>
        <UserList users={users}/>
      </MainContainer>
    </AuthenticatedLayout>
  )
}

export const getServerSideProps = withAuthServerSideProps(async ({req, res}) => {
  const {headers} = req;
  const users = await UserService.getAll(headers);
  return {
    props: {
      users: users
    }
  }
}, {
  authorizationNeeded: true
})

export default Users;
