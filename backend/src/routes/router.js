const express = require('express');
const productController = require('../controllers/products.controller');

const router = express.Router();

router.post('/products', productController.getProductsById);
router.patch('/products', productController.updateProductsById);

module.exports = router;