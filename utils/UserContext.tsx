import React, { createContext, useState, useContext, ReactNode } from 'react';
import { navigationRef } from '../NavigatorRef';
import { StackActions } from '@react-navigation/native';

type UserInfo = {
  email: string;
  id: string;
  name: string;
  password: string;
  surname: string;
  userName: string;
};

type UserContextType = {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  isLogin: any;
  setIsLogin: (data: any) => void;
  handleRefresh: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    id: '',
    name: '',
    password: '',
    surname: '',
    userName: '',
  });
  const [isLogin, setIsLogin] = useState<any>();

  const handleRefresh = () => {
    if (navigationRef.isReady()) {
      const route = navigationRef.getCurrentRoute();
      if (route) {
        navigationRef.dispatch(
          StackActions.replace(route?.name, route?.params),
        );
      }
    }
  };

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, isLogin, setIsLogin, handleRefresh }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
