import React, { FC, useCallback } from "react";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import receptionsActions from "../../redux/actions/receptionsActions";
import { AppDispatch, RootState } from "../../redux/store";

import { tableHeading } from "../../collections";
import { Reception } from "../../tsTypes/interfaces";

import "./Table.scss";
import { sortingReceptions } from "../../redux/selectors/receptionsSelector";

interface TableProps {
  setIsOpenModal: (item: boolean) => void;
  setModalType: (item: string) => void;
}

const Table: FC<TableProps> = ({ setIsOpenModal, setModalType }) => {
  const dispatch = useDispatch<AppDispatch>();

  const modalDelete = useCallback(
    // Todo
    (id, userId) => {
      dispatch(receptionsActions.setSelectedReception({ id, userId }));
      setModalType("openDeleteModal");
      setIsOpenModal(true);
    },
    [dispatch, setIsOpenModal, setModalType]
  );

  const modalEdit = useCallback(
    // Todo
    (item) => {
      dispatch(receptionsActions.setSelectedReception(item));
      setModalType("openEditModal");
      setIsOpenModal(true);
    },
    [dispatch, setIsOpenModal, setModalType]
  );

  const formattedDate = useCallback(
    (date) => moment(date).format("YYYY-MM-DD"),
    []
  );

  const sortedReceptions = useSelector(
    (state: RootState) => sortingReceptions(state) // Todo
  );

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table__header">
          <tr className="table__header-heading">
            {tableHeading.map((item, index) => (
              <th
                key={`tableHeading - ${index}`}
                className="table__heading-item"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedReceptions &&
            sortedReceptions.length > 0 &&
            sortedReceptions.map((item: Reception, index: number) => (
              <tr className="table__row" key={`receptions - ${index}`}>
                <td className="table__row-heading">Имя:</td>
                <td className="table__row-item table__td-name">{item.name}</td>
                <td className="table__row-heading">Врач:</td>
                <td className="table__row-item">{item.doctor}</td>
                <td className="table__row-heading">Дата:</td>
                <td className="table__row-item">{formattedDate(item.date)}</td>
                <td className="table__row-heading">Жалоба:</td>
                <td className="table__row-item table__td-complaint">
                  {item.complaint}
                </td>
                <td className="table__row-item">
                  <svg //Todo
                    onClick={() => modalDelete(item.id, item.userId)}
                    className="table__btn"
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
                  <svg
                    onClick={() => modalEdit(item)}
                    className="table__btn table__edit-btn"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="editButton"
                      d="M0 15.25V19H3.75L14.81 7.94L11.06 4.19L0 15.25ZM17.71 5.04C18.1 4.65 18.1 4.02 17.71 3.63L15.37 1.29C14.98 0.899998 14.35 0.899998 13.96 1.29L12.13 3.12L15.88 6.87L17.71 5.04Z"
                      fill="black"
                    />
                  </svg>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
