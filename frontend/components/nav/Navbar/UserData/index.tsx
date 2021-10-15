import React from "react";
import {Avatar, Box, ClickAwayListener, Fade, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";

import {UserPopupMenu} from "components/nav/Navbar/UserData/UserPopupMenu";
import {useTypedSelector} from "redux/hooks";
import {selectCurrentUser} from "redux/slices/userSlice";

import styles from "components/nav/Navbar/UserData/UserData.module.scss";

export const UserData: React.FC = () => {
  const [userPopupOpened, setUserPopupOpened] = React.useState(false);
  const user = useTypedSelector(selectCurrentUser);

  const onClickUser = () => {
    setUserPopupOpened((prev) => !prev);
  }

  const onClickAwayUser = () => {
    setUserPopupOpened(false);
  }

  return (
    <>
      <ClickAwayListener onClickAway={onClickAwayUser} touchEvent={false}>
        <List disablePadding component="div" className="w-200 h-50">
          <ListItem button onClick={onClickUser} className="hp-100">
            <ListItemAvatar>
              <Avatar src={user?.avatar} alt={user?.username} className={styles.avatar}/>
            </ListItemAvatar>
            <ListItemText primary={user?.username} className={styles.username} disableTypography/>
          </ListItem>
        </List>
      </ClickAwayListener>
      <Fade in={userPopupOpened} timeout={300}>
        <Box component="div" className={styles.popup}>
          <UserPopupMenu/>
        </Box>
      </Fade>
    </>
  )
}
