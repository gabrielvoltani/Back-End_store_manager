const { Router } = require('express');

const router = Router();
const saleController = require('../controllers/sale.controller');

router.post('/', saleController.newSale);

module.exports = router;