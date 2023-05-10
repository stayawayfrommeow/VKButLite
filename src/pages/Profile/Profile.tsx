import React, { useEffect, useState } from 'react';
import style from './profile.module.scss';
import { myUser } from '../../shared/mock';
import { Avatar, Button } from '@mui/material';
import Posts from '../../shared/Posts/Posts';
import UserInfo from '../../shared/UserInfo/UserInfo';
import { useParams } from 'react-router-dom';
import { useUser } from '../../App';
import { useUserCore } from '../../core/Core';
import { iUser } from '../../shared/interfaces';
import useGetUserById from '../../shared/hooks/useGetUserById';

export default function Profile() {
  const userCtx = useUserCore();
  const { id } = useParams();
  const [user, setUser] = useState<iUser | null>(null);
  const userQuery = useGetUserById(id as string);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [isFriend, setIsFriend] = useState<boolean>(false);

  useEffect(() => {
    if (id && +userCtx.user?.id === +id) {
      // console.log(userCtx.user);
      setUser(userCtx.user);
    } else if (!userQuery.isFetching) {
      userQuery
        .refetch()
        .then((res) => (res.isSuccess ? setUser(res.data) : null));
    }
  }, [userCtx, id, setUser]);

  // useEffect(() => {
  //   console.log(userCtx);
  // }, [userCtx]);
  // useEffect(() => {
  //   console.log(id);
  // }, [id]);
  useEffect(() => {
    if (user && userCtx) {
      // console.log(userCtx);

      if (user?.id === userCtx.user?.id) {
        setIsMe(true);
      }
      if (userCtx.user?.friendIds?.includes(user?.id.toString())) {
        setIsFriend(true);
      } else {
        setIsFriend(false);
      }
    }
  }, [user, userCtx]);

  return (
    <div className={style.container}>
      <UserInfo user={user} isMe={isMe} isFriend={isFriend} />
      <Posts />
    </div>
  );
}
