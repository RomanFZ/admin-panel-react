import { AnyAction } from "redux";

import { loaderTypes } from "../types/loaderTypes";

type Loader = {
  loading: boolean;
};

const initialState = {
  loading: false,
};

export const loaderReducer = (
  state: Loader = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case loaderTypes.START_LOADING_SHOW:
      return { loading: true };
    case loaderTypes.STOP_LOADING_SHOW:
      return { loading: false };
    default:
      return state;
  }
};
