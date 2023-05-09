import React, { useEffect, useState } from 'react';
import style from './userInfo.module.scss';
import { Alert, Avatar, Button, Snackbar } from '@mui/material';
import { myUser, myUser as user, userInfoPlaceholder } from '../mock';
import { iUser, iUserInfo } from '../interfaces';
import UpdateUser from './components/UpdateUser';
import useBefriend from '../hooks/useBefriend';
import { useUserCore } from '../../core/Core';

interface iProps {
  user: iUser | null;
  isMe: boolean;
  isFriend: boolean;
}

export default function UserInfo({ user, isMe, isFriend }: iProps) {
  const [userInfo, setUserInfo] = useState<iUserInfo>(userInfoPlaceholder);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
    setToasterMessage('changes saved');
  };

  const getButtonFunc = (name: string) => {
    switch (name) {
      case 'edit':
        return () => handleOpenUpdateDialog();

      // case 'message':
      //   return () => {};

      case 'add':
        return () => handleAdd();

      case 'delete':
        return () => {};
    }
  };

  useEffect(() => {
    setUserInfo({
      age: user?.age ? user.age : 'newborn',
      city: user?.city ? user.city : 'unknown',
      firstName: user?.firstName ? user.firstName : 'new',
      profileImage: user?.profileImage
        ? 'http://localhost:4000/' + user.profileImage
        : myUser.profileImage,
      secondName: user?.secondName ? user.secondName : 'user',
      university: user?.university ? user.university : 'unknown',
      friendIds: user?.friendIds ? user.friendIds : [],
    });
  }, [user]);

  const buttonSet = [
    isMe && !isFriend && 'edit',
    // !isMe && isFriend && 'message',
    !isMe && !isFriend && 'add',
    !isMe && isFriend && 'delete',
  ];

  const [toaster, setToaster] = useState<boolean>(false);
  const [toasterMessage, setToasterMessage] = useState<string>('');

  const handleCloseToast = () => {
    setToaster(false);
  };

  const befriendQuery = useBefriend(user?.id as string);
  const userCtx = useUserCore();

  const handleAdd = () => {
    setToasterMessage('friend added');
    befriendQuery.refetch().then((res) => {
      if (res.isSuccess) {
        setToaster(true);
        userCtx.setUser(res.data);
      }
    });
  };

  useEffect(() => {
    console.log(userInfo.profileImage);
  }, [userInfo]);

  return (
    <div className={style.root}>
      <Avatar
        alt='Remy Sharp'
        src={userInfo.profileImage}
        sx={{ width: '4rem', height: '4rem' }}
      />
      <div className={style.infoContainer}>
        <div className={style.info}>
          <span
            className={style.name}
          >{`${userInfo.firstName} ${userInfo.secondName}`}</span>
          <ul>
            <li>
              <span>age:</span>
              <span className={style.accented}>{userInfo.age}</span>
            </li>
            <li>
              <span>city:</span>
              <span className={style.accented}>{userInfo.city}</span>
            </li>
            <li>
              <span>university:</span>
              <span className={style.accented}>{userInfo.university}</span>
            </li>
            <li>
              <span>friends:</span>
              <span className={style.link}>{userInfo.friendIds.length}</span>
            </li>
          </ul>
        </div>
        <div className={style.controls}>
          {buttonSet.map((button, i) =>
            button ? (
              <Button
                variant='outlined'
                key={i}
                color={button === 'delete' ? 'error' : 'primary'}
                onClick={getButtonFunc(button)}
              >
                {button}
              </Button>
            ) : null
          )}
        </div>
      </div>
      <UpdateUser
        open={openUpdateDialog}
        handleClose={handleCloseUpdateDialog}
        setToaster={setToaster}
      />
      <Snackbar
        open={toaster}
        autoHideDuration={6000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity='success'
          sx={{ width: '100%' }}
        >
          {toasterMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
