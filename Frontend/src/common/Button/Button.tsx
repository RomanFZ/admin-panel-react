import React, { FC } from "react";

import "./Button.scss";

export interface PropsButton {
  width?: string;
  title: string;
  onClick?(e: any): void;
  disabled?: boolean;
  type?: string;
}

const Button: FC<PropsButton> = (props) => {
  const { title, onClick, type, disabled = false } = props;

  return (
    <button onClick={onClick} disabled={disabled} className={`button ${type}`}>
      {title}
    </button>
  );
};

export default Button;
