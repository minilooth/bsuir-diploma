import React from 'react';

import {NavBar} from "components/nav/Navbar";
import {CommonLayout} from "components/layouts/CommonLayout"

interface AuthenticatedLayoutProps {
  title?: string;
}

export const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({children, title}) => {
  return (
      <CommonLayout title={title}>
        <NavBar/>
        {children}
      </CommonLayout>
  )
}
