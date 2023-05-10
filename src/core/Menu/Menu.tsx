import React from 'react';
import style from './menu.module.scss';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../App';

export default function Menu() {
  const navigate = useNavigate();
  const { user } = useUser();

  const createMenuButton = (name: string, link: string) => {
    return { name, link };
  };

  const menuButtons = [
    createMenuButton('myProfile', `/${user?.id}`),
    createMenuButton('feed', `/feed`),
    createMenuButton('friends', `/friends`),
    // createMenuButton('dialogs', `dialogs`),
  ];

  return (
    <div className={style.root}>
      {menuButtons.map((button) => (
        <Button
          variant='outlined'
          onClick={() => navigate(button.link)}
          key={button.name}
        >
          {button.name}
        </Button>
      ))}
    </div>
  );
}
