import { createContext, useContext, ReactNode, useState } from 'react';

interface UserContextType {
  user: {
    name: string;
    balance: number;
    score: number;
  };
  setUser: React.Dispatch<React.SetStateAction<UserContextType['user']>>;
}

const defaultValue: UserContextType = {
  user: {
    name: '',
    balance: 0,
    score: 0,
  },
  setUser: () => {},
};

const UserContext = createContext<UserContextType>(defaultValue);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserContextType['user']>(defaultValue.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function userContext() {
  return useContext(UserContext);
}
