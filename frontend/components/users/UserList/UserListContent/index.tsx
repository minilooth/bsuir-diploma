import React from 'react';
import {Grid} from "@mui/material";
import {User} from "types/user";
import {UserListItem} from "components/users/UserList/UserListItem";

interface UserListContentProps {
  users: User[];
}

export const UserListContent: React.FC<UserListContentProps> = ({users}) => {
  return (
    <Grid container spacing={2}>
      {!users || (users && !users.length && (
        <Grid item xs={12}>
          Список пользователей пока пуст!
        </Grid>
      ))}
      {users && users.length && users.map((user, index) =>
        <UserListItem key={index} user={user}/>
      )}
    </Grid>
  );
};
