import React from "react";
import {Avatar, Box, ClickAwayListener, Fade, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";

import {UserPopupMenu} from "components/nav/Navbar/UserData/UserPopupMenu";
import {useTypedSelector} from "redux/hooks";
import {selectCurrentUser} from "redux/slices/usersSlice";

import styles from "components/nav/Navbar/UserData/UserData.module.scss";
import {ProfileDialog} from "components/users/ProfileDialog";
import {User} from "types/user";

export const UserData: React.FC = () => {
  const [userPopupOpened, setUserPopupOpened] = React.useState(false);
  const [profileOpened, setProfileOpened] = React.useState(false);
  const user = useTypedSelector(selectCurrentUser);
  const {avatar, username} = user || {};

  const onClickUser = () => {
    setUserPopupOpened((prev) => !prev);
  }

  const onClickAwayUser = () => {
    setUserPopupOpened(false);
  }

  const toggleProfile = () => {
    setProfileOpened((prev) => !prev);
  }

  return (
    <>
      <ClickAwayListener onClickAway={onClickAwayUser} touchEvent={false}>
        <List disablePadding component="div" className="w-200 h-50">
          <ListItem button onClick={onClickUser} className="hp-100">
            <ListItemAvatar>
              <Avatar src={avatar && avatar.uri ? `${process.env.API_URL + avatar.uri}` : ''} alt={username} className={styles.avatar}/>
            </ListItemAvatar>
            <ListItemText primary={username} className={styles.username} disableTypography/>
          </ListItem>
        </List>
      </ClickAwayListener>
      <Fade in={userPopupOpened} timeout={300}>
        <Box component="div" className={styles.popup}>
          <UserPopupMenu onProfile={toggleProfile}/>
        </Box>
      </Fade>
      <ProfileDialog open={profileOpened} onClose={toggleProfile} user={user as User} self={true}/>
    </>
  )
}
