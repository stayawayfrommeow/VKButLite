export interface iUser {
  id: string;
  profileImage: string;
  firstName: string;
  secondName: string;
  age: string;
  city: string;
  university: string;
  postIds: string[];
  friendIds: string[];
}

export interface iUserShort {
  id: string;
  profileImage: string;
  firstName: string;
  secondName: string;
}

export interface iPost {
  id: string;
  title: string;
  text: string;
  attach: iAttachment | null;
  author: iUserShort;
  likes: number;
}

export interface iAttachment {
  type: 'image';
  textId: string;
  id: string;
  contentUrl: string;
}

export interface iDialogShort {
  id: string;
  imageUrl: string;
  name: string;
  lastMessage: iMessage;
}

export interface iDialog {
  id: string;
  users: iUserShort[];
}

export interface iMessage {
  id: string;
  dialogId: string;
  text: string;
  authorId: string;
  replayTo: string | null;
  isViewed: boolean;
  attachment: iAttachment | null;
}
