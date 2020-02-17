module.exports = (express) => {
    express.post('/product', (req, res) => {
       express.controllers.product.add_product(req, res);  
    })

    express.post('/products', (req, res) => {
        express.controllers.product.add_many_products(req, res);  
     })

    express.get('/all_product', (req, res) => {
        express.controllers.product.get_products(req, res);  
    })

    express.get('/product/:product_id', (req, res) => {
        express.controllers.product.get_a_product(req, res);  
    })

    express.put('/product/:product_id', (req, res) => {
        express.controllers.product.update_product(req, res);  
    })

    express.delete('/product/:product_id', (req, res) => {
        express.controllers.product.remove_product(req, res);  
    })
    
    express.delete('/product/:product_id/user/:user_id', (req, res) => {
        express.controllers.product.remove_user_product(req, res);  
    })
}
