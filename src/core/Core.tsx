import React from 'react';
import Header from './Header/Header';
import Menu from './Menu/Menu';
import { Outlet, useOutletContext } from 'react-router-dom';
import style from './core.module.scss';
import { useUser } from '../App';
import { iUserContext } from '../shared/interfaces';

export function useUserCore() {
  return useOutletContext<iUserContext>();
}

export default function Core() {
  const userCtx = useUser();

  return (
    <div className={style.root}>
      <Header />
      <div className={style.content}>
        <Menu />
        <Outlet context={userCtx} />
      </div>
    </div>
  );
}
