import React, { useEffect, useState } from 'react';
import style from './post.module.scss';
import { Button, Dialog } from '@mui/material';
import { iPost } from '../../../../interfaces';
import { useNavigate } from 'react-router-dom';
import useDeletePost from '../../../../hooks/useDeletePost';
import useLike from '../../../../hooks/useLike';
import { useUserCore } from '../../../../../core/Core';

interface iProps {
  postInfo: iPost;
  refetchCallback: () => void;
}

import { BACKEND_URL } from '../../../../constants';

export default function Post({ postInfo, refetchCallback }: iProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useUserCore();

  const handleOpen = (): void => {
    setIsOpen(true);
  };
  const handleClose = (): void => {
    setIsOpen(false);
  };

  const navigate = useNavigate();

  const deleteQuery = useDeletePost(postInfo.id);

  const handledelete = () => {
    deleteQuery.refetch().then((res) => {
      if (res.isSuccess) {
        refetchCallback();
        setIsOpen(false);
      }
    });
  };

  const likeQuery = useLike(postInfo.id);

  const handleLike = () => {
    likeQuery.refetch().then((res) => {
      if (res.isSuccess) {
        // refetchCallback();
        setIsOpen(false);
      }
    });
  };

  // useEffect(() => {
  //   console.log(postInfo);
  // }, [postInfo]);

  return (
    <>
      <div className={style.postMini} onClick={() => handleOpen()}>
        <img
          src={
            postInfo.attachment
              ? `${BACKEND_URL}/${postInfo.attachment}`
              : 'https://images.unsplash.com/photo-1682632936947-7df71a2b8ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
          }
          alt=''
        />
        <div className={style.bottom}>
          <span className={style.title}>{postInfo.title}</span>
          <div className={style.likes}>
            <span>likes: </span>
            <span className={style.accented}>{postInfo.likes}</span>
          </div>
        </div>
      </div>
      <Dialog open={isOpen} onClose={handleClose} disableScrollLock fullWidth>
        <div className={style.postFull}>
          <div className={style.top}>
            <div className={style.info}>
              <span className={style.title}>{postInfo.title}</span>
              <ul>
                <li>
                  <span>author:</span>
                  <span
                    className={style.link}
                    onClick={() => {
                      navigate(`/${postInfo.author.id}`);
                    }}
                  >{`${postInfo.author.firstName} ${postInfo.author.secondName}`}</span>
                </li>
                <li>
                  <span>likes:</span>
                  <span className={style.accented}>{postInfo.likes}</span>
                </li>
              </ul>
            </div>
            <div className={style.buttons}>
              <Button variant='outlined' onClick={() => handleLike()}>
                Like
              </Button>
              {/* <Button variant='outlined'>Edit</Button> */}
              {user?.id === postInfo?.author.id && (
                <Button
                  variant='outlined'
                  color='error'
                  onClick={() => handledelete()}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
          <div className={style.text}>{postInfo.text}</div>
          <img
            src={
              postInfo.attachment
                ? `${BACKEND_URL}/${postInfo.attachment}`
                : 'https://images.unsplash.com/photo-1682632936947-7df71a2b8ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
            }
            alt=''
          />
        </div>
      </Dialog>
    </>
  );
}
