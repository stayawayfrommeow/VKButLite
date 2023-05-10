export interface iUser {
  id: string;
  login: string;
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
  attachment: string | null;
  author: iUser;
  likes: number;
}

export interface iFileResponse {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: any;
  destination: string;
  filename: string;
  path: string;
  buffer: any;
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
  // attachment: iAttachment | null;
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

export interface iUserContext {
  user: iUser;
  setUser: React.Dispatch<React.SetStateAction<iUser>>;
}

export interface iUserInfo {
  profileImage: string;
  firstName: string;
  secondName: string;
  age: string;
  city: string;
  university: string;
  friendIds: string[];
}

export interface iUpdateMe {
  id: string | null;
  profileImage: string | null;
  firstName: string | null;
  secondName: string | null;
  age: string | null;
  city: string | null;
  university: string | null;
}

export interface iCreatePost {
  title: string | null;
  text: string | null;
  attach: string | null;
}
