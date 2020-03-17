module.exports = (express) => {
    express.post('/model', (req, res) => { // ok
        express.controllers.model.add_model(req, res);  
    })

    express.get('/model/:model_id', (req, res) => { 
        express.controllers.model.get_model(req, res);  
    })

    express.get('/model/:provider_id', (req, res) => { 
        express.controllers.model.get_model_by_provider(req, res);  
    })

    express.get('/all_models', (req, res) => { // ok
        express.controllers.model.get_all_model(req, res);  
    })

    express.put('/model/:model_id', (req, res) => { 
        express.controllers.model.update_model(req, res);  
    })

    express.delete('/model/:model_id', (req, res) => { 
        express.controllers.model.remove_model(req, res);  
    })
}