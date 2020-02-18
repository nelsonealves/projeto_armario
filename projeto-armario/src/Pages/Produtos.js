import React, { Component } from 'react';
import {Combobox, Modal, Form, Tab} from './Utils.js'
import DatePicker from 'react-datepicker';
import Table from './Table_product.js'

import "react-datepicker/dist/react-datepicker.css";

class Produtos extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [], // All data products
      row_select: [], // Row select when click in the table
      id_user_select: [], // Array with id's products
      data_e: [], 
      row_select_e:[], 
      id_user_select_e:[],  
      all_product: [], 
      products: [], 
      cabinet:[], 
      all_cabinet:[],
      users: [],
      all_users: [],
      date: new Date(),
    };
    this.row_select = this.row_select.bind(this);
    this.update_models = this.update_models.bind(this);
    this.form_product = this.form_product.bind(this);
    this.populate_table = this.populate_table.bind(this);
    this.populate_users = this.populate_users.bind(this);
    // this.table_report_block = false;
  }

  componentDidMount(){
    this.update_models();
    this.update_cabinet();
    this.populate_table();
    this.populate_users();
  }

  async populate_table(){
     
    let table = [];
    let aux = [];
  
    
    await fetch("http://localhost:8081/all_product", { method: 'GET' })
    .then((resp) => { return resp.json(); })
    .then((data) => {
      data.map((item, i) => {
        let object = {id:null, body:[]}
        if(!item.loan){
          object.id = item._id
          aux.push(item.model.name);
          aux.push(item.cabinet.name);
          object.body = aux;
          table.push(object);
          aux = [];
        }
      });
      
      this.setState({ data: table });
    }).catch((err) => {
      console.log(err);
    })
    
  }

  async populate_users () {
    let aux = [];
    
    await fetch("http://localhost:8081/all_users", { method: 'GET' })
    .then((resp) => { return resp.json(); })
    .then((data) => {
      data.map((item, i) => {
        aux.push(data[i].matricula);
      });
      aux.sort();
      this.setState({all_users: data});
      this.setState({users: aux});
     }).catch((err) => {
       console.log(err);
     })
  }

  async update_models () {
    let aux = [];
    
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

  form_model = () => {
    return (
      <div>
        <div className='row'>
          <div className='col-sm-12'>
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
              <Combobox name={"product"} option={this.state.products} />
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

  row_select = (value) => {
    console.log("value.body")
    console.log(value.body);
    // console.log(value);
    let aux = [];
    let aux_e = [];
    
    aux = this.state.data;
    aux_e = this.state.data_e;
    //console.log(this.state.data_e);

    aux_e.push(value.body);
    aux.forEach((element, id) => {
      console.log("element.id");
      console.log(element.id);
      console.log("value.id");
      console.log(value.body.id);
      if(element.id == value.body.id){
        console.log("encontrou");
        console.log(id)
        aux.splice(id,1);
      }
    })
    // console.log("auxe body")
    // console.log(aux_e)
    // aux1_e.push(value.body)
    this.setState({data: aux})
    this.setState({data_e: aux_e})
  }

  row_select_e = (value) => {
    console.log("OPAAA");
    let aux = [];
    let aux_e = [];
    
    aux = this.state.data_e;
    aux_e = this.state.data;
    //console.log(this.state.data_e);
    aux_e.push(value.body);
    
    
    aux.forEach((element, id) => {
      console.log("element.id");
      console.log(element.id);
      console.log("value.id");
      console.log(value.body.id);
      if(element.id == value.body.id){
        console.log("encontrou");
        console.log(id)
        aux.splice(id,1);
      }
    })
    console.log("aux");
    console.log(aux);
    console.log("aux_e");
    console.log(aux_e);
   
    this.setState({data: aux_e})
    this.setState({data_e: aux})
  }

  add_product_user = event => {
    let data = {}
    let aux_product = [];
    event.preventDefault();
    let user = new FormData(event.target);
    
    let user_name = user.get("user");
    
    // Adding user
    this.state.all_users.forEach(item => {
      if(item.matricula === user_name){
        data.user = item._id;
      }
    });
    // Adding products
    this.state.data_e.forEach(item => {
      aux_product.push(item.id);
    });
    data.product = aux_product;
    // Adding Date
    data.date = this.state.date;

    // Adding return
    if(user.get("return") == null) {
      data.return = false;
    } else {
      data.return = true
    }
    
    
    console.log(data);
    
    
    fetch('http://localhost:8081/loan', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(data)
    }).then(function (res) { return res.json(); })
      .then(function (data) {
        if(data != undefined){
          alert('Empréstimo realizado');
        } else { 
          alert('Problema ao realizar empréstimo');  
        }
      })
  }

  onChange = date => this.setState({ date: date })

  render(){
    
    return(
        <div>
            <div class="col-sm-6">
                <div className="row"> 
                    <a class="accordion-toggle" data-toggle="collapse" href="#demo1">Novo Modelo</a>
                    <div id="demo1" class="collapse">
                      <div className="row">      
                        <Form form={this.form_model()} return={this.add_model}/>
                      </div>
                    </div>
                </div>
                <div className="row">
                  <a class="accordion-toggle" data-toggle="collapse" href="#demo2">Novo Produto</a>
                  <div id="demo2" class="collapse">
                      <Form form={this.form_product()} return={this.add_product}/>
                  </div>
                </div> 
                </div>
                <div className="row">
                  <div class="col-sm-6">
                    <Table header={["Nome", "Local"]} data={this.state.data} id_select={this.state.id_user_select} row_select={this.row_select} filter={true} />
                  </div>
                  <div class="col-sm-6">
                    <form className='form' onSubmit={this.add_product_user}>
                      <div class="form-group">
                        <div class="row">
                          <Combobox name={"user"} option={this.state.users} />
                        </div>
                      </div>
                      <div class="row">
                        <div class="custom-control custom-switch">
                          <input type="checkbox" name="return" class="custom-control-input" id="customSwitches"/>
                          <label class="custom-control-label" for="customSwitches">Produto será devolvido?</label>
                        </div>
                        <div>
                          <DatePicker
                          onChange={this.onChange}
                          selected={this.state.date}
                          />
                        </div>
                      </div>
                      <div class="row">
                        <button type="submit" class="btn btn-success">Adicionar</button>
                      </div>
                    </form>
                    <div class="row">
                    <Table header={["Nome", "Local"]} data={this.state.data_e} id_select={this.state.id_user_select_e} row_select={this.row_select_e} filter={true} />
                    </div>
                  </div>
            </div>
        </div>
    )
}
}

export default Produtos;
