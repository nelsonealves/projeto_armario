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

    handleChange = (event, props) => {
        
        this.setState({[props]: event.target.value});
        
    } 

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    }

    handleMouseDownPassword = () => {

    }

    submit = () => {
        
    }

  render(){
    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="stretch" spacing={2}>
                <Grid xs={12} item>
                    <div className="border box-login">
                        
                        <div className="row">
                        <FormControl fullWidth={true}>
                        <InputLabel htmlFor="standard-adornment-password">Matrícula</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            value={this.state.user}
                            onChange={(event) => {this.handleChange(event, 'user')}}
                            fullWidth={true}
                        />
                        </FormControl>
                        </div>
                        <div className="row">
                        
                        <FormControl fullWidth={true}>
                        <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={(event) => {this.handleChange(event, 'password')}}
                            
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                                >
                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                        </FormControl>

                        </div>
                        <div className="row">
                        <Button onClick={this.submit} variant="contained" 
                            style={{
                                width:"100%", 
                                backgroundColor: '#4CAF50',
                                marginTop: '20px',
                                color: 'white' }}>
                            LOGIN
                        </Button>
                        </div>
                    
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
}

export default Login;
