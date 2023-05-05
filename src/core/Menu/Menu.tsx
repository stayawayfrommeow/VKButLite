import React from 'react';
import style from './menu.module.scss';
import { Button } from '@mui/material';

export default function Menu() {
  return (
    <div className={style.root}>
      <Button variant='outlined'>myProfile</Button>
      <Button variant='outlined'>feed</Button>
      <Button variant='outlined'>friends</Button>
      <Button variant='outlined'>dialogs</Button>
    </div>
  );
}
