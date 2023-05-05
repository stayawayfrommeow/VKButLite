import React from 'react';
import style from './userInfo.module.scss';
import { Avatar, Button } from '@mui/material';
import { myUser } from '../mock';

export default function UserInfo() {
  return (
    <div className={style.root}>
      <Avatar
        alt='Remy Sharp'
        src={myUser.profileImage}
        sx={{ width: '4rem', height: '4rem' }}
      />
      <div className={style.infoContainer}>
        <div className={style.info}>
          <span
            className={style.name}
          >{`${myUser.firstName} ${myUser.secondName}`}</span>
          <ul>
            <li>
              <span>age:</span>
              <span className={style.accented}>{myUser.age}</span>
            </li>
            <li>
              <span>city:</span>
              <span className={style.accented}>{myUser.city}</span>
            </li>
            <li>
              <span>university:</span>
              <span className={style.accented}>{myUser.university}</span>
            </li>
            <li>
              <span>friends:</span>
              <span className={style.link}>{myUser.friendIds.length}</span>
            </li>
          </ul>
        </div>
        <div className={style.controls}>
          <Button variant='outlined'>edit</Button>
          <Button variant='outlined'>message</Button>
          <Button variant='outlined'>add</Button>
          <Button variant='outlined' color='error'>
            delete
          </Button>
        </div>
      </div>
    </div>
  );
}
