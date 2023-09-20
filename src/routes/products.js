const express = require('express');
const router = express.Router();


const productsController = require('../controllers/productsController');


router.get('/', productsController.index)
    .get('/create', productsController.create)
    .post('/create', productsController.store)
    .get('/detail/:id', productsController.detail)
    .get('/edit/:id/', productsController.edit)
    .put('/update/:id', productsController.update)
    .delete('/delete/:id', productsController.destroy)

module.exports = router;
