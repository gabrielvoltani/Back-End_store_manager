const { Router } = require('express');

const router = Router();
const saleController = require('../controllers/sale.controller');

router.get('/', saleController.getAllSales);
router.get('/:id', saleController.getSaleById);
router.post('/', saleController.newSale);

module.exports = router;