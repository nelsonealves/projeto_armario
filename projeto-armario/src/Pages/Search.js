import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {Combobox, Modal, Form, Tab} from './Utils.js'
import './css/sidebar.css';
import history from './../history';
import Kitchen from '@material-ui/icons/Kitchen';
import BusinessCenter from '@material-ui/icons/BusinessCenter';
import PhoneIphone from '@material-ui/icons/PhoneIphone';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            redirect:null,
            content: null,
            all_provider: null,
            all_models: null,
            all_products: null,
            all_cabinet: null
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (path) => {
        // console.log(path);
        // this.setState({redirect:path})
        history.push(path);
    }

    componentDidMount(){
        this.fetch_get("all_provider", "all_provider");
        this.fetch_get("all_models", "all_models");
        this.fetch_get("all_product", "all_products");
        this.fetch_get("all_cabinets", "all_cabinet");
        this.home();
    }

    fetch_get = (path, state) => {
        fetch("http://localhost:8081/"+path, { method: 'GET' })
        .then((resp) => { return resp.json(); })
        .then((data) => {
            this.setState({[state]: data}); 
            }).catch((err) => {
            console.log(err);
            })
    }

    home = () => {
        this.setState({content: this.select_search()})
    }

    select_search = () => {
        return (
            <div>
                <div onClick={() => {this.onSubmit('/')}} >
                    <div className="row">
                        <div className="text-left" className="col-4">
                            <i className="material-icons">keyboard_backspace</i>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <b>Selecione a opção na qual deseja realizar a busca:</b>
                </div>
                <div className="row">
                    <div onClick={() => {this.onSubmit('/search_cabinet')}} class="col-4">
                            <div class="row"><div className="text-center centerly"><Kitchen/></div></div>
                            <div class="row"><div className="centerly"><span class="my-auto">Por armário</span></div></div>
                    </div>
                    <div onClick={() => {this.onSubmit('/search_provider')}} class="col-4">
                            <div class="row"><div className="text-center centerly"><BusinessCenter/></div></div>
                            <div class="row"><div className="centerly"><span class="my-auto">Por fornecedor</span></div></div>
                    </div>
                    <div onClick={() => {this.onSubmit('/search_model')}} class="col-4">
                            <div class="row"><div className="text-center centerly"><PhoneIphone/></div></div>
                            <div class="row"><div className="centerly"><span class="my-auto">Emprestados/Não voltam</span></div></div>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        return(
            <div>
                    <div>
                        <div class="container">
                            {this.state.content}
                        </div>
                    </div>
            </div>
        )
    }
}

export default Search;