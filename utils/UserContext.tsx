import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserInfo =
  | {
      email: string;
      id: number;
      name: string;
      password: string;
      surname: string;
      userName: string;
    }
  | any;

type UserContextType = {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
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
