import React, { FC, useCallback, useState } from "react";

import { HandleChangeEvent } from "../../tsTypes/interfaces";
import { useDispatch, useSelector } from "react-redux";
import receptionsActions from "../../redux/actions/receptionsActions";
import { RootState } from "../../redux/store";

import { Input, Button } from "../../common";

import "./Filter.scss";

const Filter: FC = () => {
  const [filterBy, setFilterBy] = useState({ startDate: "", endDate: "" });

  const dispatch = useDispatch();

  const { isShowFilter } = useSelector((state: RootState) => state.receptions);

  const handleChangeStartDate = useCallback(
    (e: HandleChangeEvent) => {
      setFilterBy({ ...filterBy, startDate: e.target.value });
    },
    [filterBy]
  );

  const handleChangeEndDate = useCallback(
    (e: HandleChangeEvent) => {
      setFilterBy({ ...filterBy, endDate: e.target.value });
    },
    [filterBy]
  );

  const setFilterDate = useCallback(() => {
    dispatch(receptionsActions.setFilterBy(filterBy));
  }, [filterBy]);

  const removeFilter = useCallback(() => {
    setFilterBy({ startDate: "", endDate: "" });
    dispatch(receptionsActions.setFilterBy({ startDate: "", endDate: "" }));
    dispatch(receptionsActions.showFilter(false));
  }, []);

  const handleChangeShowFilter = useCallback(() => {
    dispatch(receptionsActions.showFilter(true));
  }, []);

  return (
    <div className="filter">
      {isShowFilter ? (
        <div className="filter__enable">
          <div className="filter__enable-item filter__item-input">
            <Input
              title="c"
              id="start-date"
              type="date"
              value={filterBy.startDate}
              onChange={handleChangeStartDate}
              input="input"
            />
          </div>
          <div className="filter__enable-item filter__item-input">
            <Input
              title="по"
              id="end-date"
              type="date"
              value={filterBy.endDate}
              onChange={handleChangeEndDate}
            />
          </div>
          <div className="filter__enable-item">
            <Button
              title="Фильтровать"
              onClick={setFilterDate}
              type="button__hover-not"
            />
          </div>
          <div className="filter__enable-item">
            <svg //Todo
              onClick={() => removeFilter()}
              className="filter__delete-button"
              width="14"
              height="18"
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="deleteButton"
                d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className="filter__add">
          <p className="filter__add-description">Добавить фильтр по дате:</p>
          <button
            className="filter__add-button"
            onClick={handleChangeShowFilter}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
