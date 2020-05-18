import React, { Component } from 'react';


import './css/sidebar.css';
import history from './../history';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Estoque from './Estoque.js'

import Kitchen from '@material-ui/icons/Kitchen';
import BusinessCenter from '@material-ui/icons/BusinessCenter';
import PhoneIphone from '@material-ui/icons/PhoneIphone';
import Modal from '@material-ui/core/Modal';

class Search_Cabinet extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            redirect:null,
            content: null,
            all_provider: null,
            all_models: null,
            all_products: null,
            all_cabinet: null,
            result: null
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.get_cabinet = this.get_cabinet.bind(this);
        
        
          
    }

    onSubmit = (path) => {
        // console.log(path);
        // this.setState({redirect:path})
        history.push(path);
    }

   
    componentDidMount(){
        this.fetch_get("all_provider", "all_provider");
        this.fetch_get("all_models", "all_models");
        this.fetch_get("all_product", "all_products");
        this.fetch_get("all_cabinets", "all_cabinet");
        this.home();
    }

    fetch_get = (path, state) => {
        fetch("http://localhost:8081/"+path, { method: 'GET' })
        .then((resp) => { return resp.json(); })
        .then((data) => {
            this.setState({[state]: data}); 
            }).catch((err) => {
            console.log(err);
            })
    }

    home = () => {
        this.setState({content: this.select_search()})
    }

    useStyles = () => { return makeStyles({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: props => props.spacing(2),
          textAlign: 'center',
          color: props => props.palette.text.secondary,
        },
      });
    }

    get_cabinet = (cabinet) => {
        console.log(cabinet);
        fetch("http://localhost:8081/cabinet/"+cabinet, { method: 'GET' })
        .then((resp) => { return resp.json(); })
        .then((data) => {
            console.log(data);
            fetch("http://localhost:8081/product/"+data[0]._id+"/cabinet", { method: 'GET' })
            .then((resp) => { return resp.json(); })
            .then((data) => {
                let table= []
                let aux = [];
                console.log("OLHA O DATA AI PORRA");
                console.log(data);
                data.map(item => {
                    let object = {id:null, body:[]}
                        console.log(item)
                        if(!item.loan){
                        object.id = item._id
                        aux.push(item.model.provider.name);
                        aux.push(item.model.name);
                        object.body = aux;
                        table.push(object);
                        aux = [];
                    }
                });
                let props = {
                    header: ['Fabricante', 'Modelo'],
                    body: table
                }
                console.log("props");
                console.log(props);
                this.setState({content: <Estoque data={props} back={this.back}/>});
            
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
        console.log(err);
        })

    }
    back = () => {
        this.home();
    }
    select_search = (props) => {
        const classes = this.useStyles();
          console.log("classes");
          console.log(props);
        return (
            <div className={classes.root}>
                <div onClick={() => {this.onSubmit('/search')}} >
                    <div className="row">
                        <div className="text-left" style={{cursor: 'pointer'}}  className="col-4">
                            <i className="material-icons">keyboard_backspace</i>
                        </div>
                    </div>
                </div>
                <div className={classes.root}>
                    <div className="row">
                        Armário corredor
                    </div>
                    <Grid container spacing={3}>
                   
                        <Grid item xs={2}>
                            <strong>Armário 1</strong>
                            <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
                                <Grid  item >
                                    <Paper onClick={()=>{this.get_cabinet("a1p1")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.1</Paper>
                                </Grid>
                                <Grid item>
                                    <Paper onClick={()=>{this.get_cabinet("a1p2")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.2</Paper>
                                </Grid>
                                <Grid item>
                                <Paper onClick={()=>{this.get_cabinet("a1p3")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.3</Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <strong>Armário 2</strong>
                            <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
                                <Grid item >
                                    <Paper onClick={()=>{this.get_cabinet("a2p1")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.1</Paper>
                                </Grid>
                                <Grid item>
                                    <Paper onClick={()=>{this.get_cabinet("a2p2")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.2</Paper>
                                </Grid>
                                <Grid item>
                                <Paper onClick={()=>{this.get_cabinet("a2p3")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.3</Paper>
                                </Grid>
                            </Grid>
                            
                        </Grid>
                        <Grid item xs={2}>
                            <strong>Armário 3</strong>
                            <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
                                <Grid item >
                                    <Paper onClick={()=>{this.get_cabinet("a3p1")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.1</Paper>
                                </Grid>
                                <Grid item>
                                    <Paper onClick={()=>{this.get_cabinet("a3p2")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.2</Paper>
                                </Grid>
                                <Grid item>
                                <Paper onClick={()=>{this.get_cabinet("a3p3")}} style={{textAlign:"center", cursor: 'pointer'}}  className={classes.paper}>Prat.3</Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <strong>Armário 4</strong>
                            <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
                                <Grid item >
                                    <Paper onClick={()=>{this.get_cabinet("a4p1")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.1</Paper>
                                </Grid>
                                <Grid item>
                                    <Paper onClick={()=>{this.get_cabinet("a4p2")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.2</Paper>
                                </Grid>
                                <Grid item>
                                <Paper onClick={()=>{this.get_cabinet("a4p3")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.3</Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <strong>Armário 5</strong>
                            <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
                                <Grid item >
                                    <Paper onClick={()=>{this.get_cabinet("a5p1")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.1</Paper>
                                </Grid>
                                <Grid item>
                                    <Paper onClick={()=>{this.get_cabinet("a5p2")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.2</Paper>
                                </Grid>
                                <Grid item>
                                    <Paper onClick={()=>{this.get_cabinet("a5p3")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.3</Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <strong>Armário 6</strong>
                            <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
                                <Grid item >
                                    <Paper onClick={()=>{this.get_cabinet("a6p1")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.1</Paper>
                                </Grid>
                                <Grid item>
                                    <Paper onClick={()=>{this.get_cabinet("a6p2")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.2</Paper>
                                </Grid>
                                <Grid item>
                                    <Paper onClick={()=>{this.get_cabinet("a6p3")}} style={{textAlign:"center", cursor: 'pointer'}} className={classes.paper}>Prat.3</Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                
                
            </div>
        )
    }

    handleClose = () => {
        console.log("fechar");
    }
    render_result = (data) => {

        return (
            <div>volta</div>
        )
    }

    render(){
        return(
            <div>
                    <div>
                        <div class="container">
                            {this.state.content}
                            
                        </div>
                    </div>
            </div>
        )
    }
}

export default Search_Cabinet;