import React from 'react';
import './css/sidebar.css';
import {Link} from 'react-router-dom'

const Sidebar = props => {
    return(
        <div>
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <img width='180' src="./logo-intelbras.svg"/>
                    </div>
                    <ul class="nav navbar-nav">
                        <li><Link to='/'><a href="" className="text-decoration-none bg-dark text-light">Estoque</a></Link></li>
                        <li><Link to='/armarios'><a href="" className=" list-group-item-action bg-dark text-light">Armários</a></Link></li>
                        <li><Link to='/usuarios'><a href="" className="list-group-item list-group-item-action bg-light">Usuários</a></Link></li>
                        <li> <Link to='/produtos'><a href="" className="list-group-item list-group-item-action bg-light">Produtos</a></Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar;