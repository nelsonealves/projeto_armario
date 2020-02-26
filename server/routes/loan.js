module.exports = (express) => {
    express.post('/loan', (req, res) => {
       express.controllers.loan.add_loan(req, res);  
    })

    // express.post('/loans', (req, res) => {
    //     express.controllers.product.add_many_loan(req, res);  
    //  })

    express.delete('/loan', (req, res) => {
        express.controllers.loan.devolute(req, res);
    })

    express.get('/all_loans', (req, res) => {
        express.controllers.loan.get_all_loans(req, res);  
    })

    express.get('/loan/:loan_id', (req, res) => {
        express.controllers.loan.get_a_loan(req, res);  
    })

    express.get('/loan/:user_id/user', (req, res) => {
        express.controllers.loan.get_loan_by_user(req, res);  
    })

    express.put('/loan/:loan_id', (req, res) => {
        express.controllers.loan.update_loan(req, res);  
    })

    express.delete('/loan/:loan_id', (req, res) => {
        express.controllers.loan.remove_loan(req, res);  
    })
    
    // express.delete('/product/:product_id/user/:user_id', (req, res) => {
    //     express.controllers.product.remove_user_product(req, res);  
    // })
}
