import { Action, UserType } from "../types";

export const userLoginSuccess = (user: UserType | null): Action => ({
  type: "USER_LOGIN_SUCCESS",
  payload: user,
});

export const userLogOut = (): Action => ({
  type: "USER_LOGOUT",
});
