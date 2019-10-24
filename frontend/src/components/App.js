import React from 'react';
import Drawer from './Drawer/Drawer';
import { BrowserRouter as Router } from "react-router-dom"

function App() {
  return (
    <div >
      <Router>
        <Drawer />
      </Router>
    </div>
  );
}

export default App;
