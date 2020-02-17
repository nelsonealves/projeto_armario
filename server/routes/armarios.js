
let shelljs = require('shelljs');


module.exports = (express) => {
    express.post('/cabinet', (req, res) => { // ok
        express.controllers.cabinet.add_cabinet(req, res);  
    })

    express.get('/cabinet/:cabinet_id', (req, res) => { // ok
        express.controllers.cabinet.get_cabinet(req, res);  
    })

    // express.get('/user/:matricula/matricula', (req, res) => {
    //     express.controllers.cabinet.get_by_matricula(req, res);
    // });
    
    express.get('/all_cabinets', (req, res) => { // ok
        express.controllers.cabinet.get_all_cabinet(req, res);  
    })

    express.put('/cabinet/:cabinet_id', (req, res) => { //ok
        express.controllers.cabinet.update_cabinet(req, res);  
    })

    express.delete('/cabinet/:cabinet_id', (req, res) => { // ok
        express.controllers.cabinet.remove_cabinet(req, res);  
    })

    express.delete('/all_cabinet', (req, res) => { // ok
        express.controllers.cabinet.remove_all_cabinet(req, res);  
    })

    express.put('/cabinet/:cabinet_id/product/:product_id', (req, res) => { //ok
        express.controllers.cabinet.add_cabinet_product(req, res);
    });

    express.get('/cabinet/:cabinet_id/products', (req, res) => {
        express.controllers.cabinet.get_cabinet_products(req, res);
    });

    express.delete('/cabinet/:cabinet_id/product/:product_id', (req, res) => {
        express.controllers.cabinet.remove_cabinet_product(req, res);  
    })

    express.delete('/cabinet/:cabinet_id/all_products', (req, res) => { // ok
        express.controllers.cabinet.remove_cabinet_all_product(req, res);  
    })
  
}
