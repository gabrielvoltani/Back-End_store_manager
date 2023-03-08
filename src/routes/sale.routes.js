const { Router } = require('express');

const router = Router();
const saleController = require('../controllers/sale.controller');

router.post('/', saleController.newSale);
router.get('/', saleController.getAllSales);
router.get('/:id', saleController.getSaleById);
router.delete('/:id', saleController.deleteSale);

module.exports = router;