import { userTypes } from "../types/userType";
import { User } from "../../tsTypes/interfaces";

export interface UserState {
  user: User,
  error: string,
}

interface UserActions {
  type: string,
  user: User,
  error: string,
}

const initialState = {
  user: {
    login: '',
    password: ''
  },
  error: "",
};

export const userReducer = (state: UserState = initialState, action: UserActions) => {
  switch (action.type) {
    case userTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case userTypes.ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
