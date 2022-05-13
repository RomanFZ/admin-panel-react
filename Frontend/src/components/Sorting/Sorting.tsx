import React, { FC, useCallback } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import receptionsActions from "../../redux/actions/receptionsActions";
import { AppDispatch, RootState } from "../../redux/store";

import { Select } from "../../common";

import { HandleChangeEventSelect } from "../../tsTypes/interfaces";

import "./Sorting.scss";

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 30px 20px 0;
`;

const Sorting: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const sortBy = useSelector((state: RootState) => state.receptions.sortBy);

  const { sortOption, sortDirection } = useSelector(
    (state: RootState) => state.receptions.config
  );

  const setSortValues = useCallback(
    (data): void => {
      dispatch(receptionsActions.setSortBy(data));
    },
    [dispatch]
  );

  const handleChangeSortKey = useCallback(
    (e: HandleChangeEventSelect): void => {
      setSortValues({ key: e.target.value, dir: "asc" });
    },
    [setSortValues]
  );

  const handleChangeSortDir = useCallback(
    (e: HandleChangeEventSelect): void => {
      setSortValues({ key: sortBy.key, dir: e.target.value });
    },
    [setSortValues, sortBy.key]
  );

  return (
    <SortContainer className="sort">
      <Select
        title="Сортировать по"
        id="select-sort-key"
        value={sortBy.key}
        onChange={handleChangeSortKey}
        list={sortOption}
        hiddenOption
        type="sort__select-description-incr"
      />
      {sortBy.key && (
        <Select
          id="select-sort-dir"
          onChange={handleChangeSortDir}
          value={sortBy.dir}
          list={sortDirection}
          type="sort__select-description-incr"
        />
      )}
    </SortContainer>
  );
};

export default Sorting;
