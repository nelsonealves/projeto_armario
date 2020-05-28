import React from 'react';
import './css/sidebar.css';
import {Link} from 'react-router-dom'

const Sidebar = props => {
    return(
        <div>
            <nav  className="navbar navbar-expand bg-dark navbar-dark text-center">
            <a className="navbar-brand">
                <img src="./logo-intelbras.svg" alt="logo" width="80px"/>
            </a>
            
        </nav>
        </div>
    )
}

export default Sidebar;