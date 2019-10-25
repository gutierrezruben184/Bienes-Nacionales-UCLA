import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Decanato from "./components/Decanato";
import Departamento from "./components/Departamento";
import Marca from "./components/Marca";
import Equipo from "./components/Equipo";

export default class AppRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/menu/decanato" component={Decanato} key={0} />
        <Route path="/menu/departamento" component={Departamento} />
        <Route path="/menu/marca" component={Marca} />
        <Route path="/menu/equipo" component={Equipo} />
        <Redirect from="/menu" to="/menu/departamento" />
      </Switch>
    );
  }
}
