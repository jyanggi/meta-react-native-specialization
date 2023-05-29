import * as React from "react";

export const LoggedInContext = React.createContext();

export const initialState = {
  isLoggedIn: false,
  profile: null
};

export const contextReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        profile: action.profile,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};