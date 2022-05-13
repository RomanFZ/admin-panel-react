import { receptionsTypes } from "../types/receprionsTypes";
import { AnyAction } from "redux";
import {
  doctorName,
  sortDirection,
  sortOption,
  tableHeading,
  url,
} from "../../collections";
import { Reception, SelectedReception } from "../../tsTypes/interfaces";

export interface SortDirection {
  name: string | null;
  value: string | null;
}

export interface ConfigCollection {
  tableHeading: string[];
  doctorName: string[];
  sortOption: SortDirection[];
  sortDirection: SortDirection[];
  url?: string;
}

export interface ReceptionState {
  receptions: Reception[];
  selectedReception: SelectedReception;
  sortBy?: SortBy;
  filterBy?: FilterBy;
  isShowFilter?: boolean | string;
  config: ConfigCollection;
}

export interface FilterBy {
  startDate: any;
  endDate: any;
}

export interface SortBy {
  key: string;
  dir: string;
}

const initialState = {
  receptions: [],
  selectedReception: {},
  sortBy: { key: "", dir: "" },
  filterBy: { startDate: "", endDate: "" },
  isShowFilter: false,
  config: {
    tableHeading,
    doctorName,
    sortOption,
    sortDirection,
    url,
  },
};

export const receptionsReducer = (
  state: ReceptionState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case receptionsTypes.GET_ALL_RECEPTIONS:
      return {
        ...state,
        receptions: action.receptions,
      };
    case receptionsTypes.SET_SELECTED_RECEPTION:
      return {
        ...state,
        selectedReception: action.selectedReception,
      };
    case receptionsTypes.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.sortBy,
      };
    case receptionsTypes.SET_FILTER_BY:
      return {
        ...state,
        filterBy: action.filterBy,
      };
    case receptionsTypes.IS_SHOW_FILTER:
      return {
        ...state,
        isShowFilter: action.isShowFilter,
      };

    default:
      return state;
  }
};
