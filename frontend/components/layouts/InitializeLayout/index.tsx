import React from 'react';

import {User} from "types/user";
import {initialize, selectInitialized} from 'redux/slices/userSlice';
import {useTypedDispatch, useTypedSelector} from "redux/hooks";

interface InitializeLayoutProps {
  user: User,
}

export const InitializeLayout: React.FC<InitializeLayoutProps> = ({children, user}) => {
  const dispatch = useTypedDispatch();
  const initialized = useTypedSelector(selectInitialized);

  if (!initialized) {
    dispatch(initialize(user));
  }

  return (<>{children}</>);
}
