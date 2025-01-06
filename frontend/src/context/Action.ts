import { UserType } from "../types";

type Action =
  | { type: "USER_LOGIN_SUCCESS"; payload: UserType | null }
  | { type: "USER_LOGOUT" };

export const userLoginSuccess = (user: UserType | null): Action => ({
  type: "USER_LOGIN_SUCCESS",
  payload: user,
});

export const userLogOut = (): Action => ({
  type: "USER_LOGOUT",
});
