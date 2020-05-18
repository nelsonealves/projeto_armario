import React, { Component } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import Armarios from './Pages/Armarios'
import Estoque from './Pages/Estoque'
import Produtos from './Pages/Produtos'
import Usuarios from './Pages/Usuarios'
import Add from './Pages/Add'
import Search from './Pages/Search'
import Devolute from './Pages/Devolute'
import Main from './Main'
import Search_Cabinet from './Pages/Search_Cabinet'
import Search_Model from './Pages/Search_Model'
import Search_Provider from './Pages/Search_Provider'
import history from './history';


export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path='/' exact  component={Main}/>
                    <Route path='/search_cabinet' component={Search_Cabinet}/>
                    <Route path='/search_provider' component={Search_Provider}/>
                    <Route path='/search_model' component={Search_Model}/>
                    <Route path='/armarios'  component={Armarios}/>
                    <Route path='/users' component={Usuarios}/>
                    <Route path='/products' component={Produtos}/>
                    <Route path='/add' component={Add}/>
                    <Route path='/search' component={Search}/>
                    <Route path='/devolute' component={Usuarios}/>
                    
                </Switch>

            </Router>
        )
    }
}