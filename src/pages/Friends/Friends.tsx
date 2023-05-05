import React from 'react';
import UserInfo from '../../shared/UserInfo/UserInfo';
import style from './friends.module.scss';

export default function Friends() {
  return (
    <div className={style.root}>
      <UserInfo />
      <UserInfo />
      <UserInfo />
      <UserInfo />
    </div>
  );
}
