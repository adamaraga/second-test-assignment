import { Action, UserType } from "../types";
type User = UserType | null;
type State = {
  user: User;
};

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
