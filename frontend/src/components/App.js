import React from 'react';
import Drawer from './Drawer/Drawer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {PrivateRoute, PublicRoute} from '../utils/Routes'
import NotFound404 from './NotFound404'
import Login from './Login/Login'

function App() {
  return (
    <div >
      <Router>
        <Switch>
            <PrivateRoute component={Drawer} path="/Menu" exact />
            <PublicRoute  component={Login} path="/" exact />
            {/* <Route component={NotFound404} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
