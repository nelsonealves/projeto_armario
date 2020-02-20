import React, { Component } from 'react';
import {Modal, Form, Tab} from './Utils.js'
//import Table from './Table.js'
import Table from './Table_product.js'
import Table_s from './Table_select.js'
class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [], 
      product_user:[],
      product_user_e:[],
      row_select: [],
      id_user_select: [],
    };
    this.row_select = this.row_select.bind(this);
    this.populate_table = this.populate_table.bind(this);
    this.populate_product = this.populate_product.bind(this);
    this.value_filter = this.value_filter.bind(this);
    this.user_info = this.user_info.bind(this);
    this.modal_user = this.modal_user.bind(this);
    this.row_select = this.row_select.bind(this);
    this.row_select_e = this.row_select_e.bind(this);
    // this.table_report_block = false;
  }

  componentDidMount() {
    this.populate_table();
  }

  async populate_table(){
     
      let table = [];
      let aux = [];
      let aux1 = [];
  
      await fetch("http://localhost:8081/all_users", { method: 'GET' })
      .then((resp) => { return resp.json(); })
      .then((data) => {
        data.map((item, i) => {
          if(!item.loan){
            let object = {id:null, body:[]}
            object.id = item._id
            aux.push(item.name);
            aux.push(item.matricula);
            object.body = aux;
            table.push(object);
            aux = [];
          }
        });
      this.setState({ data: table,});
      }).catch((err) => {
        console.log(err);
      })
      
  }

  async populate_product(value){
    console.log(value.body.id);
    document.getElementById("button_modal").click();
    let table = [];
    let aux = [];
    let aux1 = [];

    await fetch("http://localhost:8081/user/"+ value.body.id +"/products", { method: 'GET' })
    .then((resp) => { return resp.json(); })
    .then((data) => {
      console.log(data);
       data.map((item, i) => {
         console.log("item.model")
         console.log(item.model);
         if(item.loan){
           let object = {id:null, body:[]}
           object.id = item.model._id
           
           aux.push(item.model.name);
           console.log("item.model.name");
           console.log(item.model.name); 
           object.body = aux;
           table.push(object);
           aux = [];
         }
      });
      console.log("table")
      console.log(table)
    this.setState({ product_user: table});
    }).catch((err) => {
      console.log(err);
    })
    
}


  form_user = () => {
    return (
      <div>
        <div className='row'>
          <div className='col-sm-12'>
            <div class="form-group">
              <label for="pwd"><b>Nome:</b></label>
              <input type="input" name="name" class="form-control  " />
            </div>
            <div class="form-group">
              <label for="pwd"><b>Matricula:</b></label>
              <input type="input" name="matricula" class="form-control" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  add_device = (value) => {
    let data = {
      name: value.get('name'),
      matricula: value.get('matricula'),
    }
    console.log(data);

    fetch('http://localhost:8081/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(data)
    }).then(function (res) { return res.json(); })
      .then(function (data) {
        if(data != undefined){
          alert('Usuário adicionado com sucesso');
        } else { 
          alert('Problema ao adicionar usuário');  
        }
      })
      console.log(this);
      
  }
  
  row_select = (value) => {
    
  }

  user_info = () => {
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

  async value_filter(value){
    //console.log(value);
    if(value == ""){
      this.populate_table();
    } else { 
      let table = [];
        let aux = [];
        let aux1 = [];
      await fetch("http://localhost:8081/user/" + value + "/matricula", { method: 'GET' }).then((resp) => { return resp.json(); }).then((data) => {
        data.map((item, i) => {
          aux.push(data[i].name);
          aux.push(data[i].matricula);
          aux1.push(data[i]._id);
          table.push(aux);
          aux = [];
        });
        this.setState({ data: table, id_user_select: aux1 });
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  modal_user = () => {
    return (
      <div>
        <div class="col-sm-6">
          <Table_s header={["Produto"]} data={this.state.product_user} id_select={""} row_select={this.row_select} filter={true} />
        </div>
        <div class="col-sm-6">
        <div class="row">
                        <button type="submit" class="btn btn-success">Devolver</button>
                      </div>
          <Table_s header={["Produto"]} data={this.state.product_user_e} id_select={""} row_select={this.row_select_e} filter={true} />
        </div>
      </div>
    )
  }

  row_select = (value) => {
    console.log(value);
    console.log("value.body")
    console.log(value.body);
    // console.log(value);
    let aux = [];
    let aux_e = [];
    
    aux = this.state.product_user;
    aux_e = this.state.product_user_e;
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
    this.setState({product_user: aux})
    this.setState({product_user_e: aux_e})
  }

  row_select_e = (value) => {
    console.log(value);
    console.log("OPAAA");
    let aux = [];
    let aux_e = [];
    
    aux = this.state.product_user_e;
    aux_e = this.state.product_user;
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
   
    this.setState({product_user: aux_e})
    this.setState({product_user_e: aux})
  }

  render(){
    
    return(
        <div>
            <div class="col-sm-6">
            <a class="accordion-toggle" data-toggle="collapse" href="#demo">Novo usuario</a>
              <div id="demo" class="collapse">
                <Form form={this.form_user()} return={this.add_device}/>
              </div>
              <div className="row">
                <Table header={["Nome", "Matrícula"]} data={this.state.data} id_select={this.state.id_user_select} row_select={this.populate_product} filter={true} value_filter={this.value_filter}/>
              </div>
              <button id="button_modal" type="button" style={{display:"none"}} data-toggle="modal" data-target='#create_dealership'> Nova concessionária</button>
              </div>
              <div class="col-sm-10">
                <Modal 
                  id={'create_dealership'} 
                  header={'Usuári'} 
                  body={this.modal_user()} 
                  footer={''}
                />
                </div>
            
        </div>
    )
}
}

export default Usuarios;
