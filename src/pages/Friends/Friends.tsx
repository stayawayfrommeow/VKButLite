import React, { useEffect, useState } from 'react';
import UserInfo from '../../shared/UserInfo/UserInfo';
import style from './friends.module.scss';
import { useLocation } from 'react-router-dom';
import { useUserCore } from '../../core/Core';
import useGetFriendsById from '../../shared/hooks/useGetFriendsById';
import { iUser } from '../../shared/interfaces';

export default function Friends() {
  const location = useLocation();

  const userCtx = useUserCore();

  const [render, setRender] = useState<iUser[]>([]);

  // console.log(location.state);

  const friendsQuery = useGetFriendsById(userCtx.user?.id);

  useEffect(() => {
    userCtx.user?.id &&
      friendsQuery
        .refetch()
        .then((res) => setRender(location.state ? location.state : res.data));
  }, [userCtx]);

  useEffect(() => {
    console.log(userCtx);
  }, [userCtx]);
  useEffect(() => {
    console.log(render);
  }, [render]);
  useEffect(() => {
    console.log(userCtx);
  }, [userCtx]);

  if (friendsQuery.isSuccess) {
    return (
      <div className={style.root}>
        {render &&
          render.map((friend) => {
            return (
              <UserInfo
                isFriend={friend.friendIds?.includes(userCtx.user.id)}
                isMe={friend.id === userCtx.user.id}
                user={friend}
                key={friend.id}
              />
            );
          })}
      </div>
    );
  }
}
