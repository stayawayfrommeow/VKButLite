import React from 'react';
import CreatePost from './components/CreatePost/CreatePost';
import PostList from './components/PostList/PostList';

export default function Posts() {
  return (
    <>
      <CreatePost />
      <PostList />
    </>
  );
}
