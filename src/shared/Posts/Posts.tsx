import React, { useEffect, useState } from 'react';
import CreatePost from './components/CreatePost/CreatePost';
import PostList from './components/PostList/PostList';
import { useLocation, useParams } from 'react-router-dom';
import useGetPostsById from '../hooks/useGetPostsById';
import { iPost } from '../interfaces';
import { useUserCore } from '../../core/Core';
import useLazyPosts from '../hooks/useLazyPosts';

export default function Posts() {
  const { user } = useUserCore();
  const postsQuery = useGetPostsById(user?.id as string);
  const [posts, setPosts] = useState<iPost[]>([]);
  const location = useLocation();

  const handleRefetch = () => {
    postsQuery.refetch().then((res) => {
      res.isSuccess ? setPosts(res.data) : null;
    });
  };

  const [cursor, setCursor] = useState<number>(0);

  const lazyQuery = useLazyPosts(cursor);

  const lazyCallback = () => {
    if (!lazyQuery.isFetching) {
      lazyQuery.refetch().then((res) => {
        if (res.isSuccess) {
          setPosts((prev) => [...prev, ...res.data.pages[0]]);
          setCursor((prev) => prev + 15);
        }
      });
    }
  };

  useEffect(() => {
    user ? handleRefetch() : null;
  }, [user]);

  // useEffect(() => {
  //   console.log(posts);
  // }, [posts]);

  return (
    <>
      <CreatePost refetchCallback={handleRefetch} />

      <PostList
        posts={posts}
        refetchCallback={handleRefetch}
        lazyCallback={lazyCallback}
      />
    </>
  );
}
