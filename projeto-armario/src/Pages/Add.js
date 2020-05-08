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
            aux.push(item[option])
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
                    
                        <div className="centerly">
                            <i onClick={() => {this.add_form_product()}} className="material-icons ">thumb_up</i>
                        </div>
                        <div className="centerly">
                            <i onClick={() => {this.create_product()}} className="material-icons">thumb_down</i>
                        </div>
                </div>
                </div>
            
        )
    }
    
    
      ///////////////////////////////////// ADD FORM PRODUCT////////////////////////////////////////
    add_form_product = () => {
        let comb_model = this.get_combobox(this.state.all_models, "models", "name");
        let comb_cabinet = this.get_combobox(this.state.all_cabinet, "cabinet", "name");
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
                <div className="form-group">
                  <label htmlFor="pwd"><b>Então selecione o modelo,</b></label>
                    {comb_model}                 
                </div>
                <div className="form-group">
                  <label htmlFor="pwd"><b>em qual armário está e</b></label>
                    {comb_cabinet}
                </div>
                <div className="form-group">
                  <label htmlFor="pwd"><b>qual a quantidade:</b></label>
                  <input type="input" name="quantidade" className="form-control" />
                </div>
                <div clasName="row">
                    <i class="material-icons">add_circle</i> <span><b>Adicionar</b></span>
                </div>
                
              </div>
            </div>
          </div>
        )
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
                    <div className="centerly">
                    <i onClick={() => {this.select_provider("yes")}} className="material-icons">thumb_up</i>
                    </div>
                    <div className="centerly">
                    <i onClick={() => {this.select_provider("no")}} className="material-icons">thumb_down</i>
                    </div>
                </div>
            </div>
        )
    }

    select_provider = (answer) => {
        let comb_cabinet = this.get_combobox(this.state.all_cabinet, "cabinet", "name");
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
                    <div className="form-group">
                        <label htmlFor="pwd"><b>Então selecione o fornecedor,</b></label>
                        {comb_provider}                 
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd"><b>informe qual o nome do novo modelo,</b></label>
                        <input type="input" name="quantidade" className="form-control" />                 
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
                        <i class="material-icons">add_circle</i> <span><b>Adicionar</b></span>
                    </div>
                </div>
                
                
            </div>
        } else {
            content = <div className="row">
                <div className="col-12">
                <div className="form-group">
                    <div className="row"><b>Então informe o nome do novo fornedor,</b></div>
                    <div className="row">
                    <input type="input" name="provider" class="form-control" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="row"><b>do modelo,</b></div>
                    <div className="row">
                    <input type="input" name="provider" class="form-control" />
                    </div>
                </div>
                <div className="form-group">
                        <div className="row"><label htmlFor="pwd"><b>em qual armário está e</b></label></div>
                        <div className="row">{comb_cabinet}</div>
                </div>
                <div className="form-group">
                    <div className="row"><b>quantas peças está adicionando deste modelo:</b></div>
                    <div className="row">
                    <input type="input" name="provider" class="form-control" />
                    </div>
                </div>
                <div clasName="row">
                    <i class="material-icons">add_circle</i> <span><b>Adicionar</b></span>
                </div>
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