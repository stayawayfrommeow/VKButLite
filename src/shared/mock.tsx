/* user */

import { iAttachment, iPost, iUserInfo, iUserShort } from './interfaces';

export const myUser = {
  id: '1',
  profileImage:
    'https://images.unsplash.com/photo-1682621421157-8e39b469a206?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1320&q=80',
  firstName: 'user',
  secondName: '1',
  age: '12',
  city: 'spb',
  university: 'spbpu',
  postIds: ['1', '2', '3'],
  friendIds: ['2'],
};
export const myFriend = {
  id: '1',
  profileImage:
    'https://images.unsplash.com/photo-1682712581615-18fc7a7b9092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  firstName: 'user',
  secondName: '2',
  age: '13',
  city: 'spb',
  university: 'spbpu',
  postIds: ['4', '5', '6'],
  friendIds: ['1'],
};

export const myUserShort = {
  id: '1',
  profileImage:
    'https://images.unsplash.com/photo-1682621421157-8e39b469a206?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1320&q=80',
  firstName: 'user',
  secondName: '1',
};
export const myFriendShort = {
  id: '2',
  profileImage:
    'https://images.unsplash.com/photo-1682712581615-18fc7a7b9092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  firstName: 'user',
  secondName: '2',
};

/* posts */

const postAttaches: iAttachment[] = [
  {
    type: 'image',
    textId: 'img1text',
    id: '1',
    contentUrl:
      'https://images.unsplash.com/photo-1682632936947-7df71a2b8ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    type: 'image',
    textId: 'img1text',
    id: '1',
    contentUrl:
      'https://images.unsplash.com/photo-1682632936947-7df71a2b8ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    type: 'image',
    textId: 'img2text',
    id: '2',
    contentUrl:
      'https://images.unsplash.com/photo-1682471220900-11fc8f85b8f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
  },
  {
    type: 'image',
    textId: 'img2text',
    id: '2',
    contentUrl:
      'https://images.unsplash.com/photo-1682471220900-11fc8f85b8f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
  },
  {
    type: 'image',
    textId: 'img3text',
    id: '3',
    contentUrl:
      'https://images.unsplash.com/photo-1581267905280-3fdf3caa64e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=756&q=80',
  },
];

const createPost = (
  id: string,
  title: string,
  text: string,
  attach: iAttachment | null,
  author: iUserShort,
  likes: number
): iPost => {
  return {
    id,
    title,
    text,
    attach,
    author,
    likes,
  };
};

export const posts = Array(6)
  .fill(undefined)
  .map((_, i) => {
    createPost(
      i.toString(),
      `title ${i}`,
      `text ${i}`,
      [1, 3, 5].includes(i) ? postAttaches[i] : null,
      [1, 2, 3].includes(i) ? myUserShort : myFriendShort,
      i * 2
    );
  });

/* dialogs */

export const iDialogShort = {
  id: '1',
  imageUrl:
    'https://images.unsplash.com/photo-1682712581615-18fc7a7b9092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  name: 'user 2',
  lastMessage: {
    id: '1',
    dialogId: '1',
    text: '123',
    authorId: '2',
    replayTo: null,
    isViewed: false,
    attachment: {
      type: 'image',
      textId: 'img1text',
      id: '1',
      contentUrl:
        'https://images.unsplash.com/photo-1682632936947-7df71a2b8ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
  },
};

export const iDialog = {
  id: '1',
  users: [myUserShort, myFriendShort],
};

export const messageHistory = [
  {
    id: '1',
    dialogId: '1',
    text: 'qwe',
    authorId: '1',
    replayTo: null,
    isViewed: true,
    attachment: null,
  },
  {
    id: '2',
    dialogId: '1',
    text: 'asd',
    authorId: '2',
    replayTo: null,
    isViewed: false,
    attachment: null,
  },
];

export const userInfoPlaceholder: iUserInfo = {
  age: 'newborn',
  city: 'unknown',
  firstName: 'new',
  profileImage: myUser.profileImage,
  secondName: 'user',
  university: 'unknown',
  friendIds: [],
};
