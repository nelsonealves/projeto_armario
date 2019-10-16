import React from 'react';
import './css/sidebar.css';
import {Link} from 'react-router-dom'

const Sidebar = props => {
    return(
        <div>
            <nav className="navbar navbar-expand bg-dark navbar-dark">
            <a className="navbar-brand">
                <img src="./logo-intelbras.svg" alt="logo" width="80px"/>
            </a>

            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to='/'>
                       <a href="" className="nav-link"> Estoque </a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/armarios'>
                    <a href="" className="nav-link">  Armários </a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/usuarios'>
                    <a href="" className="nav-link"> Usuários </a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/produtos'>
                    <a href="" className="nav-link"> Produtos </a>
                    </Link>
                </li>
            </ul>

            </nav>
        </div>
    )
}

export default Sidebar;