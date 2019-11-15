import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Decanato from "./components/Decanato";
import Departamento from "./components/Departamento";
import Marca from "./components/Marca";
import Equipo from "./components/Equipo";
import Usuario from "./components/Usuario";
import CantTotalEquipos from "./components/CantTotalEquipos/CanTotalEquipos";
import Navegacion from "./components/Solicitudes/Navegacion";
import RedesSociales from "./components/RedesSociales";

export default class AppRouter extends React.Component {
  render() {
    const us = JSON.parse(localStorage.getItem('usuario'));
    console.log("usuario")
    console.log(us)
    console.log(us.tipo == "1")
    return (
      <Switch>
        {us.tipo === "1" ? (
          // Rutas para el admin
          <React.Fragment>
            <Route path="/menu/decanato" component={Decanato} />
            <Route path="/menu/departamento" component={Departamento} />
            <Route path="/menu/marca" component={Marca} />
            <Route path="/menu/equipo" component={Equipo} />
            <Route path="/menu/usuario" component={Usuario} />
            <Route path="/menu/totalequipos" component={CantTotalEquipos} />
            <Route path="/menu/solicitudes" component={Navegacion} />
            <Route path="/menu/home" component={RedesSociales} />
            <Redirect from="/menu" to="/menu/home" />
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
