import React, { Component } from 'react';

import {Combobox, Modal, Form, Tab} from './Utils.js'
import DatePicker from 'react-datepicker';
import Table from './Table_product.js'
import history from './../history';

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
    console.log("this.props.body");
    console.log(this.props.data);
    this.setState({data: this.props.data.body})
   
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

  // async populate_table(){
     
  //   let table = [];
  //   let aux = [];
  
    
  //   await fetch("http://localhost:8081/all_product", { method: 'GET' })
  //   .then((resp) => { return resp.json(); })
  //   .then((data) => {
  //     data.map((item, i) => {
  //       let object = {id:null, body:[]}
  //       console.log(item)
  //       if(!item.loan){
  //         object.id = item._id
  //         aux.push(item.model.name);
  //         aux.push(item.cabinet.name);
  //         object.body = aux;
  //         table.push(object);
  //         aux = [];
  //       }
  //     });
      
  //     console.log("TABLEEEE")
  //     console.log(table);
  //     this.setState({ data: table });
  //   }).catch((err) => {
  //     console.log(err);
  //   })
    
  // }


  row_select = (value) => {
  
    let aux = [];
    let aux_e = [];
    
    aux = this.state.data;
    aux_e = this.state.data_e;
    
    aux_e.push(value.body);
    aux.forEach((element, id) => {
    
      if(element.id == value.body.id){
    
        aux.splice(id,1);
      }
    })
    
    this.setState({data: aux})
    this.setState({data_e: aux_e})
  }

   row_select_e = (value) => {
     
    let aux = [];
    let aux_e = [];
    
    aux = this.state.data_e;
    aux_e = this.state.data;
    //console.log(this.state.data_e);
    aux_e.push(value.body);
    
    
    aux.forEach((element, id) => {
      
      if(element.id == value.body.id){
        
        aux.splice(id,1);
      }
    })
    
    this.setState({data: aux_e})
    this.setState({data_e: aux})
  }

  add_product_user = async event => {
    let data_loan = [];
    let aux_product = [];
    event.preventDefault();
    let user = new FormData(event.target);
    let user_name = user.get("user");
    
    this.state.data_e.forEach(item => {
      let data = {}
      this.state.all_users.forEach(item => {
        if(item.matricula === user_name){
          data.user = item._id;
        }
      });
      data.date = this.state.date;
      console.log("DATAAAA")
      data.product = item.id;
      console.log(item.id);
      if(user.get("return") == null) {
        data.return = false;
      } else {
        data.return = true
      }
      data_loan.push(data)
    });
    
    await fetch('http://localhost:8081/loan', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(data_loan)
    }).then(function (res) { return res.json(); })
      .then(function (data) {
        if(data != undefined){
          alert('Empréstimo realizado');
        } else { 
          alert('Problema ao realizar empréstimo');  
        }
      })

      this.setState({data_e: []})
  }

  onChange = date => this.setState({ date: date })
  
  onSubmit = (path) => {
    history.push(path);
  }

  
  render(){
    return(
      <React.Fragment>
      <div onClick={() => {this.props.back()}} >
                    <div className="row">
                        <div className="text-left" className="col-4">
                            <i className="material-icons">keyboard_backspace</i>
                        </div>
                    </div>
                </div>
      <div className="row">
      <div class="col-sm-6">
        <Table header={this.props.data.header} data={this.props.data.body} id_select={this.state.id_user_select} row_select={this.row_select} filter={true} />
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
  </React.Fragment>
    )
}
}

export default Estoque;
