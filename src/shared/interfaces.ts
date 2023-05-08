export interface iUser {
  id: string;
  profileImage: string | null;
  firstName: string | null;
  secondName: string | null;
  age: string | null;
  city: string | null;
  university: string | null;
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

export interface iLogin {
  login: string;
  password: string;
  register: boolean;
}

export interface iLoginResponse {
  token: string;
  user: iUser;
}

export interface iRegisterResponse {
  token: string;
}
