import { useEffect, useState } from 'react';
import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { iUser } from './shared/interfaces';
import Cookies from 'js-cookie';

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState<iUser | null>(null);

  useEffect(() => {
    if (!Cookies.get('_token')) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
