module.exports = (express) => {
    express.post('/user', (req, res) => { // ok
        express.controllers.users.add_user(req, res);  
    })

    express.get('/user/:user_id', (req, res) => { // ok
        express.controllers.users.get_user(req, res);  
    })

    express.get('/all_users', (req, res) => { // ok
        express.controllers.users.get_all_user(req, res);  
    })

    express.get('/user/:user_id/products', (req, res) => {
        express.controllers.users.get_user_products(req, res);
    });

    express.put('/user/:user_id', (req, res) => { //ok
        express.controllers.users.update_user(req, res);  
    })

    express.delete('/user/:user_id', (req, res) => { // ok
        express.controllers.users.remove_user(req, res);  
    })

    express.delete('/user/:user_id/:product_id', (req, res) => {
        express.controllers.users.remove_user_products(req, res);  
    })
}
