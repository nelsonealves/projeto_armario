import React, { Component } from 'react';
import {Modal, Form, Tab} from './Utils.js';
import Table from './Table.js';

class Armarios extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], row_select: [], id_user_select: []};
    this.row_select = this.row_select.bind(this);
    // this.table_report_block = false;
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
      cpf: value.get('matricula'),
    }
    console.log(data);

    // fetch('http://localhost:8081/user', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //     body: JSON.stringify(data)
    // }).then(function (res) { return res.json(); })
    //   .then(function (data) {
    //     if(data != undefined){
    //       alert('Usuário adicionado com sucesso');
    //     } else { 
    //       alert('Problema ao adicionar usuário');  
    //     }
    //   })
  }

  row_select = () => {

  }
  render(){
    
    return(
        <div>
            <div class="col-sm-6 offset-sm-1">
                <div className="row"> 
                    <a class="accordion-toggle" data-toggle="collapse" href="#demo1">Novo Modelo</a>
                    <div id="demo1" class="collapse">
                        <Form form={this.form_user()} return={this.add_device}/>
                    </div>
                </div>
                <div className="row">
                <a class="accordion-toggle" data-toggle="collapse" href="#demo2">Novo Produto</a>
                    <div id="demo2" class="collapse">
                        <Form form={this.form_user()} return={this.add_device}/>
                    </div>
                </div> 
                <div className="row">
                    <Table header={["Nome", "Posse", "Local" ]} data={this.state.data} id_select={this.state.id_user_select} row_select={this.row_select} filter={true} />
                </div>
            </div>
        </div>
    )
  }
}

export default Armarios;
