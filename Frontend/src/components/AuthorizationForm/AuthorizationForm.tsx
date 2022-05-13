import React, { FC, useCallback, useState } from "react";
import { push } from "connected-react-router";

import { useDispatch, useSelector } from "react-redux";
import userActions from "../../redux/actions/userActions";
import { AppDispatch, RootState } from "../../redux/store";

import { Input, Button } from "../../common";

import { HandleChangeEvent } from "../../tsTypes/interfaces";

import "./AuthorizationForm.scss";

const AuthorizationForm: FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.user.error);

  const authorizationUser = useCallback(
    (data) => {
      dispatch(userActions.fetchSetUserAuthorization(data));
    },
    [dispatch]
  );

  const goRegistration = useCallback(() => {
    dispatch(push("/registration"));
  }, [dispatch]);

  const handleChangeLogin = useCallback((e: HandleChangeEvent): void => {
    setLogin(e.target.value);
  }, []);

  const handleChangePassword = useCallback((e: HandleChangeEvent): void => {
    setPassword(e.target.value);
  }, []);

  const handleSubmitForm = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const data = {
        login: login,
        password: password,
      };
      authorizationUser(data);
    },
    [authorizationUser, login, password]
  );

  return (
    <>
      <form onSubmit={handleSubmitForm} className="form">
        <h2 className="form__authorization-heading">Войти в систему</h2>
        {error && <div className="form__authorization-warning">{error}</div>}
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
        <div className="form__buttons">
          <Button title="Воити" type="button-in-form button__full-width" />
          <Button
            title="Зарегистрироваться"
            onClick={goRegistration}
            type="contained button-in-form button__full-width button__add-frame"
          />
        </div>
      </form>
    </>
  );
};

export default AuthorizationForm;
