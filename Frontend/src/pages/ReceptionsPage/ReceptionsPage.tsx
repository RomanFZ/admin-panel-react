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
import useCheckNetwork from "../../MyCustomHooks/CustomHook";
import useAbortSession from "../../MyCustomHooks/IdleHook";
import userActions from "../../redux/actions/userActions";

const ReceptionsPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { receptions, selectedReception, sortBy, filterBy, isShowFilter } =
    useSelector((state: RootState) => state.receptions);

  const online = useCheckNetwork();

  const { loading } = useSelector((state: RootState) => state.loading);

  const queryParams: any = useSelector(
    (state: any) => state.router.location.query
  );

  const [modalType, setModalType] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, [setIsOpenModal]);

  const getReceptions = useCallback((): void => {
    dispatch(receptionsActions.getAllReceptions());
  }, [dispatch]);

  const deleteReception = useCallback(() => {
    dispatch(receptionsActions.deleteReception(selectedReception.id));
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

  const logout = useAbortSession(3000);

  const destroySession = () => {
    if (logout) {
      dispatch(push("/authorization"));
      dispatch(userActions.setLogout);
    }
  };

  useEffect(() => {
    addUrlParams();
    // destroySession();
  }, [receptions, sortBy, filterBy, logout]);

  useEffect(() => {
    getReceptions();
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
        {!online && (
          <div className="useOnline">Вы не в сети, проверьте подлючение</div>
        )}
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
            Вы деиствительно хотите удалить приём?
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
