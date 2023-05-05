import React from 'react';
import Header from './Header/Header';
import Menu from './Menu/Menu';
import { Outlet } from 'react-router-dom';
import style from './core.module.scss';

export default function Core() {
  return (
    <div className={style.root}>
      <Header />
      <div className={style.content}>
        <Menu />
        <Outlet />
      </div>
    </div>
  );
}
