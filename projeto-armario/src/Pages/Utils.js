import React, {Component} from 'react';

class Modal extends Component {
    render(){
        let footer;
        if(this.props.footer)  footer = <div class="modal-footer">{this.props.footer}</div>
        
        return(
            <div class="modal fade" id={this.props.id} role="dialog">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">{this.props.header}</h4>
                                <button type="button" id="modal-close" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div id="accordion">
                                    {this.props.body}
                                </div>
                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
        )
    }
}

class Tab extends Component {

    render(){
        return(
            <div>
                <ul class="nav nav-tabs">
                {
                    Object.keys(this.props.tab).map(function(key) {
                        console.log('olha os keys');
                        return(
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href={'#'+this.props.tab[key]}>{this.props.tab[key]}</a>
                            </li>
                        )
                    }.bind(this))
                }
                </ul>

                <div class="tab-content">
                {
                    Object.keys(this.props.body).map(function(key) {
                        return(
                            <div id={this.props.tab[key]} class="container tab-pane"><br/>
                                {this.props.body[key]}
                            </div>
                        )
                    }.bind(this))
                }
                </div>
            </div>
        )
    }
}

class Form extends Component {
    constructor(props){
        super(props);
    }
    
    submit = event => {
        event.preventDefault();
        this.props.return(new FormData(event.target));
    }
    
    render(){
        return(
            <form className='form' onSubmit={this.submit}>
                {this.props.form}
                
                    <input type="submit" className="btn btn-success btn-sm" value="Adicionar"/>
                
            </form>
        )
    }
}

class Combobox extends Component {
    constructor(props){
        super(props);
    }

    onChange = (value) => {
        console.log(value.target.value);
        this.props.selected(value.target.value);
    }

    render(){
        return(
            <select onChange={(event)=>{this.onChange(event)}} name={this.props.name} class="custom-select">
                {
                    Object.keys(this.props.option).map(function(key) {
                        return(
                            <option class={this.props.option[key].id}>{this.props.option[key].name}</option>
                        )
                    }.bind(this))
                }
            </select>
        )
    }
}
export {
    Combobox,
    Modal, 
    Tab,
    Form
}