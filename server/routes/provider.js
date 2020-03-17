module.exports = (express) => {
    express.post('/provider', (req, res) => { // ok
        express.controllers.provider.add_provider(req, res);  
    })

    express.get('/provider/:provider_id', (req, res) => { 
        express.controllers.provider.get_provider(req, res);  
    })

    express.get('/all_provider', (req, res) => { // ok
        express.controllers.provider.get_all_provider(req, res);  
    })

    express.put('/provider/:provider_id', (req, res) => { 
        express.controllers.provider.update_provider(req, res);  
    })

    express.delete('/provider/:provider_id', (req, res) => { 
        express.controllers.provider.remove_provider(req, res);  
    })
}