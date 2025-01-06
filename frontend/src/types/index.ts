export interface UserType {
  id: string;
  username: string;
  accessToken: string;
}

export interface AuthDataType {
  username: string;
  password: string;
}

//////// Form types ////////
export interface InputType {
  error?: boolean;
}

export interface SelectType {
  error?: boolean;
  disabled?: boolean;
}

export interface ErrorMessageType {
  show?: boolean;
  top?: string;
}
