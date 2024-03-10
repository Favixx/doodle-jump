import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

function useUserContext() {
  const { user, setUser } = useContext(UserContext);

  const updateUser = (updates: Partial<typeof user>) => {
    setUser((currentUser) => ({
      ...currentUser,
      ...updates,
    }));
  };

  return { user, updateUser };
}

export default useUserContext;
