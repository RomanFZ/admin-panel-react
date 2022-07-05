import { push } from "connected-react-router";

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { receptionsTypes } from "../types/receprionsTypes";
import { SortBy } from "../reducers/receptionsReducer";
import { showLoader, hideLoader } from "./loaderActions";
import { AnyAction } from "redux";

import { Api } from "../../services/Api";
import {
  AppState,
  Reception,
  SelectedReception,
} from "../../tsTypes/interfaces";
import { url } from "../../collections";

export interface SetSortBy {
  type: string;
  sortBy: SortBy;
}

const showFilter = (value: any) => {
  return {
    type: receptionsTypes.IS_SHOW_FILTER,
    isShowFilter: value,
  };
};

const setFilterBy = (value: any) => {
  return {
    type: receptionsTypes.SET_FILTER_BY,
    filterBy: value,
  };
};

const setSortBy = (value: SortBy): SetSortBy => {
  return {
    type: receptionsTypes.SET_SORT_BY,
    sortBy: value,
  };
};

const setSelectedReception = (data: SelectedReception) => {
  return {
    type: receptionsTypes.SET_SELECTED_RECEPTION,
    selectedReception: data,
  };
};

const setReceptions = (data: Reception[]) => {
  return {
    type: receptionsTypes.GET_ALL_RECEPTIONS,
    receptions: data,
  };
};

const setSortReceptions = (data: Reception[]) => {
  return {
    type: receptionsTypes.GET_ALL_RECEPTIONS,
    sortingReceptions: data,
  };
};

const getAllReceptions = (
  data: any
): ThunkAction<Promise<void>, AppState, any, AnyAction> => {
  return async (dispatch: ThunkDispatch<AppState, any, AnyAction>) => {
    dispatch(showLoader());
    try {
      const result = await Api.get(`${url}/getReceptions?userId=${data}`);
      dispatch(setReceptions(result?.data as Reception[]));
      dispatch(hideLoader());
    } catch (error: any) {
      dispatch(hideLoader());
      dispatch(push("/authorization"));
    }
  };
};

const deleteReception = (
  id: string,
  userId: string | null
): ThunkAction<Promise<void>, AppState, any, AnyAction> => {
  return async (dispatch: ThunkDispatch<AppState, any, AnyAction>) => {
    dispatch(showLoader());
    try {
      const result = await Api.delete(
        `${url}/deleteReception?id=${id}&userId=${userId}`
      );
      dispatch(setReceptions(result?.data as Reception[]));
      dispatch(hideLoader());
    } catch (error: any) {
      dispatch(push("/authorization"));
      dispatch(hideLoader());
    }
  };
};

const addingReception = (
  data: Reception
): ThunkAction<Promise<void>, AppState, any, AnyAction> => {
  return async (dispatch: ThunkDispatch<AppState, any, AnyAction>) => {
    dispatch(showLoader());
    try {
      const result = await Api.post(`${url}/createReception`, data);
      dispatch(setReceptions(result?.data as Reception[]));
      dispatch(hideLoader());
    } catch (error: any) {
      dispatch(push("/authorization"));
      dispatch(hideLoader());
    }
  };
};

const updateReception = (
  data: SelectedReception
): ThunkAction<Promise<void>, AppState, any, AnyAction> => {
  return async (dispatch: ThunkDispatch<AppState, any, AnyAction>) => {
    dispatch(showLoader());
    try {
      const result = await Api.patch(`${url}/updateReception`, data);
      dispatch(setReceptions(result?.data as Reception[]));
      dispatch(hideLoader());
    } catch (error: any) {
      dispatch(push("/authorization"));
      dispatch(hideLoader());
    }
  };
};

const receptionsAction = {
  getAllReceptions,
  deleteReception,
  addingReception,
  updateReception,
  setSelectedReception,
  setReceptions,
  setSortBy,
  setSortReceptions,
  setFilterBy,
  showFilter,
};

export default receptionsAction;
