import React from 'react';

import {User} from "types/user";
import {initialize, selectInitialized} from 'redux/slices/usersSlice';
import {useTypedDispatch, useTypedSelector} from "redux/hooks";

interface InitializeLayoutProps {
  user: User,
}

export const InitializeLayout: React.FC<InitializeLayoutProps> = ({children, user}) => {
  return (<>{children}</>);
}
