import React, { FC } from "react";

import Header from "../../components/Header/Header";
import RegistrationForm from "../../components/RegistartionForm/RegistrationForm";

import "../AuthorizationPage/AuthorizationPage.scss";
import Hosp from "../../icons/Hosp.svg";

const RegistrationPage: FC = () => (
  <>
    <Header title={"Зарегистрироваться в системе"} />
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
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default RegistrationPage;
