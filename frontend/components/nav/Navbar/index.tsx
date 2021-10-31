import React from "react";
import {Box} from "@mui/material";
import {Home} from '@mui/icons-material';
import Link from "next/link";

import {MainContainer} from "components/common/MainContainer";
import {UserData} from "components/nav/Navbar/UserData";
import {AnimatedLink} from "components/common/AnimatedLink";

import styles from 'components/nav/Navbar/Navbar.module.scss';

interface Item {
  title: string;
  key: string;
  href: string;
}

const items: Item[] = [
  {title: "Запчасти", key: "SPARE_PARTS", href: "/"},
  {title: "Пользователи", key: "USERS", href: "/users"},
  {title: "Склады и магазины", key: "STORES_AND_SHOPS", href: "/stores"},
]

export const NavBar: React.FC = () => {
  return (
    <Box component="div" className={styles.wrapper}>
      <MainContainer>
        <Box component="div" className="d-flex flex-row justify-between align-center">
          <Box component="div" className="d-flex align-center">
            {/*<Link href='/'>*/}
            {/*  <a className={styles.home}>*/}
            {/*    <Home/>*/}
            {/*  </a>*/}
            {/*</Link>*/}
            {items.map(({title, key, href}) => (
              <AnimatedLink href={href} title={title} key={key}/>
            ))}
          </Box>
          <Box component="div" className={styles.user}>
            <UserData/>
          </Box>
        </Box>
      </MainContainer>
    </Box>
  )
}
