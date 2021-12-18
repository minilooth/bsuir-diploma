import React from "react";
import {Badge, Box, IconButton, Stack} from "@mui/material";
import {ShoppingCartOutlined} from '@mui/icons-material';

import {MainContainer} from "components/common/MainContainer";
import {UserData} from "components/nav/Navbar/UserData";
import {AnimatedLink} from "components/common/AnimatedLink";

import styles from 'components/nav/Navbar/Navbar.module.scss';
import {useTypedSelector} from "redux/hooks";
import {selectAuthority, selectCart} from "redux/slices/usersSlice";
import {Cart} from "components/nav/Navbar/Cart";
import {RoleEnum} from "types/user";

interface Item {
  title: string;
  key: string;
  href: string;
  authorities: RoleEnum[];
}

const items: Item[] = [
  {title: "Запчасти", key: "SPARE_PARTS", href: "/", authorities: [RoleEnum.ADMIN, RoleEnum.EMPLOYEE]},
  {title: "Пользователи", key: "USERS", href: "/users", authorities: [RoleEnum.ADMIN]},
  {title: "Склады и магазины", key: "STORES_AND_SHOPS", href: "/stores", authorities: [RoleEnum.ADMIN]},
]

export const NavBar: React.FC = () => {
  const [cartOpened, setCartOpened] = React.useState(false);
  const cart = useTypedSelector(selectCart);
  const authority = useTypedSelector(selectAuthority);

  const toggleCart = () => {
    setCartOpened((prev) => !prev);
  }

  return (
    <Box component="div" className={styles.wrapper}>
      <MainContainer>
        <Box component="div" className="d-flex flex-row justify-between align-center">
          <Box component="div" className="d-flex align-center">
            {items.filter(i => authority && i.authorities.includes(authority.authority)).map(({title, key, href}) => (
              <AnimatedLink href={href} title={title} key={key}/>
            ))}
          </Box>
          <Stack direction={"row"} spacing={1} alignItems={'center'} className={styles.user}>
            <IconButton onClick={toggleCart}>
              <Badge badgeContent={cart?.totalQuantity} color={"primary"}>
                <ShoppingCartOutlined/>
              </Badge>
            </IconButton>
            <UserData/>
          </Stack>
        </Box>
      </MainContainer>
      <Cart
        open={cartOpened}
        onClose={toggleCart}
        items={cart?.items}
        totalQuantity={cart?.totalQuantity}
        totalCost={cart?.totalCost}
        totalCostUsd={cart?.totalCostUsd}
        totalCostEur={cart?.totalCostEur}
      />
    </Box>
  )
}
