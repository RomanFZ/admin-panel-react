import { push } from "connected-react-router";

import { userTypes } from "../types/userType";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { AppState, User } from "../../tsTypes/interfaces";
import { Api } from "../../services/Api";
import { url } from "../../collections";

const setError = (error: string) => {
  return {
    type: userTypes.ERROR,
    error: error,
  };
};

const redirectToHomePage =
  (result: any) => (dispatch: ThunkDispatch<AppState, any, AnyAction>) => {
    localStorage.setItem("userId", result);
    dispatch(push("/main"));
  };

const fetchSetUserRegistration = (
  data: User
): ThunkAction<Promise<void>, AppState, any, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<AppState, any, AnyAction>
  ): Promise<void> => {
    try {
      const result: any = await Api.post(`${url}/createUser`, data);
      dispatch(redirectToHomePage(result.data));
    } catch (error: any) {
      dispatch(setError(error.response?.data?.message));
    }
  };
};

const fetchSetUserAuthorization = (
  data: User
): ThunkAction<Promise<void>, AppState, any, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<AppState, any, AnyAction>
  ): Promise<void> => {
    try {
      const result: any = await Api.post(`${url}/authorizationUser`, data);
      dispatch(redirectToHomePage(result.data));
    } catch (error: any) {
      dispatch(setError(error.response?.data?.message));
    }
  };
};

const userActions = {
  fetchSetUserRegistration,
  fetchSetUserAuthorization,
  setError,
};

export default userActions;
