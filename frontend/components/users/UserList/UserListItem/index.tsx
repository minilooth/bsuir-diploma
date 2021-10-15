import React from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Image from "next/image";
import {User} from "types/user";
import clsx from "clsx";

import styles from 'components/users/UserList/UserListItem/UserListItem.module.scss';

interface UserListItemProps {
  user: User;
}

export const UserListItem: React.FC<UserListItemProps> = ({user}) => {
  const {avatar, firstname, lastname, username, email, phoneNumber, roles} = user;
  return (
    <Grid item xs={4}>
      <Card>
        <CardMedia>
          <Box className={clsx("d-flex justify-center", styles.avatarWrapper)}>
            <Image src={avatar ?? '/user.png'} alt={`${firstname} ${lastname}`} layout="fill" objectFit="cover"/>
          </Box>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {firstname} {lastname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Имя пользователя: {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            E-mail: {email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Номер телефона: {phoneNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Привилегия: {roles.map(r => r.authority).join(', ')}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Профиль</Button>
          <Button size="small">Еще</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
