import React from 'react';
import Post from './Post/Post';
import style from './postList.module.scss';

export default function PostList() {
  return (
    <div className={style.root}>
      <div className={style.subGrid}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, fugiat.
        </div>
        <div>1</div>
        <Post />
      </div>
      <div className={style.subGrid}>
        <Post />
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo,
          facilis maxime. Alias aut blanditiis, debitis et nobis in earum
          officiis.
        </div>
        <div>2</div>
      </div>
      <div className={style.subGrid}>
        <div>3</div>
        <Post />
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam excepturi
          accusamus, non in ut vitae aliquam, ratione cumque consequatur
          deserunt quod iste culpa distinctio incidunt dignissimos ullam tempore
          praesentium natus.
        </div>
        <Post />
      </div>
    </div>
  );
}
