import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import './Pages/css/sidebar.css';
import history from './history';
import './Pages/css/page.css'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { redirect:null};
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (path) => {
        // console.log(path);
        // this.setState({redirect:path})
        history.push(path);
    }
    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return(
            <div className="box-page">
                <div className="centerly">
                    <div className="row centerly">
                        <h4>Seja bem-vindo ao WhereIs!</h4>
                    </div>
                    <div className="row centerly">
                        <h6 style={{color: 'gray'}}>Software para controle de amostras.</h6>
                    </div>
                    
                </div>
            <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                <Grid item  md={4}>
                    <div style={{cursor: 'pointer'}} onClick={() => {this.onSubmit('/add')}} >
                        <div class="row"><div className="text-center centerly"><i class="material-icons">playlist_add</i></div></div>
                        <div class="row"><div className="centerly"><span class="my-auto">Adicionar amostra</span></div></div>
                    </div>
                </Grid>
                <Grid item md={12} x>
                    <div style={{cursor: 'pointer'}} className="bow-shadow" onClick={() => {this.onSubmit('/search')}} >
                        <div class="row"><div className="text-center centerly"><i class="material-icons">search</i></div></div>
                        <div class="row"><div className="centerly"><span class="my-auto">Localizar amostra</span></div></div>
                    </div>
                </Grid>
                <Grid md={12} item>
                    <div style={{cursor: 'pointer'}} className="box-shadow" onClick={() => {this.onSubmit('/devolute')}} >
                        <div class="row"><div className="text-center centerly"><i class="material-icons">save_alt</i></div></div>
                        <div class="row"><div className="centerly"><span class="my-auto">Devolver amostra</span></div></div>
                    </div>
                </Grid>
            </Grid>
            </div>
        )
    }
}

export default Main;