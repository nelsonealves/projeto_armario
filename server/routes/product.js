
let shelljs = require('shelljs');


module.exports = (express) => {
    express.post('/product', (req, res) => {
       express.controllers.product.add_product(req, res);  
    })

    express.get('/all_product', (req, res) => {
        express.server.controllers.product.get_products(req, res);  
    })

    express.get('/product/:product_id', (req, res) => {
        express.server.controllers.product.get_a_product(express,req, res);  
    })

    express.put('/product/:product_id', (req, res) => {
        express.server.controllers.product.update_product(express,req, res);  
    })

    express.delete('/product/:product_id', (req, res) => {
        express.server.controllers.product.remove_product(express,req, res);  
    })
    express.delete('/product/:product_id/user', (req, res) => {
        express.server.controllers.product.remove_user_product(express,req, res);  
    })

  
}
