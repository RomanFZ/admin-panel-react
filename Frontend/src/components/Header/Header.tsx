import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import receptionsAction from "../../redux/actions/receptionsActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import userActions from "../../redux/actions/userActions";

import { Button } from "../../common";

import "./Header.scss";
import Logo from "../../icons/Logo.svg";

interface HeaderProps {
  title: string;
  withExitButton?: boolean;
}

const Header = ({ title, withExitButton = false }: HeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const exitButton = useCallback(() => {
    dispatch(receptionsAction.setReceptions([]));
    dispatch(userActions.setLogout);
  }, [dispatch]);

  return (
    <>
      <header className={`header ${title === "Приёмы" && "header__fix"}`}>
        <img className="header__logo" src={Logo} alt="Лого" />
        <h1 className="header__registration-heading heading__fix-sing">
          {title}
        </h1>
        <Link to="/authorization">
          {withExitButton && <Button title="Выход" onClick={exitButton} />}
        </Link>
      </header>
    </>
  );
};

export default Header;
