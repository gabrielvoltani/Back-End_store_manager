const { Router } = require('express');

const router = Router();

const productController = require('../controllers/product.controller');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

module.exports = router;