
let shelljs = require('shelljs');


module.exports = (express) => {
    express.post('/product', (req, res) => {
        express.server.controllers.add_product(req, res);  
    })

    express.get('/product', (req, res) => {
        express.server.controllers.get_product(req, res);  
    })

    express.get('/product/:product_id', (req, res) => {
        express.server.controllers.get_a_product(express,req, res);  
    })

    express.put('/product/:product_id', (req, res) => {
        express.server.controllers.update_product(express,req, res);  
    })

    express.delete('/product/:product_id', (req, res) => {
        express.server.controllers.remove_product(express,req, res);  
    })
    express.delete('/product/:product_id/user', (req, res) => {
        express.server.controllers.remove_user_product(express,req, res);  
    })

  
}
