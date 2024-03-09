import { userContext } from '../contexts/userContext';

function useUserContext() {
  const { user, setUser } = userContext();

  const updateUser = (updates: Partial<typeof user>) => {
    setUser((currentUser) => ({
      ...currentUser,
      ...updates,
    }));
  };

  return { user, updateUser };
}

export default useUserContext;
