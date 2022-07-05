import React, { FC } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import receptionsActions from "../../redux/actions/receptionsActions";
import { Field, reduxForm, reset } from "redux-form";
import {
  maxLength15,
  minLength2,
  required,
} from "../../common/ReduxFormFields/Validate";

import Input from "../../common/ReduxFormFields/Input/Input";
import Select from "../../common/ReduxFormFields/Select/Select";
import { Button } from "../../common";

import "./AddingReception.scss";

const AddingReception: FC = (props: any) => {
  const dispatch = useDispatch();
  const doctorName = useSelector(
    (state: RootState) => state.receptions.config.doctorName
  );

  const handleSubmit = (values: any) => {
    const userId = localStorage.getItem("userId");
    const receptionValue = { ...values, userId };
    dispatch(receptionsActions.addingReception(receptionValue));
    dispatch(reset("AddingReception"));
  };

  return (
    <div className="adding-reception">
      <form
        onSubmit={props.handleSubmit(handleSubmit)}
        className="adding-reception__form"
      >
        <div className="adding-reception__form-block">
          <Field
            name="name"
            component={Input}
            title="Имя"
            id="reception-add-name"
            validate={[required, maxLength15, minLength2]}
          />
        </div>
        <div className="adding-reception__form-block">
          <Field
            name="doctor"
            component={Select}
            title="Врач"
            list={doctorName}
            id="reception-add-doctor"
            validate={[required]}
          />
        </div>
        <div className="adding-reception__form-block">
          <Field
            name="date"
            component={Input}
            title="Дата"
            type="Date"
            id="reception-add-name"
            validate={[required, maxLength15, minLength2]}
          />
        </div>
        <div className="adding-reception__form-block">
          <Field
            name="complaint"
            component={Input}
            title="Жалоба"
            id="reception-add-name"
            validate={[required, maxLength15, minLength2]}
          />
        </div>
        <div className="adding-reception__button">
          <Button title="Добавить" type="button__hover-not" />
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "AddingReception",
})(AddingReception);
