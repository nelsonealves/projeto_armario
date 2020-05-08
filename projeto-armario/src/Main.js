import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import './Pages/css/sidebar.css';
import history from './history';

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
            <div>
                    <div>
                        <div class="container">
                            <div class="row">
                                <div onClick={() => {this.onSubmit('/add')}} class="col-4">
                                        <div class="row"><div className="text-center centerly"><i class="material-icons">playlist_add</i></div></div>
                                        <div class="row"><div className="centerly"><span class="my-auto">Adicionar amostra</span></div></div>
                                </div>
                                <div onClick={() => {this.onSubmit('/search')}} class="col-4">
                                        <div class="row"><div className="text-center centerly"><i class="material-icons">search</i></div></div>
                                        <div class="row"><div className="centerly"><span class="my-auto">Localizar amostra</span></div></div>
                                </div>
                                <div onClick={() => {this.onSubmit('/devolute')}} class="col-4">
                                        <div class="row"><div className="text-center centerly"><i class="material-icons">save_alt</i></div></div>
                                        <div class="row"><div className="centerly"><span class="my-auto">Devolver amostra</span></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Main;