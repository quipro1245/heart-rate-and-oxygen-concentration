'use strict';
module.exports = function(app) {
    var productsCtrl = require('./controllers/ProductsController');

    // todoList Routes
    app.route('/data')
        .get(productsCtrl.get)
        .post(productsCtrl.store);


    app.route('/data/:dataId')
        .get(productsCtrl.detail)
        .put(productsCtrl.update)
        .delete(productsCtrl.delete);

};