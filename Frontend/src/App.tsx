import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import RegistrationPage from "./pages/RegistrationPage";
import AuthorizationPage from "./pages/AuthorizationPage";
import ReceptionsPage from "./pages/ReceptionsPage";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/registration" component={RegistrationPage} />
        <Route path="/authorization" component={AuthorizationPage} />
        <Route path="/main" component={ReceptionsPage} />
        <Redirect path="/" to="/authorization" />
      </Switch>
    </div>
  );
}

export default App;
