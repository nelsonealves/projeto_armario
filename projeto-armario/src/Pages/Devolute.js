import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

import history from './../history';

class Devolute extends Component {
    constructor(props) {
        super(props);
        this.state = { redirect:null, content: null};
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (path) => {
        // console.log(path);
        // this.setState({redirect:path})
        history.push(path);
    }
    componentDidMount(){
        this.setState({content: this.provider()})
        
    }
    
    provider = () => {
        return (
            <div>
                <div class="row">
                    <strong>Amostra já existe?</strong>
                </div>
                <div class="row">
                    <div class="col-6">
                    <i class="material-icons">thumb_up</i>
                    </div>
                    <div class="col-6">
                    <i class="material-icons">thumb_down</i>
                    </div>
                </div>
            </div>
        )
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
                                <div onClick={() => {this.onSubmit('/')}} class="col-4">
                                        <div class="row"><div className="text-center"><i class="material-icons">keyboard_backspace</i></div></div>
                                </div>
                                {this.state.content}
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Devolute;