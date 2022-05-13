import React, { FC } from "react";

import CommonInput from "../../Input";
import { PropsInput } from "../../Input/Input";
import { ErrorContainer } from "../StylesReduxForm";

export interface Input extends PropsInput {
  input?: any;
  meta?: any;
  warn?: any;
}

const Input: FC<Input> = ({ warn, meta, type, input, value, title, id }) => {
  return (
    <>
      <CommonInput
        title={title}
        id={id}
        type={type}
        value={value}
        {...input}
        border={meta.touched && meta.error}
      />
      {meta.error && meta.touched && (
        <ErrorContainer>{meta.error}</ErrorContainer>
      )}
    </>
  );
};

export default Input;
