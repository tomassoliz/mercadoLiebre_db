const express = require('express');
const router = express.Router();


const productsController = require('../controllers/productsController');
const upload = require('../middleware/upload');
const productsAdd = require('../validations/productsAdd');


router
    .get('/', productsController.index)
    .get('/create', productsController.create)
    .post('/create', upload.single('image'), productsAdd, productsController.store)
    .get('/detail/:id', productsController.detail)
    .get('/edit/:id', productsController.edit)
    .put('/update/:id', upload.single('image'),productsController.update)
    .delete('/delete/:id', productsController.destroy)

module.exports = router;
