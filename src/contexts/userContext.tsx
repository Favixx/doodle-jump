/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, ReactNode, useState } from "react";

interface UserContextType {
  user: {
    name: string;
    star: object;
    balance: number;
  };
  setUser: React.Dispatch<React.SetStateAction<UserContextType["user"]>>;
}

const defaultValue: UserContextType = {
  user: {
    name: "",
    balance: 0,
    star: {},
  },
  setUser: () => {},
};

const UserContext = createContext<UserContextType>(defaultValue);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserContextType["user"]>(defaultValue.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function userContext() {
  return useContext(UserContext);
}
