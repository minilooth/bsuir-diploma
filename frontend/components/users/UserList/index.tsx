import React from 'react';
import {Paper} from "@mui/material";
import {User} from "types/user";
import {UserListHeader} from "components/users/UserList/UserListHeader";
import {UserListContent} from "components/users/UserList/UserListContent";

interface UserListProps {
  users: User[];
}

export const UserList: React.FC<UserListProps> = ({users}) => {
  return (
    <Paper className="p-20 mt-40 mb-40">
      <UserListHeader/>
      <UserListContent users={users}/>
    </Paper>
  );
};
