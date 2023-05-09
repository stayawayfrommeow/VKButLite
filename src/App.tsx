import { useEffect, useState } from 'react';
import './App.css';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { iUser, iUserContext } from './shared/interfaces';
import Cookies from 'js-cookie';
import useLogin from './shared/hooks/useLogin';
import useGetMe from './shared/hooks/useGetMe';

export function useUser() {
  return useOutletContext<iUserContext>();
}

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState<iUser | null>(null);

  const meQuery = useGetMe();

  useEffect(() => {
    if (!Cookies.get('_token')) {
      navigate('/login');
    }
    if (Cookies.get('_token') && !user) {
      meQuery.refetch().then((res) => {
        res.isSuccess ? setUser(res.data) : null;
      });
    }
  }, []);

  return (
    <>
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
