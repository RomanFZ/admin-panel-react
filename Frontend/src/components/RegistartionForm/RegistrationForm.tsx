import React, { useState, useCallback, FC } from "react";
import { push } from "connected-react-router";

import userActions from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

import { Input, Button } from "../../common";

import { HandleChangeEvent } from "../../tsTypes/interfaces";

import "./RegistrationForm.scss";

const RegistrationForm: FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.user.error);

  const createNewUser = useCallback(
    (data) => {
      dispatch(userActions.fetchSetUserRegistration(data));
    },
    [dispatch]
  );

  const goAuthorization = useCallback(() => {
    dispatch(push("/authorization"));
  }, [dispatch]);

  const handleChangeLogin = useCallback((e: HandleChangeEvent): void => {
    setLogin(e.target.value);
  }, []);

  const handleChangePassword = useCallback((e: HandleChangeEvent): void => {
    setPassword(e.target.value);
  }, []);

  const handleChangeRepeatPassword = useCallback(
    (e: HandleChangeEvent): void => {
      setRepeatPassword(e.target.value);
    },
    []
  );

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (password === repeatPassword) {
        const data = {
          login: login,
          password: password,
        };
        createNewUser(data);
      } else {
        alert("Пароли не совпадают");
      }
    },
    [createNewUser, login, password, repeatPassword]
  );

  return (
    <>
      <form onSubmit={handleSubmitForm} className="form">
        <h2 className="form__registration-heading">Регистрация</h2>
        {error && <div className="form__registration-warning">{error}</div>}
        <Input
          title="Login"
          id="login-input"
          type="text"
          value={login}
          required
          minLength={6}
          onChange={handleChangeLogin}
        />
        <Input
          title="Password"
          id="password-input"
          type="password"
          value={password}
          onChange={handleChangePassword}
          required
          minLength={6}
          pattern={"[A-Za-z].*\\d|\\d.*[A-Za-z]"}
        />
        <Input
          title="Repeat password"
          id="repeat-password-input"
          type="password"
          value={repeatPassword}
          onChange={handleChangeRepeatPassword}
          required
          minLength={6}
          pattern={"[A-Za-z].*\\d|\\d.*[A-Za-z]"}
        />
        <div className="form__buttons">
          <Button
            title="Зарегистрироваться"
            type="button-in-form button__full-width"
          />
          <Button
            title="Авторизоваться"
            onClick={goAuthorization}
            type="button-in-form button__full-width button__add-frame"
          />
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
