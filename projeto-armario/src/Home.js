import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Armarios from './Pages/Armarios'
import Estoque from './Pages/Estoque'
import Produtos from './Pages/Produtos'
import Usuarios from './Pages/Usuarios'
import Sidebar from './Pages/Sidebar'

class Home extends Component {
  render(){
    return(
        <div>
            <BrowserRouter>
                <div>
                    <Sidebar/>
                    <div id="container-fluid">
                        <Route path='/' exact component={Estoque}/>
                        <Route path='/armarios'  component={Armarios}/>
                        <Route path='/usuarios' component={Usuarios}/>
                        <Route path='/produtos' component={Produtos}/>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
}
}

export default Home;
