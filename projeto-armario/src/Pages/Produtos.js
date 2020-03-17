import React, { Component } from 'react';
import {Combobox, Modal, Form, Tab} from './Utils.js'
import DatePicker from 'react-datepicker';
import Table from './Table_product.js'

import "react-datepicker/dist/react-datepicker.css";

class Produtos extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      row_select: [], // Row select when click in the table
      row_select_e: [],
      all_provider: [],
      provider_table: [],
      provider_combobox: [], 
      provider_combobox_selected: [],
      all_product: [], 
      products: [], 
      cabinet: [], 
      all_cabinet: [],
      all_users: [],
    };
    
    this.update_models = this.update_models.bind(this);
    this.form_product = this.form_product.bind(this);
    this.update_provider = this.update_provider.bind(this);
    this.update_cabinet = this.update_cabinet.bind(this);
    this.add_provider = this.add_provider.bind(this);
  }

  componentDidMount(){
    this.update_models();
    this.update_cabinet();
    this.update_provider();
    
  }

  //////////////////////////////////////////////// UPDATES /////////////////////////////

  update_provider = async () => {
    
    let table = [];
    let aux = [];
    
    await fetch("http://localhost:8081/all_provider", { method: 'GET' })
    .then((resp) => { return resp.json(); })
    .then((data) => {
      console.log("ALL PROVIDER");
      console.log(data);
      this.setState({all_provider: data});
        data.map((item, i) => {
      //    aux.push(data[i].name);
      let object = {id:null, body:[]}
          object.id = item._id
          aux.push(item.name);
          object.body = aux;
          table.push(object);
          aux = [];
        });
      
        this.setState({provider_table: table});
     }).catch((err) => {
       console.log(err);
     })

  }

  async update_models () {
    let aux = [];
    let combobox = [];
    await fetch("http://localhost:8081/all_models", { method: 'GET' })
    .then((resp) => { return resp.json(); })
    .then((data) => {
      this.setState({all_product: data});
       data.map((item, i) => {
         aux.push(data[i].name);
        
       });
         this.setState({ products: aux});
     }).catch((err) => {
       console.log(err);
     })

     this.state.all_provider.map((item) => {
       combobox.push(item.name)
     });

     console.log("COMBOBOXX");
     console.log(combobox);
     this.setState({provider_combobox: combobox});
  }

  async update_cabinet () {
    let aux = [];
    
    await fetch("http://localhost:8081/all_cabinets", { method: 'GET' })
    .then((resp) => { return resp.json(); })
    .then((data) => {
      this.setState({all_cabinet: data});
       data.map((item, i) => {
         aux.push(data[i].name);
       });
         this.setState({cabinet: aux});
     }).catch((err) => {
       console.log(err);
     })
  }

  ////////////////////////////////////////////////// FORMS //////////////////////////

  form_model = () => {
    return (
      <div>
        <div className='row'>
          <div className='col-sm-12'>
          <div class="form-group">
              <label for="pwd"><b>Fornecedor:</b></label>
              <Combobox name={"product"} option={this.state.provider_combobox} />
            </div>
            <div class="form-group">
              <label for="pwd"><b>Modelo:</b></label>
              <input type="input" name="model" class="form-control" />
            </div>
            
          </div>
        </div>
      </div>
    )
  }


  form_product = () => {
    return (
      <div>
        <div className='row'>
          <div className='col-sm-12'>
            <div class="form-group">
              <label for="pwd"><b>Modelo:</b></label>
             
            </div>
            <div class="form-group">
              <label for="pwd"><b>Quantidade:</b></label>
              <input type="input" name="quantidade" class="form-control" />
            </div>
            <div class="form-group">
              <label for="pwd"><b>Armário:</b></label>
              <Combobox name={"cabinet"} option={this.state.cabinet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  form_provider = () => {
    return (
      <div>
        <div class="form-group">
          <div className='row'>
            <label for="pwd"><b>Fornecedor:</b></label>
          </div>
          <div className='row'>
            <input type="input" name="provider" class="form-control" />
          </div>
        </div>
      </div>
    )
  }
  
  ////////////////////////////////////////////////////////// ADD /////////////////////////////////
  add_provider = async (value) => {
    let data = {
      name: value.get('provider'),
    }

    await fetch('http://localhost:8081/provider', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(data)
    }).then(function (res) { return res.json();})
      .then(function (data) {
        if(data !== undefined){
          alert('Modelo adicionado com sucesso');
          
        } else { 
          alert('Problema ao adicionar modelo');  
        }
      })
      this.update_provider();
  }
  

  add_model = (value) => {
    
    let data = {
      name: value.get('model'),
    }

    fetch('http://localhost:8081/model', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(data)
    }).then(function (res) { return res.json();})
      .then(function (data) {
        if(data !== undefined){
          alert('Modelo adicionado com sucesso');
        } else { 
          alert('Problema ao adicionar modelo');  
        }
      })
  }
  
  add_product = (value) => {
    
    let data = {
      name: value.get('product'),
      qtd: value.get('quantidade'),
      cabinet: value.get('cabinet'),
      id_model: null,
      id_cabinet: null
    }
    let aux = [];
    console.log(data);
    console.log("this.state.all_product");
    console.log(this.state.all_product);
    this.state.all_product.map(item => {
      if(item.name == data.name){
        data.id_model = item._id;
      }
    });

    this.state.all_cabinet.map(item => {
      if(item.name == data.cabinet){
         data.id_cabinet = item._id;
      }
    });

    for(let i=0; i < data.qtd; i++){
      aux.push({model:data.id_model, cabinet: data.id_cabinet});
    }
    console.log("OLHA O AUX");
    console.log(aux);
    fetch('http://localhost:8081/products', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(aux)
    }).then(function (res) { return res.json(); })
      .then(function (data) {
        if(data != undefined){
          alert('Produto adicionado com sucesso');
        } else { 
          alert('Problema ao adicionar produto');  
        }
      })
  }

  /////////////////////////////////////////////////////////// SELECT /////////////////////////

  click = (value) => {
  
    let action = {
      "Fornecedor": this.update_provider(),
      "Modelo": this.update_models(),
      "Produto": this.update_cabinet() && this.update_models()
    };
    action[value.target.innerHTML];
  
  }

  select_provider = (value) => {
    console.log("selecionado");
    console.log(value);
    document.getElementById("button_provider").click();
  }

  render(){
    
    return(
        <div>
            <div class="col-sm-6">
                
            <ul class="nav nav-tabs">
              <li class="nav-item" onClick={this.click}>
                <a class="nav-link" data-toggle="tab" href="#home">Fornecedor</a>
              </li>
              <li class="nav-item" onClick={this.click}>
                <a class="nav-link" data-toggle="tab" href="#menu1">Modelo</a>
              </li>
              <li class="nav-item" onClick={this.click}>
                <a class="nav-link" data-toggle="tab" href="#menu2">Produto</a>
              </li>
            </ul>

                <div class="tab-content">
                  <div class="tab-pane active container" id="home" >
                    <Form form={this.form_provider()} return={this.add_provider}/>
                    <div class="row">
                      <Table 
                        header={["Nome"]} 
                        data={this.state.provider_table} 
                        id_select={this.state.id_user_select} 
                        row_select={this.select_provider} 
                        filter={true} 
                      />
                      <button id="button_provider" type="button" style={{display:"none"}} data-toggle="modal" data-target='#show_provider'> Nova concessionária</button>
                      <Modal 
                        id={'show_provider'}
                        header={'Usuário'} 
                        body={""}
                        footer={''}
                      />
                    </div>
                 </div>
                <div class="tab-pane container" id="menu1">
                    <div className="row">      
                      <Form form={this.form_model()} return={this.add_model}/>
                    </div>
                </div>
                <div class="tab-pane container" id="menu2">
                      <Form form={this.form_product()} return={this.add_product}/>
                </div> 
                  </div>
                </div>
                
        </div>
    )
}
}

export default Produtos;
