import React, { useState } from 'react';
import style from './post.module.scss';
import { Button, Dialog } from '@mui/material';

export default function Post() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };
  const handleClose = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={style.postMini} onClick={() => handleOpen()}>
        <img
          src='https://images.unsplash.com/photo-1682632936947-7df71a2b8ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
          alt=''
        />
        <div className={style.bottom}>
          <span>title</span>
          <div>
            <span>likes: </span>
            <span className={style.accented}>123123</span>
          </div>
        </div>
      </div>
      <Dialog open={isOpen} onClose={handleClose} disableScrollLock fullWidth>
        <div className={style.postFull}>
          <div className={style.top}>
            <div className={style.info}>
              <span className={style.title}>title</span>
              <ul>
                <li>
                  <span>author:</span>
                  <span className={style.link}>123123</span>
                </li>
                <li>
                  <span>likes:</span>
                  <span className={style.accented}>123123</span>
                </li>
              </ul>
            </div>
            <div className={style.buttons}>
              <Button variant='outlined'>Like</Button>
              <Button variant='outlined'>Edit</Button>
              <Button variant='outlined' color='error'>
                Delete
              </Button>
            </div>
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nisi
            ex enim et voluptatem odit, corrupti, recusandae dicta deserunt
            corporis eius provident consectetur, aperiam deleniti cum officiis
            tempora impedit nostrum quia omnis unde! At, vitae pariatur
            perspiciatis odit obcaecati illo dolor sit fugit, modi qui accusamus
            voluptas recusandae porro illum aspernatur, soluta impedit aperiam
            molestiae similique? Nemo debitis mollitia voluptatem!
          </div>
          <img
            src='https://images.unsplash.com/photo-1682632936947-7df71a2b8ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
            alt=''
          />
        </div>
      </Dialog>
    </>
  );
}
