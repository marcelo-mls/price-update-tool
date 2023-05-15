const express = require('express');
const productController = require('../controllers/products.controller');

const router = express.Router();

router.post('/products', productController.searchAndValidateProductsById);
router.patch('/products', productController.updateProductsById);

module.exports = router;