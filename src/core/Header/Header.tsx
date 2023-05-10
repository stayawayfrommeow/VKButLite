import React, { useEffect, useState } from 'react';
import style from './header.module.scss';
import { Button, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../App';
import useDebounce from '../../shared/hooks/useDebounce';
import useSearchUsers from '../../shared/hooks/useSearchUsers';

export default function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const { user } = useUser();

  const searchQuery = useSearchUsers(search);

  const handleLogout = () => {
    Cookies.remove('_token');
    navigate('/login');
  };

  const handleSearch = () => {
    searchQuery.refetch().then((res) => {
      if (res.isSuccess) {
        navigate('/friends', { state: res.data });
      }
    });
  };

  return (
    <div className={style.root}>
      <div className={style.container}>
        <div className={style.search}>
          <TextField
            id='outlined-basic'
            placeholder='Search'
            variant='outlined'
            size='small'
            InputProps={{ sx: { bgcolor: 'white', width: '18rem' } }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(event.target.value);
            }}
          />
          <Button variant='outlined' onClick={() => handleSearch()}>
            search
          </Button>
        </div>
        <div className={style.controls}>
          <div>
            {user ? `loggined as ${user.firstName} ${user.secondName}` : ''}
          </div>
          <Button variant='outlined' onClick={() => handleLogout()}>
            logout
          </Button>
        </div>
      </div>
    </div>
  );
}
