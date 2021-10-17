import React from 'react';
import {Grid} from "@mui/material";

import {User} from "types/user";
import {UserListItem} from "components/users/UserList/UserListItem";

interface UserListContentProps {
  users: User[];
}

export const UserListContent: React.FC<UserListContentProps> = ({users}) => {
  const empty = !users?.length;

  return (
    <Grid container spacing={2}>
      {empty && (
        <Grid item xs={12} className="d-flex justify-center">
          Не удалось найти пользователей или список пользователей пока пуст! &#128577;
        </Grid>
      )}
      {!empty && users.map((user, index) =>
        <UserListItem key={index} user={user}/>
      )}
    </Grid>
  );
};
