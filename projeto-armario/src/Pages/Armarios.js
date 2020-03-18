import React, { Component } from 'react';
import {Modal, Form, Tab} from './Utils.js'
import Table from './Table.js'
class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], row_select: [], id_user_select: []};
    this.row_select = this.row_select.bind(this);
    this.populate_table = this.populate_table.bind(this);
    this.value_filter = this.value_filter.bind(this);
    // this.table_report_block = false;
  }

  componentDidMount() {
    this.populate_table();
  }

  async populate_table(){
     
      let table = [];
      let aux = [];
      let aux1 = [];
  
      await fetch("http://localhost:8081/all_cabinets", { method: 'GET' })
      .then((resp) => { return resp.json(); })
      .then((data) => {
        data.map((item, i) => {
          aux.push(data[i].name);
          aux1.push(data[i]._id);
          table.push(aux);
          aux = [];
        });
        this.setState({ data: table, id_user_select: aux1 });
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
          </div>
        </div>
      </div>
    )
  }

  add_device = async (value) => {
    let data = {
      name: value.get('name'),
      
    }
    
    await fetch('http://localhost:8081/cabinet', {
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
    console.log(value);
    document.getElementById("button_modal").click();
  }

  async value_filter(value){
    //console.log(value);
    // if(value == ""){
    //   this.populate_table();
    // } else { 
    //   let table = [];
    //     let aux = [];
    //     let aux1 = [];
    //   await fetch("http://localhost:8081/cabinet/" + value + "/matricula", { method: 'GET' }).then((resp) => { return resp.json(); }).then((data) => {
    //     data.map((item, i) => {
    //       aux.push(data[i].name);
    //       aux1.push(data[i]._id);
    //       table.push(aux);
    //       aux = [];
    //     });
    //     this.setState({ data: table, id_user_select: aux1 });
    //   }).catch((err) => {
    //     console.log(err);
    //   })
    // }
  }
  product_cabinet = () => {

  }

  render(){
    
    return(
        <div>
            <div class="col-sm-6">
            <a class="accordion-toggle" data-toggle="collapse" href="#demo">Novo Armario</a>
              <div id="demo" class="collapse">
                <Form form={this.form_user()} return={this.add_device}/>
              </div>
              <div className="row">
                <Table header={["Nome"]} data={this.state.data} id_select={this.state.id_user_select} row_select={this.row_select} filter={true} value_filter={this.value_filter}/>
              </div>
              <button id="button_modal" type="button" style={{display:"none"}} data-toggle="modal" data-target='#create_dealership'> Nova concessionária</button>
                <Modal 
                  id={'create_dealership'}
                  header={'Usuário'} 
                  body={""}
                  footer={''}
                 />
            </div>
        </div>
    )
}
}

export default Usuarios;
