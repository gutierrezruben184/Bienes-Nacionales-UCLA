import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Decanato from "./components/Decanato";
import Departamento from "./components/Departamento";
import Marca from "./components/Marca";
import Equipo from "./components/Equipo";
import CantTotalEquipos from "./components/CantTotalEquipos/CanTotalEquipos";

export default class AppRouter extends React.Component {
  render() {
    const us = localStorage.getItem("tipoUsuario");
    return (
      <Switch>
        {us === "1" ? (
          // Rutas para el admin
          <React.Fragment>
            <Route path="/menu/decanato" component={Decanato} />
            <Route path="/menu/departamento" component={Departamento} />
            <Route path="/menu/marca" component={Marca} />
            <Route path="/menu/equipo" component={Equipo} />
            <Route path="/menu/totalequipos" component={CantTotalEquipos} />
            <Redirect from="/menu" to="/menu/decanato" />
          </React.Fragment>
        ) : (
          // Rutas para el empleado
          <React.Fragment>
            <Route path="/menu/equipo" component={Equipo} />
            <Redirect from="/menu" to="/menu/equipo" />
          </React.Fragment>
        )}
      </Switch>
    );
  }
}
