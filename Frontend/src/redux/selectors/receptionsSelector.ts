import { RootState } from "../store";
import { createSelector } from "reselect";
import moment from "moment";

const reception = (state: RootState) => state.receptions.receptions;
const sortBy = (state: RootState) => state.receptions.sortBy;
const filterBy = (state: RootState) => state.receptions.filterBy;

export const filteredReceptions = createSelector(
  reception,
  filterBy,
  (receptions, filterBy) => {
    const { startDate, endDate } = filterBy;

    if (!startDate && endDate) {
      return receptions.filter((value: any) => value.date <= endDate);
    }
    if (!endDate && startDate) {
      return receptions.filter((value: any) => value.date >= startDate);
    }
    if (startDate && endDate) {
      return receptions.filter(
        (value: any) =>
          moment(value.date).isBetween(startDate, endDate) ||
          moment(moment(value.date).format("YYYY-MM-DD")).isSame(startDate) ||
          moment(moment(value.date).format("YYYY-MM-DD")).isSame(endDate)
      );
    }
    return receptions;
  }
);

export const sortingReceptions = createSelector(
  filteredReceptions,
  sortBy,
  (filteredReceptions, sort) => {
    const { key, dir } = sort;
    if (key) {
      const copiedReceptions = [...filteredReceptions];
      const result = copiedReceptions.sort((a: any, b: any) => {
        if (a[key].toLowerCase() === b[key].toLowerCase()) return 0;
        return a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1;
      });
      if (dir === "desc") {
        return result.reverse();
      }
      return copiedReceptions;
    } else {
      return filteredReceptions;
    }
  }
);
