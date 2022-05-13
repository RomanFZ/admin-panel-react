import React, { FC } from "react";

import CommonSelect from "../../Select";
import { PropsSelect } from "../../Select/Select";
import { ErrorContainer } from "../StylesReduxForm";

export interface Select extends PropsSelect {
  input?: any;
  meta?: any;
  border?: boolean;
}

const Select: FC<Select> = ({
  hiddenOption,
  type,
  meta,
  list,
  input,
  value,
  title,
  id,
  border,
}) => {
  return (
    <>
      <CommonSelect
        title={title}
        id={id}
        border={meta.touched && meta.error}
        list={list}
        type={type}
        hiddenOption
        value={value}
        onChange={input.onChange}
      />
      {meta.error && meta.touched && (
        <ErrorContainer>{meta.error}</ErrorContainer>
      )}
    </>
  );
};

export default Select;
