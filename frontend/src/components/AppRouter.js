import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Decanato from './Decanato'
import Departamento from './Departamento'

export default class AppRouter extends React.Component{
    render(){
        return(
           <div>
            <Route exact path='/menu/decanato' component={Decanato} />
            <Route exact path='/menu/departamento' component={Departamento} />
            </div>        
        )
    }
}