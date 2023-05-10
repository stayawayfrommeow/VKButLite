import React, { useEffect, useState } from 'react';
import Post from './Post/Post';
import style from './postList.module.scss';
import useGetPostsById from '../../../hooks/useGetPostsById';
import { useLocation, useParams } from 'react-router-dom';
import { iPost } from '../../../interfaces';
import { Button } from '@mui/material';
import useLazyPosts from '../../../hooks/useLazyPosts';
import { useInView } from 'react-intersection-observer';

interface iProps {
  posts: iPost[];
  refetchCallback: () => void;
  lazyCallback: () => void;
}

export default function PostList({
  posts,
  refetchCallback,
  lazyCallback,
}: iProps) {
  const [col1, setCol1] = useState<iPost[]>([]);
  const [col2, setCol2] = useState<iPost[]>([]);
  const [col3, setCol3] = useState<iPost[]>([]);
  let counter = 1;
  const location = useLocation();

  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (location.pathname === '/feed' && inView) {
      lazyCallback();
    }
  }, [inView]);

  useEffect(() => {
    setCol1([]);
    setCol2([]);
    setCol3([]);

    console.log(posts);

    posts.forEach((post, i) => {
      switch (counter) {
        case 1:
          setCol1((cols) => [...cols, post]);
          counter = 2;
          break;
        case 2:
          setCol2((cols) => [...cols, post]);
          counter = 3;
          break;
        case 3:
          setCol3((cols) => [...cols, post]);
          counter = 1;
          break;
      }
    });
  }, [posts]);

  // if (posts.length === 0) {
  //   return <div className={style.noPosts}>no post found</div>;
  // }

  return (
    <div className={style.root}>
      <div className={style.subGrid}>
        {col1.map((post) => (
          <Post
            postInfo={post}
            key={post.id}
            refetchCallback={refetchCallback}
          />
        ))}
      </div>
      <div className={style.subGrid}>
        {col2.map((post) => (
          <Post
            postInfo={post}
            key={post.id}
            refetchCallback={refetchCallback}
          />
        ))}
      </div>
      <div className={style.subGrid}>
        {col3.map((post) => (
          <Post
            postInfo={post}
            key={post.id}
            refetchCallback={refetchCallback}
          />
        ))}
      </div>
      <div ref={ref}> the end.</div>
    </div>
  );
}
