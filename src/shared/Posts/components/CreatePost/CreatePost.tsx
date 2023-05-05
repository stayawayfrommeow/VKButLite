import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import React from 'react';
import style from './createPost.module.scss';

export default function CreatePost() {
  return (
    <div className={style.root}>
      <div className={style.top}>
        <TextField
          id='outlined-basic'
          label='Title'
          variant='outlined'
          size='small'
        />
        <div className={style.buttons}>
          <Button variant='outlined'>attach</Button>
          <Button variant='outlined' color='error'>
            delete attachment
          </Button>
          <Button variant='outlined'>send</Button>
        </div>
      </div>
      <TextField
        id='outlined-basic'
        label='Text'
        variant='outlined'
        size='small'
      />
      <div>attachment here</div>
    </div>
  );
}
