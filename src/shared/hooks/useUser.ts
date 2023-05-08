import { useOutletContext } from 'react-router-dom';
import { iUser } from '../interfaces';

interface iContext {
  user: iUser | null;
  setUser: React.Dispatch<React.SetStateAction<iUser | null>>;
}

export function useUser() {
  return {
    user: useOutletContext<iContext>().user,
    setUser: useOutletContext<iContext>().setUser,
  };
}
