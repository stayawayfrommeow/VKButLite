import React from 'react';
import Posts from '../../shared/Posts/Posts';
import style from './feed.module.scss';

export default function Feed() {
  return (
    <div className={style.root}>
      <Posts />
    </div>
  );
}
