'use strict';
module.exports = function(app) {
    var productsCtrl = require('./controllers/BenhNhanController');

    // todoList Routes
    app.route('/benhnhans')
        .get(productsCtrl.get)
        .post(productsCtrl.store);

    app.route('/benhnhans/:benhnhansID')
        .get(productsCtrl.detail)
        .put(productsCtrl.update)
        .delete(productsCtrl.delete);
    app.route('/benhnhans/trangchu')
        .get(productsCtrl.trangchu)

};