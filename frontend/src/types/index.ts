export interface UserType {
  id: string;
  username: string;
  accessToken: string;
}

export type Action =
  | { type: "USER_LOGIN_SUCCESS"; payload: UserType | null }
  | { type: "USER_LOGOUT" };

export interface AuthDataType {
  username: string;
  password: string;
}

export interface CommentType {
  _id: string;
  operation: string;
  number: number;
  result: number;
  userId: {
    _id: string;
    username: string;
  };
  postId: string;
  parentId: string;
  replies: CommentType[];
  comments?: CommentType[];
  createdAt: string;
}
export interface PostType {
  _id: "string";
  number: number;
  userId: {
    _id: string;
    username: string;
  };
  comments: CommentType[];
  createdAt: string;
}

//////// Form types ////////
export interface InputType {
  error?: boolean;
}

export interface SelectType {
  error?: boolean;
  // disabled?: boolean;
}

export interface ErrorMessageType {
  show?: boolean;
  top?: string;
}
