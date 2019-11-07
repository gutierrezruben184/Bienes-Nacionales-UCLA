import React from "react"
import { Router, Switch, Route } from "react-router-dom"
import { PrivateRoute, PublicRoute } from "./utils/Routes"
import { createBrowserHistory } from "history"
import NotFound404 from "./components/NotFound404"
import Login from "./views/Login"
import Menu from "./views/Menu"

const hist = createBrowserHistory();

function Routes() {
  return (
    <Router history={hist}>
      <Switch>
        <PrivateRoute component={Menu} path="/menu" />
        <PublicRoute component={Login} path="/" exact/>
        <Route component={NotFound404} />
      </Switch>
    </Router>
  );
}

export default Routes;
