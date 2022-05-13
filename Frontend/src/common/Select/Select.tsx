import React, { FC } from "react";

import { HandleChangeEventSelect } from "../../tsTypes/interfaces";

import "./Select.scss";

export interface PropsSelect {
  title?: string;
  id: string;
  list?: any;
  value?: string;
  hiddenOption?: boolean;
  type?: string;
  border?: boolean;
  onChange(e: HandleChangeEventSelect): void;
}

const Select: FC<PropsSelect> = (props) => {
  const { title, id, value, onChange, list, hiddenOption, type, border } =
    props;

  return (
    <>
      {title && (
        <label className="select__description" htmlFor={id}>
          {title}:
        </label>
      )}

      <select
        id={id}
        className={`select ${type} ${border && "select-add-border-red"}`}
        value={value}
        onChange={onChange}
      >
        {hiddenOption && <option hidden />}
        {list.map((item: any, index: number) => (
          <option key={`${title} - ${index}`} value={item.value}>
            {item?.name || item}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
