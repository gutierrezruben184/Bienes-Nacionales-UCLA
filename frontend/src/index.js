import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './router';
import Drawer from './views/Drawer/Drawer'


ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
