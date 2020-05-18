import React, { Component } from 'react';
import {Modal, Form, Tab} from './Utils.js'

import Table from './Table_product.js'
import history from './../history';

class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [], 
      product_user:[],
      product_user_e:[],
      row_select: [],
      id_user_select: [],
      loan: [],
      all_loans: []      
    };
    this.row_select = this.row_select.bind(this);
    this.populate_table = this.populate_table.bind(this);
    this.populate_product = this.populate_product.bind(this);
    this.value_filter = this.value_filter.bind(this);
    this.user_info = this.user_info.bind(this);
    this.modal_user = this.modal_user.bind(this);
    this.row_select = this.row_select.bind(this);
    this.row_select_e = this.row_select_e.bind(this);
    this.devolute = this.devolute.bind(this);
    // this.table_report_block = false;
  }

  componentDidMount() {
    this.fetch_get("all_loans", 'all_loans');
    this.populate_table();
  
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

  async populate_table(){
     console.log("populate_table");
      let table = [];
      let aux = [];
      let aux1 = [];
  
      await fetch("http://localhost:8081/all_users", { method: 'GET' })
      .then((resp) => { return resp.json(); })
      .then((data) => {
        console.log(data);
        data.map((item, i) => {
          
          
            let object = {id:null, body:[]}
            object.id = item._id
            aux.push(item.name);
            aux.push(item.matricula);
            object.body = aux;
            table.push(object);
            aux = [];
          
        });
      this.setState({ data: table});
      }).catch((err) => {
        console.log(err);
      })
      
  }

  async populate_product(value){
    console.log(value.body.body[1]);
    
    let table = [];
   
    this.state.all_loans.map( event => {
      let obj = {id: null, body:[]}
      if (event.user.matricula == value.body.body[1]) {
        if(event.product.status == "1"){
          obj.id = event._id;
          console.log('Possui produto');
          console.log(event.product.model.name);
          obj.body.push(event.product.model.name, event.product.cabinet.code);
        }
      }
      table.push(obj); 
  });

  this.setState({product_user: table});
    
  document.getElementById("button_modal").click();
}

  form_user = () => {
    return (
      <div>
        
          <div className='col-sm-12'>
            <div class="form-group">
            <div class="row">
              <label for="pwd"><b>Nome:</b></label>
            </div>
            <div class="row">
              <input type="input-sm" name="name" class="form-control  " />
            </div>
            </div>
            <div class="form-group">
              <div class="row">
                <label for="pwd"><b>Matricula:</b></label>
              </div>
              <div class="row">
                <input type="input-sm" name="matricula" class="form-control" />
              </div>
            </div>
          </div>
      </div>

    )
  }

  add_device = async (value) => {
    let data = {
      name: value.get('name'),
      matricula: value.get('matricula'),
    }
    
    
    await fetch('http://localhost:8081/user', {
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
      
      this.populate_table();
      
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
        <div className="row">
          W
        </div>
        <div className="row">
          <div class="col-xl-6">
            <Table header={["Produto", 'Armário']} data={this.state.product_user} id_select={""} row_select={this.row_select} filter={true} />
          </div>
          <div class="col-xl-6">
          <div class="row">
            <button type="submit" onClick={this.devolute} class="btn btn-success">Devolver</button>
          </div>
            <Table header={["Produto", "Armário"]} data={this.state.product_user_e} id_select={""} row_select={this.row_select_e} filter={true} />
          </div>
        </div>
      </div>
    )
  }

  row_select = (value) => {
    
    let aux = [];
    let aux_e = [];
    
    aux = this.state.product_user;
    aux_e = this.state.product_user_e;
    aux_e.push(value.body);
    aux.forEach((element, id) => {
    
      if(element.id == value.body.id){
        aux.splice(id,1);
      }
    })
    
    this.setState({product_user: aux})
    this.setState({product_user_e: aux_e})
  }

  row_select_e = (value) => {
    
    let aux = [];
    let aux_e = [];
    
    aux = this.state.product_user_e;
    aux_e = this.state.product_user;
    aux_e.push(value.body);
    
    aux.forEach((element, id) => {
      if(element.id == value.body.id) aux.splice(id,1);
    })
    
    this.setState({product_user: aux_e})
    this.setState({product_user_e: aux})
  }

  devolute = async (value) => {
    let aux = [];
    console.log("value");
    console.log(value);

    this.state.product_user_e.map(item1 => {
      this.state.all_loans.map(item2 => {
        if (item1.id == item2._id) {
          console.log("ENCONTROU");
          aux.push(item2);
        }
      });
    });

   if(aux){
     await fetch('http://localhost:8081/loan', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify(aux)
      }).then(function (res) { return res.json(); })
        .then(function (data) {
          if(data != undefined){
              alert('Produto devolvido com sucesso');
              document.getElementById('modal-close').click();
              history.push('/');
            } else { 
            alert('Problema ao devolver produto');  
            }
        })
        
        this.setState({product_user_e: []})
    }   
    
 }

  value_filter = (value) => {
    console.log(value)
  }
  render(){
    
    return(
        <div>
          <div onClick={() => {history.push('/')}} >
                    <div className="row">
                        <div className="text-left" className="col-4">
                            <i className="material-icons">keyboard_backspace</i>
                        </div>
                    </div>
                </div>
            <div className="row">
              <strong>Selecione o usuário que deseja realizar a devolução:</strong>   
            </div>   
            <div class="col-sm-6">
            <div className="row">
              <a class="accordion-toggle btn btn-primary" data-toggle="collapse" href="#demo">+ Usuário</a>
            </div>
              <div id="demo" class="collapse">
                <Form form={this.form_user()} return={this.add_device}/>
              </div>
              <div className="row">
                <Table header={["Nome", "Matrícula"]} data={this.state.data} id_select={this.state.id_user_select} row_select={this.populate_product} filter={true} 
                value_filter={this.value_filter}/>
              </div>
              <button id="button_modal" type="button" style={{display:"none"}} data-toggle="modal" data-target='#create_dealership'> Nova concessionária</button>
              </div>
              <div class="col-12">
                <Modal 
                  id={'create_dealership'} 
                  header={'Selecione as amostras que deseja devolver.'} 
                  body={this.modal_user()} 
                  footer={''}
                />
                </div>
            
        </div>
    )
}
}

export default Usuarios;
