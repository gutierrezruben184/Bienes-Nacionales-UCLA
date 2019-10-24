import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import {PrivateRoute, PublicRoute} from './utils/Routes'

import NotFound404 from './components/NotFound404'
import App from './components/App';
import Login from './components/Login/Login';


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <PrivateRoute component={App} path="/Menu" exact />
            <PublicRoute  component={Login} path="/" exact />
            <Route component={NotFound404} />
        </Switch>
    </BrowserRouter>, 
    document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
