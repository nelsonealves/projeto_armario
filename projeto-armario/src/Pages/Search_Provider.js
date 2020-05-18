import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {Combobox, Modal, Form, Tab} from './Utils.js'
import Table from './Table_product.js'
import './css/sidebar.css';
import history from './../history';
import Estoque from './Estoque.js'



  
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
            all_cabinet: null,
            table_models: null
        };
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    onSubmit = (path) => {
        // console.log(path);
        // this.setState({redirect:path})
        history.push(path);
    }

    async componentDidMount(){
        await this.fetch_get('all_provider', 'all_provider');
        await this.fetch_get("all_models", "all_models");
        await this.fetch_get("all_product", "all_products");
        // this.fetch_get("all_cabinets", "all_cabinet");
        this.home();
    }

    get_combobox = (object, name_, option) => {
        let aux = [];
        object.map( item => {
            aux.push({id: item._id, name: item[option]});
        });
        
        return <Combobox selected={this.select_provider} name={name_} option={aux} />
    }

    select_provider = (value) => {
        console.log('change');
        let product_groupby = [];
        this.state.all_provider.map(provider => {
            if( value == provider.name) { 
                console.log("encontrou");
                this.state.all_models.map(model => {
                    if (model.provider == provider._id) {
                        let model_obj = {id: model._id, body: [model.name, 0, 0, 0]}
                        this.state.all_products.map(product => {
                            if (product.model._id == model._id) {
                                if(product.status == '0'){    
                                    model_obj.body[1] = model_obj.body[1] + 1;
                                    console.log(model.name);
                                } 
                                if(product.status == '1'){    
                                    model_obj.body[2] = model_obj.body[2] + 1;
                                    console.log(model.name);
                                } 
                                if(product.status == '2'){    
                                    model_obj.body[3] = model_obj.body[3] + 1;
                                    console.log(model.name);
                                } 
                            } 
                        });
                        product_groupby.push(model_obj);
                    }
                });
            }
        });
        console.log('product_groupby');
        console.log(product_groupby);
        this.setState({table_models:this.table_model(product_groupby)});
    }

    table_model = (product_groupby) => {
        return(
            <React.Fragment>
            <div className="row">
                <strong>Agora selecione o modelo desejado:</strong>    
            </div>
            <Table 
                header={["Modelo", "Disponiveis", 'Emprestados', 'Não voltam']}
                data={product_groupby} 
                row_select={this.select_model} 
                filter={true} 
            />
            </React.Fragment>
        )

    }
    select_model = (value) => {
        console.log("clicou");
        console.log(value);
        let props = {header: ['Modelo', 'Armário', 'Status'], body: []};

        this.state.all_products.map(product => {
            
            if (product.model._id == value.body.id) {
                if (product.status == '0') {
                    let product_obj = {id: product._id, body: []}
                    console.log('product encontrado');
                    console.log(product);
                    product_obj.body.push(product.model.name);
                    product_obj.body.push(product.cabinet.code);
                    product_obj.body.push(product.status);
                    props.body.push(product_obj);
                }    
            }
            
        })
        
        console.log("PROPS");
        console.log(props);
        this.setState({table_models: null});
        this.setState({content: this.return_estoque(props)});

    }

    return_estoque = (props) => {
        return (
            <React.Fragment>
                <strong> Na tabela abaixo, apenas os produtos disponíveis são apresentados. 
                    Para visualizar quem está em posse dos produtos emprestados ou que não voltam,  
                    <button onClick={()=>{history.push('/search_model');}} class="btn btn-info">clique aqui</button>  </strong>
                <br/>
                <Estoque data={props} back={this.back}/>
            </React.Fragment>
        )
    }

    back = () => {
        this.home();
    }

    fetch_get = async (path, state) => {
        await fetch("http://localhost:8081/"+path, { method: 'GET' })
        .then((resp) => { return resp.json(); })
        .then((data) => {
            this.setState({[state]: data}); 
            }).catch((err) => {
            console.log(err);
            });
    }

    home = () => {
        console.log('this.state.all_provider');
        console.log(this.state.all_provider);
        let provider = this.state.all_provider;
        provider = provider.sort((a,b) => {
            if (a.name > b.name )return 1; 
            if (b.name > a.name) return -1;
            return 0;
          });
        let comb_model = this.get_combobox(provider, "provider", "name");
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
                            {this.state.table_models}
                        </div>
                    </div>
            </div>
        )
    }
}

export default Search_Provider;