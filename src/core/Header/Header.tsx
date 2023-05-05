import React from 'react';
import style from './header.module.scss';
import { Button, TextField } from '@mui/material';

export default function Header() {
  return (
    <div className={style.root}>
      <div className={style.container}>
        <TextField
          id='outlined-basic'
          placeholder='Search'
          variant='outlined'
          size='small'
          InputProps={{ sx: { bgcolor: 'white', width: '18rem' } }}
        />
        <div className={style.controls}>
          <div>myname</div>
          <Button variant='outlined'>logout</Button>
        </div>
      </div>
    </div>
  );
}
