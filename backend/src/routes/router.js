const express = require('express');
const productController = require('../controllers/products.controller');

const router = express.Router();

router.post('/products', productController.getProductsById);

module.exports = router;