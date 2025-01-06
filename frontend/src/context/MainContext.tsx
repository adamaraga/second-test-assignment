import React, { createContext, useEffect, useReducer, ReactNode } from "react";
import Reducer from "./Reducer";
import { UserType } from "../types";

type User = UserType | null;

type State = {
  user: User;
};

type Action =
  | { type: "USER_LOGIN_SUCCESS"; payload: User }
  | { type: "USER_LOGOUT" };

type ContextType = {
  user: User;
  dispatch: React.Dispatch<Action>;
};

const INITIAL_STATE: State = {
  user: JSON.parse(sessionStorage.getItem("elltyUser") || "null") as User,
};

export const Context = createContext<ContextType>({
  user: INITIAL_STATE.user,
  dispatch: () => null,
});

type ContextProviderProps = {
  children: ReactNode;
};

// Create the context provider
export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    sessionStorage.setItem("elltyUser", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
