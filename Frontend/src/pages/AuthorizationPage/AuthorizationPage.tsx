import React, { FC } from "react";

import Header from "../../components/Header/Header";
import AuthorizationForm from "../../components/AuthorizationForm";

import "./AuthorizationPage.scss";
import Hosp from "../../icons/Hosp.svg";

const AuthorizationPage: FC = () => {
  return (
    <>
      <Header title={"Войти в систему"} />
      <div className="container">
        <div className="authorization-container">
          <div className="authorization">
            <div className="authorization__image">
              <img
                className="authorization__image-hosp"
                src={Hosp}
                alt="Госпиталь"
              />
            </div>
            <div className="authorization__form">
              <AuthorizationForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorizationPage;
