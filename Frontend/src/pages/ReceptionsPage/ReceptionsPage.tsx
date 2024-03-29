import React, { useState, useEffect, useCallback, FC } from "react";
import { push } from "connected-react-router";
import queryString from "query-string";

import { useDispatch, useSelector } from "react-redux";
import receptionsActions from "../../redux/actions/receptionsActions";
import { AppDispatch, RootState } from "../../redux/store";

import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import AddingReception from "../../components/AddingReception";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import Sorting from "../../components/Sorting/Sorting";
import EditModalForm from "../../components/EditModalForm/EditModalForm";

import "./ReceptionsPage.scss";
import Filter from "../../components/Filter";

const ReceptionsPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { receptions, selectedReception, sortBy, filterBy, isShowFilter } =
    useSelector((state: RootState) => state.receptions);

  const { loading } = useSelector((state: RootState) => state.loading);

  const queryParams: any = useSelector(
    (state: any) => state.router.location.query
  );

  const userId = localStorage.getItem("userId");

  const [modalType, setModalType] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, [setIsOpenModal]);

  const getReceptions = useCallback(
    (userId): void => {
      dispatch(receptionsActions.getAllReceptions(userId));
    },
    [dispatch]
  );

  const deleteReception = useCallback(() => {
    const userId = localStorage.getItem("userId");
    dispatch(receptionsActions.deleteReception(selectedReception.id, userId));
    setIsOpenModal(false);
  }, [selectedReception.id, dispatch]);

  const updateReception = useCallback(() => {
    dispatch(receptionsActions.updateReception(selectedReception));
    setIsOpenModal(false);
  }, [selectedReception, dispatch]);

  const addUrlParams = () => {
    if ((sortBy && sortBy.key) || filterBy.startDate || filterBy.endDate) {
      const { startDate, endDate } = filterBy;
      const { key, dir } = sortBy;
      dispatch(
        push({
          search: queryString.stringify({
            startDate,
            endDate,
            key,
            dir,
          }),
        })
      );
    } else {
      dispatch(push("/main"));
    }
  };

  useEffect(() => {
    addUrlParams();
  }, [receptions, sortBy, filterBy]);

  useEffect(() => {
    getReceptions(userId);
    if (Object.keys(queryParams).length !== 0) {
      dispatch(receptionsActions.setSortBy(queryParams));
      dispatch(receptionsActions.setFilterBy(queryParams));
      const { endDate, startDate } = queryParams;
      if (endDate.length !== 0 || startDate.length !== 0) {
        dispatch(receptionsActions.showFilter(true));
      }
    }
  }, []);

  return (
    <>
      <Header title="Приёмы" withExitButton />
      <div className="container">
        <AddingReception />
        <div className={isShowFilter ? "filter__show" : "filter__hide"}>
          <Sorting />
          <Filter />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <Table setIsOpenModal={setIsOpenModal} setModalType={setModalType} />
        )}
        {modalType === "openDeleteModal" && (
          <Modal
            isOpenModal={isOpenModal}
            handleCloseModal={handleCloseModal}
            handleChange={deleteReception}
            changeButtonText="Delete"
            title="Удалить приём"
          >
            Вы действительно хотите удалить приём?
          </Modal>
        )}
        {modalType === "openEditModal" && (
          <Modal
            isOpenModal={isOpenModal}
            handleCloseModal={handleCloseModal}
            handleChange={updateReception}
            changeButtonText="Save"
            title="Изменить приём"
          >
            <EditModalForm />
          </Modal>
        )}
      </div>
    </>
  );
};

export default ReceptionsPage;
