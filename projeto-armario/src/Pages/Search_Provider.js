import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {Combobox, Modal, Form, Tab} from './Utils.js'
import './css/sidebar.css';
import history from './../history';
import Kitchen from '@material-ui/icons/Kitchen';
import BusinessCenter from '@material-ui/icons/BusinessCenter';
import PhoneIphone from '@material-ui/icons/PhoneIphone';


class Search_Provider extends Component {
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
        this.get_provider();
        // this.fetch_get("all_models", "all_models");
        // this.fetch_get("all_product", "all_products");
        // this.fetch_get("all_cabinets", "all_cabinet");
        this.home();
    }

    get_combobox = (object, name_, option) =>{
        let aux = [];
        object.map( item => {
            aux.push({id: item._id, name: item[option]});
        });
        return <Combobox name={name_} option={aux} />
    }

    get_provider = (path, state) => {
        let that = this;
        fetch("http://localhost:8081/all_provider", { method: 'GET' })
        .then((resp) => { return resp.json(); })
        .then((data) => {
            that.setState({all_provider: data}); 
            
            }).catch((err) => {
            console.log(err);
            })
            
    }

    fetch_get = (path, state) => {
        let that = this;
        fetch("http://localhost:8081/"+path, { method: 'GET' })
        .then((resp) => { return resp.json(); })
        .then((data) => {
            that.setState({[state]: data}); 
            }).catch((err) => {
            console.log(err);
            })
    }

    home = () => {
        console.log('this.state.all_provider');
        console.log(this.state.all_provider);
        let comb_model = this.get_combobox(this.state.all_provider, "provider", "name");
        this.setState({content: this.select_search(comb_model)});
    }


    select_search = (comb_model) => {
        return (
            <div>
                <div onClick={() => {this.onSubmit('/search')}} >
                    <div className="row">
                        <div className="text-left" className="col-4">
                            <i className="material-icons">keyboard_backspace</i>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <strong>Selecione o fabricante: </strong>
                    {comb_model}
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

export default Search_Provider;