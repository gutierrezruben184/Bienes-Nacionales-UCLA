import React from 'react';
import Drawer from './Drawer/Drawer';
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
    <div >
      {/* <Router>
        <Switch>
            <PrivateRoute component={Drawer} path="/Menu" exact />
            <PublicRoute  component={Login} path="/" exact />
            <Route component={NotFound404} />
        </Switch>
      </Router> */}
      <Router>
        <Drawer/>
      </Router>
    </div>
  );
}

export default App;
