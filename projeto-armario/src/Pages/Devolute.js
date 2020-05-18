import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {Combobox} from './Utils.js'
import history from './../history';

class Devolute extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            content: null,
            all_users: null,
            all_loans: null
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (path) => {
        // console.log(path);
        // this.setState({redirect:path})
        history.push(path);
    }
    componentDidMount = async () => {
        await this.fetch_get("all_users", "all_users");
        await this.fetch_get("all_loans", "all_loans");
        this.home();
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
    
    get_combobox = (object, name_, option) => {
        let aux = [];
        object.map( item => {
            aux.push({id: item._id, name: item[option]});
        });
        
        return <Combobox selected={this.selected_user} name={name_} option={aux} />
    }

    home = () => {
        console.log('this.state.all_user');
        console.log(this.state.all_users);
        console.log('this.state.all_loans');
        console.log(this.state.all_loans);
        let users = this.state.all_users;
        users = users.sort((a,b) => {
            if (a.name > b.name )return 1; 
            if (b.name > a.name) return -1;
            return 0;
          });
        let comb_user = this.get_combobox(users, "users", "matricula");
        this.setState({content: this.select_user(comb_user)});    
    }
    

    select_user = (comb_user) => {
        return (
            <div>
            <div className="row">
                <strong>Selecione o usuário:</strong>
                {comb_user}
            </div>
           
        </div>
        )
    }

    selected_user = (user) => {
        console.log("user");
        console.log(user);

        this.state.all_loans.map( event => {
            
            if (event.user.matricula == user) {
                console.log('Possui produto');
                console.log(event.product.model.name);
            }
            console.log();
        });
    }

    insert_table = () => {
        return (
            <div></div>
        )
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return(
            <div>
                    <div>
                        <div class="container">
                            <div class="row">
                                <div onClick={() => {this.onSubmit('/')}} class="col-4">
                                        <div class="row"><div className="text-center"><i class="material-icons">keyboard_backspace</i></div></div>
                                </div>
                                {this.state.content}
                                {this.state.table}
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Devolute;