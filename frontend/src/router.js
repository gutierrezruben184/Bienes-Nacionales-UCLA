import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./utils/Routes";
import { createBrowserHistory } from "history";
import NotFound404 from "./components/NotFound404";
import Login from "./views/Login";
import Drawer from "./views/Drawer/Drawer";
import Decanato from "./components/Decanato";

const hist = createBrowserHistory();

function Routes() {
  return (
    <Router history={hist}>
      <Switch>
        <Route component={Drawer} path="/Menu" />
        <Route component={Login} path="/"  />
        <Route component={NotFound404} />
      </Switch>
    </Router>
  );
}

export default Routes;
