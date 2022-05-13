import React, { FC, useCallback } from "react";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import receptionsActions from "../../redux/actions/receptionsActions";
import { AppDispatch, RootState } from "../../redux/store";

import { Input, Select } from "../../common";

import {
  HandleChangeEvent,
  HandleChangeEventSelect,
  HandleChangeEventTextArea,
} from "../../tsTypes/interfaces";

import "./EditModalForm.scss";

const EditModalForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedReception = useSelector(
    (state: RootState) => state.receptions.selectedReception
  );

  const doctorName = useSelector(
    (state: RootState) => state.receptions.config.doctorName
  );

  const { name, doctor, date, complaint } = selectedReception;

  const onChangeName = useCallback(
    (name) => {
      dispatch(
        receptionsActions.setSelectedReception({
          ...selectedReception,
          name,
        })
      );
    },
    [dispatch, selectedReception]
  );

  const onChangeDoctor = useCallback(
    (doctor) => {
      dispatch(
        receptionsActions.setSelectedReception({
          ...selectedReception,
          doctor,
        })
      );
    },
    [dispatch, selectedReception]
  );

  const onChangeDate = useCallback(
    (date) => {
      dispatch(
        receptionsActions.setSelectedReception({
          ...selectedReception,
          date,
        })
      );
    },
    [dispatch, selectedReception]
  );

  const onChangeComplaint = useCallback(
    (complaint) => {
      dispatch(
        receptionsActions.setSelectedReception({
          ...selectedReception,
          complaint,
        })
      );
    },
    [dispatch, selectedReception]
  );

  const handleChangeName = useCallback((e: HandleChangeEvent): void => {
    onChangeName(e.target.value);
  }, []);

  const handleChangeDoctor = useCallback((e: HandleChangeEventSelect): void => {
    onChangeDoctor(e.target.value);
  }, []);

  const handleChangeData = useCallback((e: HandleChangeEvent): void => {
    onChangeDate(e.target.value);
  }, []);

  const handleChangeComplaint = useCallback(
    (e: HandleChangeEventTextArea): void => {
      onChangeComplaint(e.target.value);
    },
    []
  );

  const formattedDate = useCallback(
    () => moment(new Date(date)).format("YYYY-MM-DD"),
    [date]
  );

  return (
    <span className="edit-modal-content">
      <Input
        title="Имя"
        id="edit-modal-name"
        type="text"
        value={name}
        onChange={handleChangeName}
      />
      <Select
        title="Врач"
        id="edit-modal-doctor"
        list={doctorName}
        value={doctor}
        onChange={handleChangeDoctor}
      />
      <Input
        title="Дата"
        id="edit-modal-date"
        type="date"
        value={formattedDate()}
        onChange={handleChangeData}
      />
      <label className="edit-modal__complaint" htmlFor="edit-modal-complaint">
        Жалобы:
      </label>
      <textarea
        id="edit-modal-complaint"
        className="edit-modal-content__textarea"
        value={complaint}
        onChange={handleChangeComplaint}
      />
    </span>
  );
};

export default EditModalForm;
