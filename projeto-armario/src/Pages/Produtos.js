import React, { Component } from 'react';
import {Combobox, Modal, Form, Tab} from './Utils.js'
import Table from './Table.js'

class Produtos extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], row_select: [], id_user_select: [], all_product: [], products: [], cabinet:[], all_cabinet:[]};
    this.row_select = this.row_select.bind(this);
    this.update_models = this.update_models.bind(this);
    this.form_product = this.form_product.bind(this);
    // this.table_report_block = false;
  }

  componentDidMount(){
    this.update_models();
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
    
    await fetch("http://localhost:8081/all_models", { method: 'GET' })
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

    console.log(data);

    fetch('http://localhost:8081/model', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(data)
    }).then(function (res) { return res.json();})
      .then(function (data) {
        if(data != undefined){
          alert('Modelo adicionado com sucesso');
        } else { 
          alert('Problema ao adicionar modelo');  
        }
      })
  }
  
  add_product = (value) => {
    
    let data = {
      name: value.get('product'),
      cpf: value.get('quantidade'),
      cabinet: value.get('cabinet')
    }
    console.log(data);

    console.log("this.state.all_product");
    console.log(this.state.all_product);
    this.state.all_product.map(item => {
      if(item.name == data.name){

      }
    });
    // fetch('http://localhost:8081/product', {
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
                        <Form form={this.form_model()} return={this.add_model}/>
                    </div>
                </div>
                <div className="row">
                <a class="accordion-toggle" data-toggle="collapse" href="#demo2">Novo Produto</a>
                    <div id="demo2" class="collapse">
                        <Form form={this.form_product()} return={this.add_product}/>
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

export default Produtos;
