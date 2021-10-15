import React from "react";
import {Container} from "@mui/material";
import clsx from "clsx";

interface MainContainerProps {
  children: NonNullable<React.ReactNode>;
}

export const MainContainer: React.FC<MainContainerProps> = ({children}) => {
  return (
    <Container
      maxWidth="lg"
      // className={clsx('d-flex', 'align-center')}
      component='div'
    >
      {children}
    </Container>
  )
}
