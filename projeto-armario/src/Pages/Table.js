import React, {Component} from 'react';


class Table extends React.Component {
    constructor(props){
        super(props);
        
    }
   
    row_select(key){
        
        this.props.row_select({id: this.props.id_select[key], body: this.props.data[key]});
        
    }

    componentDidMount(){
        let filter = document.querySelector('.filter');
        filter.addEventListener('keyup', (word) => {
            //console.log(filter.value);
            this.props.value_filter(filter.value);
            
        });
    }
    render(){
        let filter;
        if(this.props.filter) filter = <input class="form-control filter" id="myInput" type="text" placeholder="Procurar"/>
        return(
            <div className='table-responsive'>
            {filter}
            <table className="table table-hover">
            <thead>
            <tr>
            { 
                Object.keys(this.props.header).map(function(key) {
                    return ( 
                        <th>{this.props.header[key]}</th>
                        )
                }.bind(this))
            }
            </tr>
            </thead>
            <tbody>
            {
                Object.keys(this.props.data).map(function(key) {
                    return(
                        <tr onClick={()=>{this.row_select(key)}}>
                        <Row_Table  data={this.props.data[key]}/>
                        </tr>
                    )
                }.bind(this))
            }
                
            </tbody>
            </table>
            </div>
            )
    }
}

class Row_Table extends React.Component {
    render(){
        return(  
                Object.keys(this.props.data).map(function(key) {
                    return ( 
                            <td >{this.props.data[key]}</td>
                        )
                }.bind(this))
        )
            
    }
}

export default Table;