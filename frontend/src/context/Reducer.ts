import { UserType } from "../types";
type User = UserType | null;
type State = {
  user: User;
};

type Action =
  | { type: "USER_LOGIN_SUCCESS"; payload: User }
  | { type: "USER_LOGOUT" };

const Reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return { ...state };
  }
};

export default Reducer;
