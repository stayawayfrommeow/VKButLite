import React from 'react';
import style from './profile.module.scss';
import { myUser } from '../../shared/mock';
import { Avatar, Button } from '@mui/material';
import Posts from '../../shared/Posts/Posts';
import UserInfo from '../../shared/UserInfo/UserInfo';

export default function Profile() {
  return (
    <div className={style.container}>
      <UserInfo />
      <Posts />
    </div>
  );
}
