import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

import history from './../history';

class Search extends Component {
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
                                <div onClick={() => {this.onSubmit('/')}} class="col-4">
                                        <div class="row"><div className="text-center"><i class="material-icons">keyboard_backspace</i></div></div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Search;