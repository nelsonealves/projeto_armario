import React, { Component } from 'react';

import {Combobox, Modal, Form, Tab} from './Utils.js'
import DatePicker from 'react-datepicker';
import Table from './Table_product.js'

class Estoque extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [], // All data products
      id_user_select: [], // Array with id's products
      users: [],
      date: new Date(),
      id_user_select_e:[], 
      data_e: [] 
    }
    this.row_select = this.row_select.bind(this);
  }

  componentDidMount(){
    
    
    this.populate_table();
    this.populate_users();
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
    )
}
}

export default Estoque;
