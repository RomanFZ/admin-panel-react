import React, { FC } from "react";

import { HandleChangeEvent } from "../../tsTypes/interfaces";

import "./Input.scss";

export interface PropsInput {
  title: string;
  id: string;
  type: string;
  value: string;
  required?: boolean;
  minLength?: number;
  pattern?: string;
  input?: any;
  border?: boolean;
  onChange(e: HandleChangeEvent): void;
}

const Input: FC<PropsInput> = (props) => {
  const {
    title,
    id,
    type,
    value,
    required = false,
    minLength,
    pattern,
    onChange,
    border,
  } = props;

  return (
    <>
      <label className="input__description" htmlFor={id}>
        {title}:
      </label>
      <input
        id={id}
        className={`input__form ${border && "add-border-red"}`}
        type={type}
        value={value}
        placeholder={title}
        required={required}
        minLength={minLength}
        onChange={onChange}
        pattern={pattern}
      />
    </>
  );
};

export default Input;
