import { createContext, useContext, ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface User {
  name: string;
  star: object;
  address: string;
  balance: number;
  avatar: string;
  theme: "day" | "night";
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const defaultValue: UserContextType = {
  user: {
    name: "",
    address: "",
    star: {},
    balance: 100,
    avatar: "",
    theme: "day",
  },
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(defaultValue);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User>("userInfo", defaultValue.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
