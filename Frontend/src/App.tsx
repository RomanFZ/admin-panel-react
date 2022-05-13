import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import RegistrationPage from "./pages/RegistrationPage";
import AuthorizationPage from "./pages/AuthorizationPage";
import ReceptionsPage from "./pages/ReceptionsPage";
import ExampleSessionHook from "./MyCustomHooks/ExampleSessionHook";
import ExampleNetworkHook from "./MyCustomHooks/ExampleNetworkHook";

import "./App.scss";
import ExamplePaginationHook from "./MyCustomHooks/Pagination";
import MyCustomPagination from "./MyCustomHooks/MyCustomPagination.";

function App() {
  return (
    <div className="App">
      <Switch>
        {/*<Route path="/registration" component={RegistrationPage} />*/}
        {/*<Route path="/authorization" component={AuthorizationPage} />*/}
        {/*/!*<Route path="/ExampleSessionHook" component={ExampleSessionHook} />*!/*/}
        {/*<Route path="/ExampleNetworkHook" component={ExampleNetworkHook} />*/}
        {/*<Route*/}
        {/*  path="/ExamplePaginationHook"*/}
        {/*  component={ExamplePaginationHook}*/}
        {/*/>*/}
        <Route path="/MyCustomPagination" component={MyCustomPagination} />
        {/*<Route path="/main" component={ReceptionsPage} />*/}
        {/*<Redirect path="/" to="/authorization" />*/}
      </Switch>
    </div>
  );
}

export default App;
