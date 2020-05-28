import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';


import history from '../history';

import './css/login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            password: '',
            user: ''
        }
    }

    componentDidMount(){
        console.log('LOCATIONN');
        window.location = "https://sso.intelbras.com.br/auth/realms/intelbras/protocol/openid-connect/auth?client_id=IntelbrasWhereIs&response_type=code";
    }

   render(){
    return(
        <div>
           {this.state.content}
        </div>
    )
}
}

export default Login;
