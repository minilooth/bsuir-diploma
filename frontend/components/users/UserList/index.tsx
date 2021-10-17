import React from 'react';
import {Paper} from "@mui/material";
import {User} from "types/user";
import {UserListHeader} from "components/users/UserList/UserListHeader";
import {UserListContent} from "components/users/UserList/UserListContent";
import {Paginator} from "components/common/Paginatior";

interface UserListProps {
  users: User[];
  pages: number;
}

export const UserList: React.FC<UserListProps> = ({users, pages}) => {
  return (
    <Paper className="p-20 mt-40 mb-40">
      <UserListHeader/>
      <UserListContent users={users}/>
      <Paginator pages={pages}/>
    </Paper>
  );
};
