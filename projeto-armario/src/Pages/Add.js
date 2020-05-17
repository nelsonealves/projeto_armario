import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {Combobox, Modal, Form, Tab} from './Utils.js'
import './css/sidebar.css';

import history from './../history';

class Add extends Component {
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
        this.form_product = this.form_product.bind(this);
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

    /////////////////////////////                UPDATES              ////////////////////////////
    fetch_get = (path, state) => {
        fetch("http://localhost:8081/"+path, { method: 'GET' })
        .then((resp) => { return resp.json(); })
        .then((data) => {
            this.setState({[state]: data}); 
            }).catch((err) => {
            console.log(err);
            })
    }
    ////////////////////////// UPDATE COMBOBOX ////////////////////////////////////////
    get_combobox = (object, name_, option) =>{
        let aux = [];
        object.map( item => {
            aux.push({id: item._id, name: item[option]});
        });
        return <Combobox name={name_} option={aux} />
    }

    ////////////////////////// HOME //////////////////////////////////////////////////
    home = () => {
        this.setState({content: this.provider()})
    }
    provider = () => {
        return (
            <div>
                <div onClick={() => {this.onSubmit('/')}} >
                    <div className="row">
                        <div className="text-left" className="col-4">
                            <i className="material-icons">keyboard_backspace</i>
                        </div>
                    </div>
                </div>
                
                    <div className="row text-center">
                        <div className="centerly">
                            <strong>A amostra já está cadastrada?</strong>
                        </div>
                        
                    </div>
                
                <div className="row">
                    
                        <div style={{cursor: 'pointer'}} onClick={() => {this.add_form_product()}} className="centerly">
                            <i  className="material-icons ">thumb_up</i>
                            <div class="row"><div className="centerly"><span class="my-auto">Sim</span></div></div>
                        </div>
                        <div style={{cursor: 'pointer'}} onClick={() => {this.create_product()}}  className="centerly">
                            <i className="material-icons">thumb_down</i>
                            <div class="row"><div className="centerly"><span class="my-auto">Não</span></div></div>
                        </div>
                </div>
                </div>
            
        )
    }
    
    
      ///////////////////////////////////// ADD FORM PRODUCT////////////////////////////////////////
    add_form_product = () => {
        let comb_model = this.get_combobox(this.state.all_models, "models", "name");
        let comb_cabinet = this.get_combobox(this.state.all_cabinet, "cabinet", "code");
        this.setState({content: this.form_product(comb_cabinet, comb_model)})
    }
    form_product = (comb_cabinet, comb_model) => {
        return (
          <div>
            <div onClick={() => {this.home()}} className="col-4">
                <div className="row"><div className="text-center"><i className="material-icons">keyboard_backspace</i></div></div>
            </div>

            <div className='row'>
              <div className='col-sm-12'>
              <form className='form' onSubmit={this.add_product}>                  
                <div className="form-group">
                  <label htmlFor="model"><b>Então selecione o modelo,</b></label>
                    {comb_model}                 
                </div>
                <div className="form-group">
                  <label htmlFor="cabinet"><b>em qual armário está e</b></label>
                    {comb_cabinet}
                </div>
                <div className="form-group">
                  <label htmlFor="quant"><b>qual a quantidade:</b></label>
                  <input type="input" name="quantidade" className="form-control" />
                </div>
                <div clasName="row">
                    <button type="submit" class="btn btn-success">Adicionar</button>
                </div>
                </form>
                
              </div>
            </div>
          </div>
        )
      }

      add_product = (event) => {
        event.preventDefault();
        let user = new FormData(event.target);
        console.log(user.get('models'));
        console.log(user.get('cabinet'));
        console.log(user.get('quantidade'));

        let data_m = {};
        this.state.all_models.map(item => {
            if(item.name == user.get('models')) data_m.model = item._id;
        });
        this.state.all_cabinet.map(item => {
            if(item.code == user.get('cabinet')) data_m.cabinet = item._id;
        });

        data_m.name = user.get('model');
        

        let data_model = {model: data_m.model, cabinet: data_m.cabinet}
        let products = [];
        
        for (let i =0; i < parseInt(user.get('quantidade', 10)); i++) {
            products.push(data_model);
        }
        console.log("products");
        console.log(products);
        fetch('http://localhost:8081/products', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(products)
            }).then(function (res) { return res.json(); })
            .then(function (data) {
                if(data != undefined){
                alert('Produto adicionado com sucesso');
                } else { 
                alert('Problema ao adicionar produto');  
                }
            })
            this.onSubmit('/');
      }
      /////////////////////////////// CREATE PRODUCT /////////////////////////////
    create_product = () => {
        
        this.setState({content: this.ask_provider()});
    }  

    ask_provider = () => {
       
        return (
            <div>
                <div onClick={() => {this.home()}} className="col-4">
                    <div className="row"><div className="text-center"><i className="material-icons">keyboard_backspace</i></div></div>
                </div>
                <div className="row">
                    <div className="centerly">
                        <strong>Já possui fornecedor cadastrado??</strong>
                    </div>
                </div>
                <div className="row">
                    <div style={{cursor: 'pointer'}} onClick={() => {this.select_provider("yes")}} className="centerly">
                    <i className="material-icons">thumb_up</i>
                    <div class="row"><div className="centerly"><span class="my-auto">Sim</span></div></div>
                    </div>
                    <div style={{cursor: 'pointer'}} onClick={() => {this.select_provider("no")}}  className="centerly">
                    <i className="material-icons">thumb_down</i>
                    <div class="row"><div className="centerly"><span class="my-auto">Não</span></div></div>
                    </div>
                </div>
            </div>
        )
    }

    select_provider = (answer) => {
        let comb_cabinet = this.get_combobox(this.state.all_cabinet, "cabinet", "code");
        if (answer == "yes") {
            let comb_provider = this.get_combobox(this.state.all_provider, "provider", "name");
            
            this.setState({content: this.render_provider(answer, comb_provider, comb_cabinet)});
        } else {
            this.setState({content: this.render_provider(answer, "" , comb_cabinet)});
        }
    }

    render_provider = (answer, comb_provider, comb_cabinet) => {
        let content = null;
        if (answer == "yes"){
            content = <div className="row">
                <div className="col-12">
                    <form onSubmit={this.add_model}>
                        <div className="form-group" >
                            <label htmlFor="pwd"><b>Então selecione o fornecedor,</b></label>
                            {comb_provider}                 
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd"><b>informe qual o nome do novo modelo,</b></label>
                            <input type="input" name="model" className="form-control" />                 
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd"><b>em qual armário vai ser colocado e</b></label>
                            {comb_cabinet}
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd"><b>qual a quantidade de amostras:</b></label>
                            <input type="input" name="quantidade" className="form-control" />
                        </div>
                        <div clasName="row">
                            <button type="submit" class="btn btn-success">Adicionar</button>
                        </div>
                    </form>
                </div>
                
                
            </div>
        } else {
            content = <div className="row">
                <div className="col-12">
                <form onSubmit={this.add_model_provider}>
                    <div className="form-group">
                        <div className="row"><b>Então informe o nome do novo fornedor,</b></div>
                        <div className="row">
                        <input type="input" name="provider" class="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row"><b>do modelo,</b></div>
                        <div className="row">
                        <input type="input" name="model" class="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                            <div className="row"><label htmlFor="pwd"><b>em qual armário está e</b></label></div>
                            <div className="row">{comb_cabinet}</div>
                    </div>
                    <div className="form-group">
                        <div className="row"><b>quantas peças está adicionando deste modelo:</b></div>
                        <div className="row">
                        <input type="input" name="quantidade" class="form-control" />
                        </div>
                    </div>
                    <div clasName="row">
                        <button type="submit" class="btn btn-success">Adicionar</button>
                    </div>
                </form>
                </div>
                
            </div>
        }
        return(
            <div>
                <div onClick={() => {this.create_product()}} className="col-4">
                    <div className="row"><div className="text-center"><i className="material-icons">keyboard_backspace</i></div></div>
                </div>
                {content}
            </div>
        )
    }

    add_model = () => {
        event.preventDefault();
        let user = new FormData(event.target);
        console.log(user.get('provider'));
        console.log(user.get('model'));
        console.log(user.get('cabinet'));
        console.log(user.get('quantidade'));
         
        let data_m = {cabinet:''}
        this.state.all_provider.map(item => {
            if(item.name == user.get('provider')) data_m.provider = item._id;
        });
        this.state.all_cabinet.map(item => {
            if(item.code == user.get('cabinet')) data_m.cabinet = item._id;
        });

        data_m.name = user.get('model');
        
        fetch('http://localhost:8081/model', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(data_m)
            }).then(function (res) { return res.json();})
            .then(function (data) {
                let data_model = {model: data._id, cabinet: data_m.cabinet}
                let products = [];
                
                for (let i =0; i < parseInt(user.get('quantidade',10)); i++) {
                    products.push(data_model);
                }
                fetch('http://localhost:8081/products', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                        body: JSON.stringify(products)
                    }).then(function (res) { return res.json(); })
                    .then(function (data) {
                        if(data != undefined){
                        alert('Produto adicionado com sucesso');
                        } else { 
                        alert('Problema ao adicionar produto');  
                        }
                    })
    })
    this.onSubmit('/');
    
      
    }


    add_model_provider = () => {
        event.preventDefault();
        let user = new FormData(event.target);
        
        let data_p = {name: user.get('provider')};
        this.state.all_cabinet.map(item => {
            if(item.code == user.get('cabinet')) data_p.cabinet = item._id;
        });

        fetch('http://localhost:8081/provider', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(data_p)
            }).then(function (res) { return res.json();})
            .then(function (data) {
                let data_m = {name: user.get('model'), provider: data._id};
                fetch('http://localhost:8081/model', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                      body: JSON.stringify(data_m)
                  }).then(function (res) { return res.json();})
                    .then(function (data) {
                        let data_model = {model: data._id, cabinet: '', }
                        let products = [];
                        
                        data_model.cabinet = data_p.cabinet;
                        for (let i =0; i < parseInt(user.get('quantidade',10)); i++) {
                            products.push(data_model);
                        }
                        fetch('http://localhost:8081/products', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                                body: JSON.stringify(products)
                            }).then(function (res) { return res.json(); })
                            .then(function (data) {
                                if(data != undefined){
                                alert('Produto adicionado com sucesso');
                                } else { 
                                alert('Problema ao adicionar produto');  
                                }
                            })
            })
        })
        this.onSubmit('/');
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return(
            <div>
                    <div>
                        <div className="container">
                                
                                    {this.state.content}
                                
                            
                        </div>
                    </div>
            </div>
        )
    }
}


export default Add;