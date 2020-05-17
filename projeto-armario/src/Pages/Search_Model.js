import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {Combobox, Modal, Form, Tab} from './Utils.js'
import './css/sidebar.css';
import history from './../history';
import Table from './Table_product.js'


class Search_Model extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            redirect:null,
            content: null,
            all_loan: null,
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

    componentDidMount = async () => {
        await this.fetch_get("all_loans", "all_loan");
        
        let data = []

        if (this.state.all_loan != null) {
            this.state.all_loan.map(item => {
            
                let obj = {id: item._id, body: []};
                obj.body.push(item.user.name);
                obj.body.push(item.product.model.name);
                obj.body.push(item.product.status);
                data.push(obj);
            
            });
            this.home(data);
        } else {
            alert("Nenhum produto foi emprestado até o momento");
            history.push('/search');
        }


        
    }
    
    fetch_get = async (path, state) => {
        await fetch("http://localhost:8081/"+path, { method: 'GET' })
        .then((resp) => { return resp.json(); })
        .then((data) => {
            this.setState({[state]: data}); 
            }).catch((err) => {
            console.log(err);
            })
    }

    home = (data) => {

        this.setState({content: this.select_search(data)})
    }

    select_search = (data) => {
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
                    <b>Tela apenas para consulta de todos os produtos emprestados que voltam ou não.</b>

                    <Table header={['Model', 'Usuário', 'Status']} data={data} row_select={this.row_select} filter={true} />
                </div>
                
            </div>
        )
    }

    row_select = () => {

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

export default Search_Model;